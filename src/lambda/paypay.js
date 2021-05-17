const PAYPAY = require("@paypayopa/paypayopa-sdk-node")
const { v4: uuidv4 } = require("uuid")

PAYPAY.Configure({
  clientId: process.env.PAYPAY_CLIENT_ID,         // PayPay APIキー
  clientSecret: process.env.PAYPAY_CLIENT_SECRET, // PayPay APIシークレット
  merchantId: process.env.PAYPAY_MERCHANT_ID,     // PayPay Merchant ID
  productionMode: false
})

exports.handler = (event, context, callback) => {
  // POSTメソッド以外は弾く
  if (event.httpMethod !== "POST") {
    return callback(null, { statusCode: 405, body: "Method Not Allowed" })
  }

  // 金額と注文内容の説明はbodyから取得
  const { amount, orderDescription } = JSON.parse(event.body)

  // 金額が1円に満たなかった場合はエラー
  if (parseInt(amount) < 1) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Some required fields were not supplied."
      })
    })
  }

  const merchantPaymentId = uuidv4() // 支払いID（一意になるようにuuidで生成）

  let payload = {
    merchantPaymentId: merchantPaymentId,
    amount: {
      amount: parseInt(amount),
      currency: "JPY"
    },
    codeType: "ORDER_QR", // 「ORDER_QR」で決め打ち
    orderDescription: orderDescription,
    isAuthorization: false,
    redirectUrl: `${process.env.APP_HOST_NAME}/complete?merchant-payment-id=${merchantPaymentId}`, // 支払い完了後のリダイレクト先URL
    redirectType: "WEB_LINK", // Webブラウザからの支払いなら「WEB_LINK」、アプリからの支払いなら「APP_DEEP_LINK」
  }

  // 支払い用QRコードを生成
  PAYPAY.QRCodeCreate(payload, (response) => {
    if (response.STATUS == 201) {
      return callback(null, {
        statusCode: 200,
        body: response.BODY
      })
    }
  })
}

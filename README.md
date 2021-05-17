# react-paypay

https://react-paypay-20210517.netlify.app

![paypay](https://user-images.githubusercontent.com/51913879/118483187-b19c2880-b750-11eb-858d-3afe3b5eec61.gif)

PayPay決済機能をReactアプリに組み込むためのサンプル。

詳細はQiitaにて記載。

https://qiita.com/kazama1209/items/6981331fb43b80ff916d

## セットアップ

```
$ cp .env.sample .env

APP_HOST_NAME=http://localhost:3000
PAYPAY_CLIENT_ID=<PaPay APIキー>
PAYPAY_CLIENT_SECRET=<PayPay APIシークレット>
PAYPAY_MERCHANT_ID=<PayPay Merchant ID>
```

環境変数をセット。

```
$ npm install 
$ npm run start
```

http://localhost:3000 にアクセス。

## テストユーザーの使用方法

アプリ内で使用しているAPIキーはテスト環境のものなので、テストユーザーを使用した支払い動作確認が可能。

https://paypay.ne.jp/developers-faq/sandbox_environment/post-43

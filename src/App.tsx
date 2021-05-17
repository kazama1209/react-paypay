import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Reserve from "./components/checkout/Reserve"
import Complete from "./components/checkout/Complete"

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Reserve} />
        <Route exact path="/complete" component={Complete} />
      </Switch>
    </Router>
  )
}

export default App

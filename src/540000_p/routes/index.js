import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/index.js";
import NTpay from "../pages/index_pay/index.js";
import NTpayChange from "../pages/index_charge/index.js";
import Success from "../pages/success/index.js";
import Fail from "../pages/fail/index.js";
function App() {
  return (
    <Router basename='/'>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        {/* 非税缴款 */}

        <Route path="/home" component={Home} />
        <Route path="/index_pay" component={NTpay} />
        <Route path="/index_pay.do" component={NTpay} />
        {/* 非税缴款缴款书界面 */}
        <Route path="/index_charge" component={NTpayChange} />
        {/* 回调成功界面 */}
        <Route path="/success" component={Success} />
        {/* 回调失败界面 */}
        <Route path="/fail" component={Fail} />
      </Switch>
    </Router>
  );
}
export default App;

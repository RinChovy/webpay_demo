import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/index.js";
import About from "../pages/about/index.js";
import NTpayChange from "../pages/NonTaxPayChange/index.js";
import success from "../pages/success/index.js";
import fail from "../pages/fail/index.js";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        {/* 非税缴款 */}
        <Route path="/home" exact={true} component={Home} />
        {/* 非税缴款缴款书界面 */}
        <Route path="/index_charge" component={NTpayChange} />
        {/* 回调成功界面 */}
        <Route path="/success" component={success} />
        {/* 回调失败界面 */}
        <Route path="/fail" component={fail} />
      </Switch>
    </Router>
  );
}
export default App;

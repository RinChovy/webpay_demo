import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index_pay from '../pages/index_pay/index.js';
import Index_pay_select from '../pages/index_pay_select/index.js';
import NTpayChange from '../pages/index_charge/index.js';
import NTpayChange_select from '../pages/index_charge_select/index.js';
import Success from '../pages/success/index.js';
import Fail from '../pages/fail/index.js';
function App() {
  return (
    <Router basename="500000">
      <Switch>
        <Route path="/" exact={true} component={Index_pay} />
        {/* 非税缴款 */}
        {/* 首页 */}
        <Route path="/home" component={Index_pay} />
        <Route path="/index_door" component={Index_pay} />
        <Route path="/index_pay" component={Index_pay} />
        <Route path="/index_pay_select" component={Index_pay_select} />
        <Route path="/index_pay.do" component={Index_pay} />
        {/* 非税缴款缴款书界面 */}
        <Route path="/index_charge" component={NTpayChange} />
        <Route path="/index_charge_select" component={NTpayChange_select} />
        {/* 回调成功界面 */}
        <Route path="/success" component={Success} />
        {/* 回调失败界面 */}
        <Route path="/fail" component={Fail} />
      </Switch>
    </Router>
  );
}
export default App;

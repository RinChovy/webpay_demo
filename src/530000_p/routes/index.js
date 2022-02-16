import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/home/index.js';
import Index_pay from '../pages/index_pay/index.js';
import Index_pay_traffic from '../pages/Index_pay_traffic/index.js';
import NTpayChange from '../pages/index_charge/index.js';
import Success from '../pages/success/index.js';
import Fail from '../pages/fail/index.js';
import Index_education from '../pages/index_education/index.js';
import Index_pay_idcard from '../pages/index_pay_idcard/index.js';
function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact={true} component={Home} />
        {/* 非税缴款 */}
        {/* 首页 */}
        <Route path="/index_door" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/index_pay" component={Index_pay} />
        <Route path="/index_pay.do" component={Index_pay} />
        {/* 教育缴费 */}
        <Route path="/index_education" component={Index_education} />
        {/* 教育缴费列表页面 */}
        <Route path="/index_pay_idcard" component={Index_pay_idcard} />
        <Route path="/index_pay_traffic" component={Index_pay_traffic} />
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

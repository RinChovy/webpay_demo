import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/home/index.js';
import index_pay from '../pages/index_pay/index.js';
import index_charge from '../pages/index_charge/index.js';
import education from '../pages/education/index.js';
import education_wx from '../pages/education_wx/index.js';
import success from '../pages/success/index.js';
import fail from '../pages/fail/index.js';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/home" exact={true} component={Home} />
        {/* 非税缴款 */}
        <Route path="/index_pay" component={index_pay} />
        {/* 非税缴款缴款书界面 */}
        <Route path="/index_charge" component={index_charge} />
        {/* 教育缴费界面 */}
        <Route path="/education" component={education} />
        {/* 教育缴费界面 */}
        <Route path="/getSchoolInfo" component={education_wx} />
        {/* 回调成功界面 */}
        <Route path="/success" component={success} />
        {/* 回调失败界面 */}
        <Route path="/fail" component={fail} />
      </Switch>
    </Router>
  );
}
export default App;

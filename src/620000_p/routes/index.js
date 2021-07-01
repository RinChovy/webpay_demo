import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/index.js'));
const NTpay = lazy(() => import('../pages/index_pay/index.js'));
const NTpayChange = lazy(() => import('../pages/index_charge/index.js'));
const Success = lazy(() => import('../pages/success/index.js'));
const Fail = lazy(() => import('../pages/fail/index.js'));
const Policy = lazy(() => import('../pages/policy/index.js'));
const PayEn = lazy(() => import('../pages/index_payEn/index.js'));

function App() {
  return (
    <Router basename="620000">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          {/* 非税缴款 */}
          <Route path="/index_door" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/index_pay" component={NTpay} />
          <Route path="/index_pay.do" component={NTpay} />
          {/* 非税缴款缴款书界面 */}
          <Route path="/index_charge" component={NTpayChange} />
          {/* 回调成功界面 */}
          <Route path="/success" component={Success} />
          {/* 回调失败界面 */}
          <Route path="/fail" component={Fail} />
          {/* 政策依据查询 */}
          <Route path="/policy" component={Policy} />
          <Route path="/index_payEn" component={PayEn} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

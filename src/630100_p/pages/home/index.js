import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
// import { userIssues } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';

class Home extends React.Component {
  state = {
    spanPay: '客服热线电话:18686617479', //温馨提示
    topLeft: 'home_right_topLeft active', //左侧按钮class
    rightLeft: 'home_right_topRight', //右侧按钮class
    leftOrRight: 'left', //控制显示隐藏参数
    url: 'http://220.182.49.217:18686/billcheck/#/home', //票据查询地址
  };

  componentDidMount() {
    // userIssues().then((res) => {
    //   res.code === 0 ? console.log(res) : console.log(res);
    // });
  }
  // 左侧按钮方法
  left = () => {
    this.setState({
      topLeft: 'home_right_topLeft active',
      topRight: 'home_right_topRight',
      leftOrRight: 'left',
    });
  };
  // 右侧按钮方法
  right = () => {
    this.setState({
      topLeft: 'home_right_topLeft',
      topRight: 'home_right_topRight active',
      leftOrRight: 'right',
    });
  };
  // 非税缴款
  NTpay = (e) => {
    localStorage.setItem('type', e);
    this.props.history.push({
      pathname: '/index_pay',
    });
  };
  // 票据查询
  evURL = () => {
    window.location.href = this.state.url;
  };
  render() {
    const { spanPay, topLeft, rightLeft, leftOrRight } = this.state;
    const margin = {
      style: {
        marginLeft: '50px',
      },
    };
    const marginTop = {
      style: {
        marginTop: '10px',
      },
    };
    const center = {
      style: {
        width: '500px',
        textAlign: 'center',
      },
    };
    return (
      <div className="body">
        <div style={{ position: 'absolute', left: '17%', top: '20px' }}>
          <img
            src={require('../../public/images/icon_top.jpg')}
          />
          <img
            style={{ marginLeft: 20 }}
            src={require('../../public/images/icon_top_2.jpg')}
          />
        </div>
        <div className="xining_top">
          <span>统一公共支付</span>
        </div>
        <div className="outForm_pay">
          <div className="img_pay">
            <div className="onForm_pay">
              <div className="home">
                <div className="home_left">
                  <img
                    {...margin}
                    src={require('../../public/images/xizang/left.png')}
                  />
                </div>
                <div className="home_right">
                  <div className="home_right_nei">
                    <div className="box_wai">
                      <div className="box" onClick={() => this.NTpay('0')}>
                        <img
                          src={require('../../public/images/xizang/feishui.png')}
                        />
                        <div {...marginTop}>
                          <span>非税缴款</span>
                        </div>
                      </div>
                      <div className="box" onClick={() => this.NTpay('1')}>
                        <img
                          src={require('../../public/images/xizang/jiaokuan.png')}
                        />
                        <div {...marginTop}>
                          <span>缴款查询</span>
                        </div>
                      </div>
                      <div className="box" onClick={() => this.NTpay('2')} style={{ marginTop: 40 }}>
                        <img
                          src={require('../../public/images/xizang/jiaokuan2.png')}
                        />
                        <div {...marginTop}>
                          <span>教育缴费</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Home;

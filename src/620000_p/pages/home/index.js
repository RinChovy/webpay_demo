import React from 'react';
import pdf from '../../public/jk.pdf';
import style from '../../public/css/index.css';
import { notice } from '../../service/services';
import { Alert, notification } from 'antd';
import icon_feishui from '../../public/images/xizang/feishui.png';
import icon_jiaoyu from '../../public/images/xizang/jiaoyu.png';
import icon_caizheng from '../../public/images/xizang/caizheng.png';
import icon_zhengce from '../../public/images/xizang/zhengce.png';

class Home extends React.Component {
  state = {
    spanPay: '', //温馨提示
    topLeft: 'home_right_topLeft active', //左侧按钮class
    topRight: 'home_right_topRight', //右侧按钮class
    leftOrRight: 'left', //控制显示隐藏参数
    url: 'http://220.182.49.217:18686/billcheck/html/index.html', //票据查询地址
    noticeType: '0',  //公告是否显示 0代表无 1代表有
    noticeText: '通告：因系统维护升级，现暂停统一公共支付平台缴款业务办理，关闭时间2021年12月31日10时至2022年1月1日6时。给您带来不便，敬请谅解！', //公告信息
  };

  componentDidMount() {
    // 验证公告信息
    notice().then(res => {
      if (res.code === 0) {
        this.setState({
          noticeType: res.data.status,
          noticeText: res.data.noticeInfo
        })
      } else {
        notification[type]({
          message: '查询错误',
          description: res.msg,
        });
      }
    });
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
  NTpay = () => {
    this.props.history.push({
      pathname: '/index_pay',
    });
  };
  NTpayEn = () => {
    this.props.history.push({
      pathname: '/index_payEn',
    });
  };

  // 票据查询
  evURL = () => {
    window.location.href = this.state.url;
  };
  // 政策依据查询
  policy = () => {
    this.props.history.push({
      pathname: '/policy',
    });
  };

  render() {
    const { spanPay, topLeft, topRight, leftOrRight, noticeType, noticeText } = this.state;
    const span1 = {
      style: {
        marginLeft: 50,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18,
      },
    };
    const span2 = {
      style: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    };

    const margin = {
      style: {
        marginLeft: '100px',
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
        <div className="body_icon">
          <img src={require('../../public/images/icon_top.png')} />
        </div>
        <div className="outForm_pay">
          <div className="img_pay">
            <div className="onForm_pay" style={{ paddingTop: 10 }}>
              <div style={{ width: '96%', margin: '0 auto' }}>
                {noticeType == '1' &&
                  <Alert
                    message={<span style={{ color: 'red' }}>公告</span>}
                    description={
                      <span style={{ color: 'red' }}>
                        {noticeText}
                      </span>
                    }
                    type="warning"
                    showIcon
                    closable
                  />
                }
              </div>
              <div className="home">
                <div className="home_left">
                  <img
                    {...margin}
                    src={require('../../public/images/xizang/left.png')}
                  />

                  <div>
                    <span {...span1}>温馨提示:</span>
                    <span {...span2}>
                      推荐使用谷歌浏览器，如缴费有问题，请拨打咨询热线：4008885699按1键
                    </span>
                  </div>
                </div>
                <div className="home_right">
                  <div className="home_right_nei">
                    <a href={pdf} target="_blank">
                      <button className="buttonWaring">帮助</button>
                    </a>
                    <div className={topLeft} onClick={this.left}>
                      <span>缴款</span>
                    </div>
                    <div className={topRight} onClick={this.right}>
                      <span>查询/票据打印</span>
                    </div>
                    {leftOrRight === 'left' && (
                      <div className="box_wai">
                        <div className="box" onClick={this.NTpay}>
                          <img src={icon_feishui} />
                          <div {...marginTop}>
                            <span>非税缴款</span>
                          </div>
                        </div>
                        <div className="box" onClick={this.NTpay}>
                          <img src={icon_jiaoyu} />
                          <div {...marginTop}>
                            <span>教育收费</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {leftOrRight === 'right' && (
                      <div className="box_wai">
                        <div className="box" onClick={this.NTpayEn}>
                          <img src={icon_caizheng} />
                          <div {...marginTop}>
                            <span>票据查询打印</span>
                          </div>
                        </div>
                        <div className="box" onClick={this.policy}>
                          <img src={icon_zhengce} />
                          <div {...marginTop}>
                            <span>政策依据查询</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div {...center}>
                    <span>{spanPay}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

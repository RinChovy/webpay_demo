import React from 'react';
import { api } from '../../service/api';
import style from '../../public/css/index.css';
import CustomerService from '../components/customerService';

class Home extends React.Component {
  state = {
    yunwei: '', //运维信息
    list: [
      {
        "deviceType": "pc",
        modelPicture: require('../../public/images/paycode.png'),
        "itemName": "一般非税缴款",
        "siteCode": "webpay",
        "cityCode": "210000",
        "provinceCode": "210000",
        "itemCode": "21000001",
        "id": "0001",
        "provinceName": "辽宁省",
        "modelUrl": "index_pay",
        "channelCode": "2101002020042801"
      },
      {
        "deviceType": "pc",
        modelPicture: require('../../public/images/kaipiao.png'),
        "itemName": "电子票据查询",
        "siteCode": "webpay",
        "cityCode": "210000",
        "provinceCode": "210000",
        "itemCode": "002",
        "id": "0002",
        "provinceName": "辽宁省",
        "modelUrl": "index_payEn",
        "channelCode": "2101002020042801"
      },
    ]
  };

  componentDidMount() {
  }

  // 非税缴款
  NTpay = () => {
    this.props.history.push({
      pathname: '/index_pay',
    });
  };
  // 票据查询
  evURL = () => {
    // this.props.history.push({
    //   pathname: '/index_payEn',
    // });
    window.location.href = 'http://36.189.17.11:18006/billcheck/html/index.html#/home'
  };

  render() {
    const { spanPay, topLeft, rightLeft, leftOrRight } = this.state;
    const margin = {
      style: {
        width: '100%',
        // marginLeft: '50px',
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
      <div className="body" style={{ padding: '100px 0' }}>
        <CustomerService />
        <div className="outForm_pay">
          <div className="img_pay">
            <div className="onForm_pay">
              <div className="home">
                <div className="home_left">
                  <img
                    {...margin}
                    src={require('../../public/images/background_home.png')}
                  />
                </div>
                <div className="home_right">
                  <div className="home_right_nei">
                    <div className="box_wai">
                      <div className="box" onClick={this.NTpay}>
                        <img
                          src={require('../../public/images/paycode.png')}
                        />
                        <div {...marginTop}>
                          <span>非税缴款</span>
                        </div>
                      </div>
                      <div className="box" onClick={this.evURL}>
                        <img
                          src={require('../../public/images/kaipiao.png')}
                        />
                        <div {...marginTop}>
                          <span>财政票据查验</span>
                        </div>
                      </div>
                    </div>
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

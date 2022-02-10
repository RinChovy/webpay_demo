import React from 'react';
import { Button } from 'antd';
import { api } from '../../service/api.js';
import CustomerService from '../components/customerService';

class fail extends React.Component {
  state = {
    spanPay: '缴款失败',
  };

  componentDidMount() { }
  // 返回
  cencel = () => {
    this.props.history.push({ pathname: '/home', query: '' });
  };
  render() {
    const { spanPay } = this.state;
    return (
      <div className="body">
        <CustomerService />
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <img src={require('../../public/images/top_icon.png')} />
              <span>您当前位置: 统一公共支付 {'>>'} 缴款失败</span>
            </div>
            <div className="outForm_pay_qingdao">
              <div className="middle_pay">
                <div className="middle_pay">
                  <div className="row">
                    <img
                      style={{ marginTop: 100 }}
                      src={require('../../public/images/failn.png')}
                    />
                    <p className="row_p">缴款失败</p>
                    <div style={{ marginTop: 30 }}>
                      <input
                        className="url_button"
                        type="button"
                        value="返回"
                        onClick={this.cencel}
                      />
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

export default fail;

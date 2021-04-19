import React from 'react';
import { Button } from 'antd';
import { api } from '../../service/api.js';

class fail extends React.Component {
  state = {
    spanPay: '缴款失败',
  };

  componentDidMount() {}
  // 返回
  cencel = () => {
    this.props.history.push({ pathname: '/home', query: '' });
  };
  render() {
    const { spanPay } = this.state;
    return (
      <div className="body">
        <div className="body_icon">
          <span>个人办事{'>'}统一支付平台</span>
        </div>
        <div className="outForm_pay">
          <div className="onForm_pay">
            <div>
              <div>
                <div className="outForm_pay_qingdao">
                  <div className="middle_pay">
                    <div className="middle_pay">
                      <div className="row">
                        <img
                          style={{ marginTop: 40 }}
                          src={require('../../public/images/failn.png')}
                        />
                        <p className="row_p">缴款失败</p>
                        <div style={{ marginTop: 10 }}>
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
        </div>
      </div>
    );
  }
}

export default fail;

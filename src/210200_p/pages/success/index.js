import React from 'react';
import { Button } from 'antd';
import { successs } from '../../service/services';

class success extends React.Component {
  state = {
    merchant_order_no: '',
    spanPay: '缴款成功',
    url: '', //电子票地址
  };

  componentDidMount() {
    let url = this.props.location.search;
    let rsa = url.substring(url.indexOf('=') + 1);
    successs({
      rsa: rsa,
    }).then((res) => {
      if (res.code === 0) {
        console.log(res);
        this.setState({
          url: res.data.einvoice_url,
          merchant_order_no: res.data.merchant_order_no,
        });
      } else {
        this.props.history.push({ pathname: '/fail', query: '' });
      }
    });
  }
  // 点击查看电子票
  url = () => {
    window.location.href = this.state.url;
  };
  // 返回
  cencel = () => {
    this.props.history.push({ pathname: '/home', query: '' });
  };
  render() {
    const { spanPay, url, merchant_order_no } = this.state;
    return (
      <div>
        <div>
          <div className="outForm_pay">
            <div className="img_pay">
              <img src={require('../../public/images/icon_top.png')} />
            </div>
            <div className="onForm_pay">
              <div className="top_pay">
                <span className="topSpan_pay">非税缴款</span>
              </div>
              <div className="middle_pay">
                <div className="row">
                  <img
                    style={{ marginTop: 40 }}
                    src={require('../../public/images/successn.png')}
                  />
                  <p className="row_p">
                    缴款成功,建议保存商户订单号{merchant_order_no}
                    ，以便后续核对查询使用
                  </p>
                  <div style={{ marginTop: 10 }}>
                    {url != null && (
                      <input
                        className="url_button"
                        type="button"
                        value="查看打印财政票据"
                        onClick={this.url}
                      />
                    )}
                    <input
                      className="url_button_clear"
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
    );
  }
}

export default success;

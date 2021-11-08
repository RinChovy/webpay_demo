import React from "react";
import { Button } from "antd";
import { successs } from "../../service/services";
import CustomerService from '../components/customerService';

class success extends React.Component {
  state = {
    merchant_order_no: "",
    spanPay: "缴款成功",
    url: "", //电子票地址
  };

  componentDidMount() {
    let url = this.props.location.search;
    let rsa = url.substring(url.indexOf("=") + 1);
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
        this.props.history.push({ pathname: "/fail", query: "" });
      }
    });
  }
  // 点击查看电子票
  url = () => {
    window.location.href = this.state.url;
  };
  // 返回
  cencel = () => {
    this.props.history.push({ pathname: "/home", query: "" });
  };
  render() {
    const { url } = this.state;
    return (
      <div className="body">
        <CustomerService />
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="outForm_pay_qingdao">
              <div className="onForm_pay_top">
                <img src={require('../../public/images/top_icon.png')} />
                <span>您当前位置: 统一公共支付 {'>>'} 非税缴款</span>
              </div>
              <div className="middle_pay" style={{ justifyContent: 'center' }}>
                <div className="row">
                  <img
                    style={{ marginTop: 100 }}
                    src={require('../../public/images/successn.png')}
                  />
                  <p className="row_p">缴款成功</p>
                  <p className="row_w">如需换开纸质票据，请联系执收单位</p>
                  <div style={{ marginTop: 30 }}>
                    {url != '' && (
                      <input
                        className="url_button"
                        type="button"
                        value="查看电子票"
                        onClick={this.url}
                      />
                    )}
                    <input
                      className={
                        url != '' ? 'url_button_clear' : 'url_button'
                      }
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

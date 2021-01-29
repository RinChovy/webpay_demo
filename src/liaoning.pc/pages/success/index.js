import React from "react";
import { Button } from "antd";
import { api } from "../../service/api.js";

class success extends React.Component {
  state = {
    spanPay: "缴款成功,建议保存商户订单号，以便后续核对查询使用。",
    url:"",//电子票地址
    
  };

  componentDidMount() {
    let url = this.props.location.search; 
    let data = "rsa=" + url;
    fetch(api.common, {
      method: "post", //改成post
      mode: "cors", //跨域
      credentials: 'include',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        regionCode: 210000,
      },
      body: data, //向服务器发送的数据
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          url: "http://www.baidu.com",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // 点击查看电子票
  url=()=>{
    window.location.href = this.state.url
  }
  // 返回
  cencel=()=>{
    this.props.history.push({ pathname: "/home", query: "" });
  }
  render() {
    const { spanPay} = this.state;
    return (
      <div>
        <div>
          <div className="outForm_pay">
            <div className="img_pay">
              <img src={require("./image/icon_top.png")} />
            </div>
            <div className="onForm_pay">
              <div className="top_pay">
                <span className="topSpan_pay">非税缴款</span>
              </div>
              <div className="middle_pay">
                <div className="row">
                  <img style={{marginTop:40}}src={require("./image/successn.png")} />
                  <p className="row_p">
                    {spanPay}
                  </p>
                  <div style={{marginTop:10}}>
                    <input
                      className="url_button"
                      type="button"
                      value="查看打印财政票据"
                      onClick={this.url}
                    />
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

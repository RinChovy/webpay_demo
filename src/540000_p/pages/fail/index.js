import React from "react";
import { Button } from "antd";
import { api } from "../../service/api.js";

class fail extends React.Component {
  state = {
    spanPay: "缴款失败",
  };

  componentDidMount() {}
  // 返回
  cencel = () => {
    this.props.history.push({ pathname: "/home", query: "" });
  };
  render() {
    const { spanPay } = this.state;
    return (
      <div>
        <div>
          <div className="outForm_pay">
            <div className="img_pay">
              <img src={require("../../public/images/icon_top.png")} />
            </div>
            <div className="onForm_pay">
              <div className="top_pay">
                <span className="topSpan_pay">非税缴款</span>
              </div>
              <div className="middle_pay">
                <div className="row">
                  <img
                    style={{ marginTop: 40 }}
                    src={require("../../public/images/failn.png")}
                  />
                  <p className="row_p" style={{ color: "#e22721" }}>
                    {spanPay}
                  </p>
                  <div style={{ marginTop: 10 }}>
                    <input
                      className="url_button_clear"
                      style={{ marginLeft: 0 }}
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

export default fail;

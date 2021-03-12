import React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { queryPayInfo } from "../../service/services";
import { api } from "../../service/api";
import style from "../../public/css/index.css";

class Home extends React.Component {
  state = {
    spanPay: "温馨提示",
  };

  componentDidMount() {}

  render() {
    const { spanPay } = this.state;
    return (
      <div className="body">
        <div className="body_icon">
          <img src={require("../../public/images/icon_top.png")} />
        </div>
        <div className="outForm_pay">
          <div className="img_pay">
            <div className="onForm_pay">
              <div className="top_pay">
                <span className="topSpan_pay">非税缴款</span>
              </div>
              <div>
                <div>
                  <div className="outForm_pay_qingdao">
                    <div className="middle_pay">
                      <div className="middle_pay_left">
                        <div className="middle_pay_left_org"></div>
                      </div>
                      <div className="middle_pay_right">
                        <div className="middle_pay_right_org"></div>
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

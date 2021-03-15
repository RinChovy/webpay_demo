import React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { queryPayInfo } from "../../service/services";
import { api } from "../../service/api";
import style from "../../public/css/index.css";

class Home extends React.Component {
  state = {
    spanPay: "客服热线电话:18686617479", //温馨提示
    topLeft: "home_right_topLeft active", //左侧按钮class
    rightLeft: "home_right_topRight", //右侧按钮class
    leftOrRight: "left", //控制显示隐藏参数
    url: "http://220.182.49.217:18686/billcheck/html/index.html", //票据查询地址
  };

  componentDidMount() {}
  // 左侧按钮方法
  left = () => {
    this.setState({
      topLeft: "home_right_topLeft active",
      rightLeft: "home_right_topRight",
      leftOrRight: "left",
    });
  };
  // 右侧按钮方法
  right = () => {
    this.setState({
      topLeft: "home_right_topLeft",
      rightLeft: "home_right_topRight active",
      leftOrRight: "right",
    });
  };
  // 非税缴款
  NTpay = () => {
    this.props.history.push({
      pathname: "/index_pay",
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
        marginLeft: "50px",
      },
    };
    const marginTop = {
      style: {
        marginTop: "10px",
      },
    };
    const center = {
      style: {
        width: "500px",
        textAlign: "center",
      },
    };
    return (
      <div className="body">
        <div className="body_icon">
          <img src={require("../../public/images/icon_top.png")} />
        </div>
        <div className="outForm_pay">
          <div className="img_pay">
            <div className="onForm_pay">
              <div className="home">
                <div className="home_left">
                  <img
                    {...margin}
                    src={require("../../public/images/xizang/left.png")}
                  />
                </div>
                <div className="home_right">
                  <div className="home_right_nei">
                    <div className={topLeft} onClick={this.left}>
                      <span>缴款</span>
                    </div>
                    <div className={rightLeft} onClick={this.right}>
                      <span>缴款</span>
                    </div>
                    {leftOrRight === "left" && (
                      <div className="box_wai">
                        <div className="box" onClick={this.NTpay}>
                          <img
                            src={require("../../public/images/xizang/feishui.png")}
                          />
                          <div {...marginTop}>
                            <span>非税缴款</span>
                          </div>
                        </div>
                        <div className="box" onClick={this.evURL}>
                          <img
                            src={require("../../public/images/xizang/caizheng.png")}
                          />
                          <div {...marginTop}>
                            <span>票据查询</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {leftOrRight === "right" && (
                      <div className="box_wai">
                        <div className="box">
                          <img
                            src={require("../../public/images/xizang/caizheng.png")}
                          />
                          <div>
                            <span>右侧</span>
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

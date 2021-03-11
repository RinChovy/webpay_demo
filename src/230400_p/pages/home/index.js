import React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { queryPayInfo } from "../../service/services";
import { api } from "../../service/api";
import style from "../../public/css/index.css";

class NonTaxPay extends React.Component {
  formRef = React.createRef();
  state = {
    warnSpan:
      "1.博思软件技术支持联系人：王岷峰 电话：15776139000;</br>2.业务范围（场景）只支持直缴业务，暂不支持交罚以及汇缴业务;</br>3.如预算单位需要使用汇缴业务，或者需要与自身业务系统对接，可联系上述软件技术支持人员。",
    codeUrl: api.getCo, //验证码
  };

  componentDidMount() {}
  // 提示信息方法
  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: "查询错误",
      description: msg,
    });
  };
  // 清空
  onReset = () => {
    this.formRef.current.resetFields();
  };
  // 验证码换一张
  changeImg = () => {
    const { codeUrl } = this.state;
    let newCode = this.chgUrl(codeUrl);
    this.setState({
      codeUrl: newCode,
    });
  };
  //验证码时间戳
  chgUrl(url) {
    var timestamp = new Date().valueOf();
    // url = url.substring(0, 100);
    if (url.indexOf("&") >= 0) {
      url = url + "×tamp=" + timestamp;
    } else {
      // url = url + '?timestamp=' + timestamp;
      url = url + "?timestamp=" + timestamp;
    }
    return url;
  }
  //提交成功
  handleFormSubmit = (values) => {
    queryPayInfo({
      payCode: values.payCode,
      payPeople: values.payName,
      code: values.verificationCode,
    }).then((res) => {
      res.code === 0 ? this.handleSuccess(res.data) : this.handleError(res.msg);
    });
  };
  // 提交成功
  handleSuccess = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    this.props.history.push({
      pathname: "/index_charge",
      // query: res.data,
    });
  };
  // 提交失败1
  handleError = (err) => {
    localStorage.removeItem("data");
    this.openNotificationWithIcon("error", err);
  };
  //提交失败2
  onFinishFailed = (values) => {
    console.log("fail:", values);
  };
  render() {
    const { spanPay, spanPayTop, codeUrl, warnSpan } = this.state;
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 2,
        span: 20,
      },
    };
    return (
      <div>
        <div>
          <div className="outForm_pay_qingdao">
            <div className="middle_pay">
              <div className="middle_pay_left"></div>
              <div className="middle_pay_right">
                <div className="middle_pay_right_org">
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    ref={this.formRef}
                    onFinish={this.handleFormSubmit}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <div className="middle_box">
                      <span style={{ fontSize: 15, color: "#787584" }}>
                        缴款通知书编号：
                      </span>

                      <Form.Item
                        style={{ marginTop: 6 }}
                        name="payCode"
                        rules={[
                          {
                            required: true,
                            message: "请输入缴款码",
                          },
                          {
                            pattern: api.regular,
                            message: api.regularText,
                          },
                        ]}
                      >
                        <Input size="large" style={{ width: 376 }} />
                      </Form.Item>

                      <span style={{ fontSize: 15, color: "#787584" }}>
                        缴款人：
                      </span>

                      <Form.Item
                        style={{ marginTop: 6 }}
                        name="payName"
                        rules={[
                          {
                            required: true,
                            message: "请输入缴款人",
                          },
                        ]}
                      >
                        <Input size="large" style={{ width: 376 }} />
                      </Form.Item>

                      <span style={{ fontSize: 15, color: "#787584" }}>
                        验证码：
                      </span>
                      <Row gutter={8}>
                        <Col span={12}>
                          <Form.Item
                            style={{ marginTop: 6 }}
                            name="verificationCode"
                            rules={[
                              {
                                required: true,
                                message: "请输入验证码",
                              },
                            ]}
                          >
                            <Input size="large" style={{ width: 180 }} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <img
                            className="verificationCode"
                            alt="验证码"
                            src={codeUrl}
                          />
                          <span
                            style={{
                              marginLeft: 20,
                              cursor: "pointer",
                              color: "#1890ff",
                            }}
                            onClick={this.changeImg}
                          >
                            换一张
                          </span>
                        </Col>
                      </Row>
                    </div>

                    <Form.Item {...tailLayout} style={{ marginTop: 10 }}>
                      <Button
                        className="button_submit"
                        size="large"
                        type="primary"
                        htmlType="submit"
                      >
                        下一步
                      </Button>

                      <Button
                        className="button_clear"
                        size="large"
                        onClick={this.onReset}
                      >
                        清空
                      </Button>
                    </Form.Item>
                    <div
                      style={{
                        marginTop: "-9px",
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {/* <span>{warnSpan}</span> */}
                    </div>
                  </Form>
                  <div className="bottom_span">
                    <span dangerouslySetInnerHTML={{ __html: warnSpan }}></span>
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

export default NonTaxPay;

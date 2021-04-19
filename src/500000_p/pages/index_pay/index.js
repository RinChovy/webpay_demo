import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { queryPayInfo } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';
import Left from '../components/left';

class NonTaxPay extends React.Component {
  formRef = React.createRef();
  state = {
    spanPayTop: '温馨提示',
    spanPay: '缴款码为执收单位开具的非税收入一般缴款书上的19位编码。',
    codeUrl: api.getCo, //验证码
    loadings: [], //等待时间
  };

  componentDidMount() {
    const { codeUrl } = this.state;
    const timestamp = new Date().valueOf();
    this.setState({
      codeUrl: codeUrl.split('?')[0] + '?timestamp=' + timestamp,
    });
  }
  // 提示信息方法
  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: '查询错误',
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
    const timestamp = new Date().valueOf();
    this.setState({
      codeUrl: codeUrl.split('?')[0] + '?timestamp=' + timestamp,
    });
  };
  //提交成功
  handleFormSubmit = (values) => {
    //防止重复点击
    const { loadings } = this.state;
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[1] = true;
      return {
        loadings: newLoadings,
      };
    });
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
    localStorage.setItem('data', JSON.stringify(data));
    this.props.history.push({
      pathname: '/index_charge',
      // query: res.data,
    });
  };
  // 提交失败1
  handleError = (err) => {
    localStorage.removeItem('data');
    this.openNotificationWithIcon('error', err);
    //防止重复点击解开按钮限制
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[1] = false;
      return {
        loadings: newLoadings,
      };
    });
  };
  //提交失败
  onFinishFailed = (values) => {
    console.log('fail:', values);
  };
  render() {
    const { codeUrl, loadings } = this.state;
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
        offset: 8,
        span: 16,
      },
    };
    return (
      <div className="body">
        <div className="body_icon">
          <span>
            个人办事{'>'}统一支付平台{'>'}非税缴款
          </span>
        </div>
        <div className="outForm_pay">
          <div className="onForm_pay">
            <div>
              <div>
                <div className="outForm_pay_qingdao">
                  <div className="middle_pay">
                    <div className="middle_pay_left">
                      <Left history={this.props.history} over="1" />
                    </div>
                    <div className="middle_pay_right">
                      <div className="div2">
                        <div className="div2_top">
                          <div>
                            <span>非税缴款</span>
                          </div>
                        </div>
                      </div>
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
                            <Form.Item
                              label={
                                <span style={{ fontSize: 17 }}>缴款码</span>
                              }
                            >
                              <Row gutter={8}>
                                <Col span={12}>
                                  <Form.Item
                                    name="payCode"
                                    style={{ width: 400 }}
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入缴款码',
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="input_chongqing"
                                      size="large"
                                      style={{ width: 400 }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: -20 }}
                              label={
                                <span style={{ fontSize: 17 }}>验证码</span>
                              }
                            >
                              <Row gutter={8}>
                                <Col span={9}>
                                  <Form.Item
                                    name="verificationCode"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入验证码',
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="input_chongqing"
                                      size="large"
                                      style={{ width: 200 }}
                                    />
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
                                      marginLeft: 10,
                                      cursor: 'pointer',
                                      color: '#1890ff',
                                    }}
                                    onClick={this.changeImg}
                                  >
                                    换一张
                                  </span>
                                </Col>
                              </Row>
                            </Form.Item>
                          </div>

                          <Form.Item {...tailLayout} style={{ marginTop: 40 }}>
                            <Button
                              className="button_chongqing"
                              size="large"
                              type="primary"
                              htmlType="submit"
                              loading={loadings[1]}
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
                        </Form>
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

export default NonTaxPay;

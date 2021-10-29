import React from 'react';
import { Form, Input, Button, Row, Col, notification, Modal } from 'antd';
import { queryPayInfo, getCo } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';
import Privacy from '../components/privacy';

class NonTaxPay extends React.Component {
  formRef = React.createRef();
  state = {
    spanPayTop: '温馨提示',
    spanPay: '缴款码为执收单位开具的非税收入一般缴款书上的20位编码。',
    spanPay2: '缴款人为执收单位开具的非税收入电子缴款通知书上的缴款人。',
    spanPay3: ' 建议使用谷歌浏览器。',
    codeUrl: api.getCo, //验证码
    loadings: [], //等待时间
    isModalVisible: false, // 遮罩控制
  };

  componentDidMount() {
    console.log('2021-10-29')
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
  handleFormSubmit = values => {
    //防止重复点击
    const { loadings, uuid } = this.state;
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
    }).then(res => {
      res.code === 0 ? this.handleSuccess(res.data) : this.handleError(res.msg);
    });
  };
  // 提交成功
  handleSuccess = data => {
    localStorage.setItem('data', JSON.stringify(data));
    this.props.history.push({
      pathname: '/index_charge',
      // query: res.data,
    });
  };
  // 提交失败1
  handleError = err => {
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
  onFinishFailed = values => {
    console.log('fail:', values);
  };
  // 打开遮罩
  handleModel = () => {
    this.setState({
      isModalVisible: true
    })
  }
  // 关闭遮罩
  isHandleModel = () => {
    this.setState({
      isModalVisible: false
    })
  }
  render() {
    const {
      spanPay,
      spanPay2,
      spanPay3,
      spanPayTop,
      codeUrl,
      loadings,
      isModalVisible,
    } = this.state;
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
    const warning = {
      style: {
        color: 'red',
        width: '500px',
        lineHeight: '30px',
        fontSize: '17px',
        textAlign: 'center',
        fontWeight: 'bold',
      },
    };
    return (
      <div className="body">
        <div className="body_icon">
          <img src={require('../../public/images/icon_top.png')} />
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
                        <div className="middle_pay_left_org">
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
                                      style={{ width: 400 }}
                                      name="payCode"
                                      rules={[
                                        {
                                          required: true,
                                          message: '请输入缴款码',
                                        },
                                        {
                                          pattern: api.regular,
                                          message: api.regularText,
                                        },
                                      ]}
                                    >
                                      <Input
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
                                  <span style={{ fontSize: 17 }}>缴款人</span>
                                }
                              >
                                <Row gutter={8}>
                                  <Col span={12}>
                                    <Form.Item
                                      style={{ width: 400 }}
                                      name="payName"
                                      rules={[
                                        {
                                          required: true,
                                          message: '请输入缴款人',
                                        },
                                      ]}
                                    >
                                      <Input
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
                                  <Col span={12}>
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
                                        marginLeft: 20,
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

                            <Form.Item
                              {...tailLayout}
                              style={{ marginTop: 40 }}
                            >
                              <Button
                                className="button_submit"
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
                          <div style={{ width: '100%', paddingLeft: '47%', cursor: 'pointer' }}>
                            <span>阅读并接受<span style={{ color: 'rgb(24, 144, 255)' }} onClick={this.handleModel}>《用户隐私声明》</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="middle_pay_right">
                        <div className="middle_pay_right_org">
                          <div className="span_pay_top">{spanPayTop}</div>
                          <div className="span_pay">
                            {spanPay} {<br />} {spanPay2} {<br />} {spanPay3}
                          </div>
                        </div>
                        <span {...warning}>
                          缴费问题咨询热线:4008885699 按1键
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal title="用户隐私声明" visible={isModalVisible} onCancel={this.isHandleModel} width='1000px' footer={[
          <Button key="back" type="primary" onClick={this.isHandleModel}>
            已阅读
          </Button>,
        ]}>
          <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            <Privacy />
          </div>
        </Modal>
      </div>
    );
  }
}

export default NonTaxPay;

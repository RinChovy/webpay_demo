import React from 'react';
import { Form, Input, Button, Row, Col, notification, Modal } from 'antd';
import {
  queryPayInfo,
  getCo,
  queryPayInfoByIdentityCard,
} from '../../service/services';
import { api } from '../../service/api';
import Privacy from '../components/privacy';
import CustomerService from '../components/customerService';

class education extends React.Component {
  formRef = React.createRef();
  state = {
    blurInput: {
      paycode: false,
      payname: false,
      code: false,
    },
    spanPayTop: '温馨提示',
    spanPay: '缴款码为执收单位开具的非税收入一般缴款书上的20位编码。',
    codeUrl: '', //验证码
    codeUrl2: '', //验证码
    uuid: '', //uuid
    uuid2: '', //uuid
    loadings: [], //等待时间
    classLeft: 'classHover', //左侧按钮
    classRight: 'classNotHover', //右侧按钮
    isModalVisible: false, // 遮罩控制
  };

  componentDidMount() {
    getCo().then((res) => {
      res.code === 0
        ? this.setState({
          codeUrl: 'data:image/gif;base64,' + res.data.img,
          codeUrl2: 'data:image/gif;base64,' + res.data.img,
          uuid: res.data.uuid,
          uuid2: res.data.uuid,
        })
        : this.handleError(res.msg);
    });
  }
  left = () => {
    this.setState({
      classLeft: 'classHover',
      classRight: 'classNotHover',
    });
  };
  right = () => {
    this.setState({
      classLeft: 'classNotHover',
      classRight: 'classHover',
    });
  };
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
    const timestamp = new Date().valueOf();
    getCo({ timestamp: timestamp }).then((res) => {
      res.code === 0
        ? this.setState({
          codeUrl: 'data:image/gif;base64,' + res.data.img,
          uuid: res.data.uuid,
        })
        : this.handleError(res.msg);
    });
  };
  // 验证码换一张
  changeImg2 = () => {
    const timestamp = new Date().valueOf();
    getCo({ timestamp: timestamp }).then((res) => {
      res.code === 0
        ? this.setState({
          codeUrl2: 'data:image/gif;base64,' + res.data.img,
          uuid2: res.data.uuid,
        })
        : this.handleError(res.msg);
    });
  };
  //焦点获取
  focusInput = (e) => {
    this.setState(({ blurInput }) => {
      let newJson = blurInput;
      newJson[e] = true;
      return {
        blurInput: newJson,
      };
    });
  };
  //焦点丢失
  blurInput = (e) => {
    this.setState(({ blurInput }) => {
      let newJson = blurInput;
      newJson[e] = false;
      return {
        blurInput: newJson,
      };
    });
  };
  //提交成功
  handleFormSubmit = (values) => {
    //防止重复点击
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
      uuid: this.state.uuid,
    }).then((res) => {
      res.code === 0 ? this.handleSuccess(res.data) : this.handleError(res.msg);
    });
  };
  //提交教育缴费成功
  handleFormSubmit2 = (values) => {
    //防止重复点击
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[1] = true;
      return {
        loadings: newLoadings,
      };
    });
    queryPayInfoByIdentityCard({
      idNumber: values.idNumber,
      payPeople: values.payName,
      code: values.verificationCode,
      uuid: this.state.uuid2,
    }).then((res) => {
      res.code === 0
        ? this.handleSuccess_e(res.data)
        : this.handleError(res.msg);
    });
  };
  // 提交成功
  handleSuccess = (data) => {
    localStorage.setItem('spanTop', '非税缴款');
    localStorage.setItem('data', JSON.stringify(data));
    this.props.history.push({
      pathname: '/index_charge',
      // query: res.data,
    });
  };
  // 提交成功教育缴费
  handleSuccess_e = (data) => {
    localStorage.setItem('spanTop', '教育缴费');
    localStorage.setItem('edu_data', JSON.stringify(data));
    this.props.history.push({
      pathname: '/index_pay_idcard',
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
      codeUrl,
      codeUrl2,
      loadings,
      blurInput,
      classLeft,
      classRight,
      isModalVisible
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
        offset: 4,
        span: 16,
      },
    };
    return (
      <div className="body">
        <CustomerService />
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <img src={require('../../public/images/top_icon.png')} />
              <span>
                您当前位置: 统一公共支付 {'>>'}{' '}
                {localStorage.getItem('contents')
                  ? localStorage.getItem('contents')
                  : '教育缴款'}
              </span>
            </div>
            <div className="outForm_pay_qingdao">
              <div className="middle_pay">
                <div className="middle_pay_left">
                  <img src={require('../../public/images/eductaion.png')} />
                </div>
                <div className="middle_pay_right">
                  <div className="middle_pay_right_org_e">
                    <div className="middle_pay_right_org_top">
                      <div className={classLeft} onClick={this.left}>
                        <span>按缴款码查询</span>
                      </div>
                      <div className={classRight} onClick={this.right}>
                        <span>按身份证查询</span>
                      </div>
                    </div>
                    {classLeft == 'classHover' && (
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
                          <Form.Item style={{ marginBottom: 11 }}>
                            <Row gutter={8}>
                              <Col span={12}>
                                <Form.Item
                                  name="payCode"
                                  style={{ width: 420, marginLeft: '-5px' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入缴款码',
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={
                                      blurInput.paycode == true ? (
                                        <div className="input_icon_2">
                                          <img
                                            src={require('../../public/images/paycode_1.png')}
                                          />
                                        </div>
                                      ) : (
                                        <div className="input_icon">
                                          <img
                                            src={require('../../public/images/paycode_1_hover.png')}
                                          />
                                        </div>
                                      )
                                    }
                                    onFocus={() => this.focusInput('paycode')}
                                    onBlur={() => this.blurInput('paycode')}
                                    placeholder="请输入缴款码"
                                    className={
                                      blurInput.paycode == true
                                        ? 'input_ningxia_hover'
                                        : 'input_ningxia'
                                    }
                                    size="large"
                                    style={{ width: 420, borderRadius: 0 }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form.Item>
                          <Form.Item style={{ marginBottom: 11 }}>
                            <Row gutter={8}>
                              <Col span={12}>
                                <Form.Item
                                  name="payName"
                                  style={{ width: 420, marginLeft: '-5px' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入缴款人',
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={
                                      blurInput.payname == true ? (
                                        <div className="input_icon_2">
                                          <img
                                            src={require('../../public/images/paycode_2.png')}
                                          />
                                        </div>
                                      ) : (
                                        <div className="input_icon">
                                          <img
                                            src={require('../../public/images/paycode_2_hover.png')}
                                          />
                                        </div>
                                      )
                                    }
                                    onFocus={() => this.focusInput('payname')}
                                    onBlur={() => this.blurInput('payname')}
                                    placeholder="请输入缴款人"
                                    className={
                                      blurInput.payname == true
                                        ? 'input_ningxia_hover'
                                        : 'input_ningxia'
                                    }
                                    size="large"
                                    style={{ width: 420, borderRadius: 0 }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form.Item>
                          <Form.Item style={{ width: 630 }}>
                            <Row gutter={8}>
                              <Col span={12}>
                                <Form.Item
                                  name="verificationCode"
                                  style={{ marginLeft: '-5px' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入验证码',
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={
                                      blurInput.code == true ? (
                                        <div className="input_icon_2">
                                          <img
                                            src={require('../../public/images/paycode_3.png')}
                                          />
                                        </div>
                                      ) : (
                                        <div className="input_icon">
                                          <img
                                            src={require('../../public/images/paycode_3_hover.png')}
                                          />
                                        </div>
                                      )
                                    }
                                    onFocus={() => this.focusInput('code')}
                                    onBlur={() => this.blurInput('code')}
                                    placeholder="请输入验证码"
                                    className={
                                      blurInput.code == true
                                        ? 'input_ningxia_hover'
                                        : 'input_ningxia'
                                    }
                                    size="large"
                                    style={{ width: 230 }}
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
                            className="button_ningxia"
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
                    )}
                    {classRight == 'classHover' && (
                      <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                          remember: true,
                        }}
                        ref={this.formRef}
                        onFinish={this.handleFormSubmit2}
                        onFinishFailed={this.onFinishFailed}
                      >
                        <div className="middle_box">
                          <Form.Item style={{ marginBottom: 11 }}>
                            <Row gutter={8}>
                              <Col span={12}>
                                <Form.Item
                                  name="idNumber"
                                  style={{ width: 420, marginLeft: '-5px' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入身份证号',
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="请输入身份证号"
                                    prefix={
                                      blurInput.paycode == true ? (
                                        <div className="input_icon_2">
                                          <img
                                            src={require('../../public/images/paycode_1.png')}
                                          />
                                        </div>
                                      ) : (
                                        <div className="input_icon">
                                          <img
                                            src={require('../../public/images/paycode_1_hover.png')}
                                          />
                                        </div>
                                      )
                                    }
                                    onFocus={() => this.focusInput('paycode')}
                                    onBlur={() => this.blurInput('paycode')}
                                    className={
                                      blurInput.paycode == true
                                        ? 'input_ningxia_hover'
                                        : 'input_ningxia'
                                    }
                                    size="large"
                                    style={{ width: 420, borderRadius: 0 }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form.Item>
                          <Form.Item style={{ marginBottom: 11 }}>
                            <Row gutter={8}>
                              <Col span={12}>
                                <Form.Item
                                  name="payName"
                                  style={{ width: 420, marginLeft: '-5px' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入缴款人',
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={
                                      blurInput.payname == true ? (
                                        <div className="input_icon_2">
                                          <img
                                            src={require('../../public/images/paycode_2.png')}
                                          />
                                        </div>
                                      ) : (
                                        <div className="input_icon">
                                          <img
                                            src={require('../../public/images/paycode_2_hover.png')}
                                          />
                                        </div>
                                      )
                                    }
                                    onFocus={() => this.focusInput('payname')}
                                    onBlur={() => this.blurInput('payname')}
                                    placeholder="请输入缴款人"
                                    className={
                                      blurInput.payname == true
                                        ? 'input_ningxia_hover'
                                        : 'input_ningxia'
                                    }
                                    size="large"
                                    style={{ width: 420, borderRadius: 0 }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form.Item>
                          <Form.Item style={{ width: 630 }}>
                            <Row gutter={8}>
                              <Col span={12}>
                                <Form.Item
                                  name="verificationCode"
                                  style={{ marginLeft: '-5px' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入验证码',
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={
                                      blurInput.code == true ? (
                                        <div className="input_icon_2">
                                          <img
                                            src={require('../../public/images/paycode_3.png')}
                                          />
                                        </div>
                                      ) : (
                                        <div className="input_icon">
                                          <img
                                            src={require('../../public/images/paycode_3_hover.png')}
                                          />
                                        </div>
                                      )
                                    }
                                    onFocus={() => this.focusInput('code')}
                                    onBlur={() => this.blurInput('code')}
                                    placeholder="请输入验证码"
                                    className={
                                      blurInput.code == true
                                        ? 'input_ningxia_hover'
                                        : 'input_ningxia'
                                    }
                                    size="large"
                                    style={{ width: 230 }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <img
                                  className="verificationCode"
                                  alt="验证码"
                                  src={codeUrl2}
                                />
                                <span
                                  style={{
                                    marginLeft: 10,
                                    cursor: 'pointer',
                                    color: '#1890ff',
                                  }}
                                  onClick={this.changeImg2}
                                >
                                  换一张
                                </span>
                              </Col>
                            </Row>
                          </Form.Item>
                        </div>

                        <Form.Item {...tailLayout} style={{ marginTop: 40 }}>
                          <Button
                            className="button_ningxia"
                            size="large"
                            type="primary"
                            htmlType="submit_education"
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
                    )}
                    <div style={{ width: '100%', paddingLeft: '24%', cursor: 'pointer' }}>
                      <span>阅读并接受<span style={{ color: 'rgb(24, 144, 255)' }} onClick={this.handleModel}>《用户隐私声明》</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal title="隐私授权声明" visible={isModalVisible} onCancel={this.isHandleModel} width='1000px' footer={[
          <Button key="back" type="primary" onClick={this.isHandleModel}>
            已阅读
          </Button>,
        ]}>
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <Privacy />
          </div>
        </Modal>
      </div>
    );
  }
}

export default education;

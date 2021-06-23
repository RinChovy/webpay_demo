import React from 'react';
import { Form, Input, Button, Row, Col, notification, Popover } from 'antd';
import { queryPayInfo, nontaxPage, getCo } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';

class NonTaxPay extends React.Component {
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
    uuid: '', //uuid
    loadings: [], //等待时间
  };

  componentDidMount() {
    const url = location.href;
    if (url.search('areaId') != -1) {
      const areaId = url.substring(url.indexOf('areaId=') + 7);
      nontaxPage({
        areaId: areaId,
      }).then((res) => {
        res.code === 0
          ? localStorage.setItem('areaId', areaId)
          : this.openNotificationWithIcon('error', res.msg);
      });
    }
    //验证码生成
    getCo().then((res) => {
      res.code === 0
        ? this.setState({
            codeUrl: 'data:image/gif;base64,' + res.data.img,
            uuid: res.data.uuid,
          })
        : this.handleError(res.msg);
    });
  }
  // 页面销毁生命周期
  componentWillUnmount() {
    window.location.reload();
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

  // 提交
  handleFormSubmit = (values) => {
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
      uuid: uuid,
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
    const { loadings } = this.state;
    //防止重复点击解开按钮限制
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[1] = false;
      return {
        loadings: newLoadings,
      };
    });
  };
  // 提交失败
  onFinishFailed = (values) => {
    console.log('fail:', values);
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
  render() {
    const { spanPay, spanPayTop, codeUrl, loadings, blurInput } = this.state;
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
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <span>统一支付公共平台</span>
              <span className="right">
                当前位置:&nbsp; 首页 &nbsp;{'>'}&nbsp;非税缴款
              </span>
            </div>

            <div className="outForm_pay_qingdao">
              <div className="middle_pay">
                <div className="middle_pay_left">
                  <img src={require('../../public/images/paycode.png')} />
                </div>
                <div className="middle_pay_right">
                  <div className="middle_pay_right_org_e">
                    <div
                      className="middle_pay_right_org_top"
                      style={{ width: 130 }}
                    >
                      <div className="classHover">
                        <span>按缴款码查询</span>
                      </div>
                    </div>
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
                              <Popover
                                placement="bottomLeft"
                                content={spanPay}
                                trigger="click"
                              >
                                <img
                                  style={{
                                    position: 'absolute',
                                    right: -272,
                                    top: 10,
                                    width: 20,
                                    height: 20,
                                  }}
                                  src={require('../../public/images/warning.png')}
                                />
                              </Popover>
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

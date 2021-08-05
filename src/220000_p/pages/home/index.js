import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { queryPayInfo, getCo } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';

class NonTaxPay extends React.Component {
  formRef = React.createRef();
  state = {
    codeUrl: '', //验证码
    uuid: '', //uuid
    loadings: [], //等待时间
    menuState: '001', //决定显示隐藏
    buttonList: [
      {
        name: '非税缴款',
        id: '001',
        class: 'box_button box_button_hover',
      },
      {
        name: '缴款查询',
        id: '002',
        class: 'box_button',
      },
    ],
  };

  componentDidMount() {
    getCo().then((res) => {
      res.code === 0
        ? this.setState({
            codeUrl: 'data:image/gif;base64,' + res.data.img,
            uuid: res.data.uuid,
          })
        : this.handleError(res.msg);
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

  //提交
  handleFormSubmit = (type, values) => {
    //防止重复点击
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[1] = true;
      return {
        loadings: newLoadings,
      };
    });
    switch (type) {
      case '001':
        localStorage.removeItem('type');
        queryPayInfo({
          payCode: values.payCode,
          payPeople: values.payName,
          code: values.verificationCode,
          uuid: this.state.uuid,
        }).then((res) => {
          res.code === 0
            ? this.handleSuccess(res.data)
            : this.handleError(res.msg);
        });
        break;
      case '002':
        localStorage.setItem('type', '1');
        queryPayInfo({
          payCode: values.payCode,
          payPeople: values.payName,
          code: values.verificationCode,
          uuid: this.state.uuid,
        }).then((res) => {
          res.code === 0
            ? this.handleSuccessSelect(res.data)
            : this.handleError(res.msg);
        });
        break;
      default:
        null;
    }
  };

  // 提交成功
  handleSuccess = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
    this.props.history.push({
      pathname: '/index_charge',
    });
  };
  // 提交成功-前往查询页
  handleSuccessSelect = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
    this.props.history.push({
      pathname: '/index_charge',
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
  //提交失败
  onFinishFailed = (values) => {
    console.log('fail:', values);
  };
  //菜单按钮
  handleMenu = (menu) => {
    let { buttonList } = this.state;
    let buttonListIndex = buttonList.findIndex((v) => v.id == menu.id);
    let buttonListIndex2 = buttonList.findIndex(
      (v) => v.class == 'box_button box_button_hover'
    );
    buttonList[buttonListIndex2].class = 'box_button';
    buttonList[buttonListIndex] = {
      name: menu.name,
      id: menu.id,
      class: 'box_button box_button_hover',
    };
    this.setState({
      buttonList: buttonList,
      menuState: menu.id,
    });
  };
  render() {
    const { codeUrl, loadings, buttonList, menuState } = this.state;
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
        offset: 5,
        span: 20,
      },
    };
    const menu = buttonList.map((v, k) => {
      return (
        <div onClick={() => this.handleMenu(v)} className={v.class} key={k}>
          {v.name}
        </div>
      );
    });
    return (
      <div>
        <div>
          <div className="outForm_pay_qingdao">
            <div className="top_logo">
              <div className="top_logo_span"></div>
              <span style={{ verticalAlign: 'top', marginLeft: 20 }}>
                缴费业务
              </span>
            </div>
            <div className="manu">{menu}</div>
            {menuState === '001' && (
              <div className="middle_pay">
                <div className="middle_pay_one">
                  <img src={require('../../public/images/left_2.png')} />
                </div>
                <div className="middle_pay_two">
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    ref={this.formRef}
                    onFinish={(values) => this.handleFormSubmit('001', values)}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <div className="middle_box">
                      <Form.Item
                        style={{ marginLeft: '-140px', marginTop: 40 }}
                        label={
                          <span style={{ fontSize: 16, color: '#666666' }}>
                            缴款码
                          </span>
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
                                className="orgInput"
                                size="large"
                                style={{ width: 400 }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item
                        style={{ marginLeft: '-140px', marginTop: -20 }}
                        label={
                          <span style={{ fontSize: 16, color: '#666666' }}>
                            缴款人
                          </span>
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
                                className="orgInput"
                                size="large"
                                style={{ width: 400 }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item
                        // style={{ marginTop: -20 }}
                        style={{ marginLeft: '-140px', marginTop: -20 }}
                        label={
                          <span style={{ fontSize: 16, color: '#666666' }}>
                            验证码
                          </span>
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
                                className="orgInput"
                                size="large"
                                style={{ width: 200 }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <img
                              style={{ marginTop: 2 }}
                              className="verificationCode"
                              alt="验证码"
                              src={codeUrl}
                            />
                            <span
                              style={{
                                marginLeft: 20,
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#FF6100',
                              }}
                              onClick={this.changeImg}
                            >
                              换一张
                            </span>
                          </Col>
                        </Row>
                      </Form.Item>
                    </div>

                    <Form.Item {...tailLayout} style={{ marginTop: 10 }}>
                      <Button
                        className="button_submit"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loadings[1]}
                      >
                        缴款
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
                <div className="middle_pay_three">
                  <div>
                    <span>温馨提示</span>
                    <p style={{ marginTop: 20 }}>
                      缴款码为执收单位开具的非税收入一般缴款书上的20位编码
                    </p>
                  </div>
                </div>
              </div>
            )}
            {menuState === '002' && (
              <div className="middle_pay">
                <div className="middle_pay_one">
                  <img src={require('../../public/images/chaxun.png')} />
                </div>
                <div className="middle_pay_two">
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    ref={this.formRef}
                    onFinish={(values) => this.handleFormSubmit('002', values)}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <div className="middle_box">
                      <Form.Item
                        style={{ marginLeft: '-140px', marginTop: 40 }}
                        label={
                          <span style={{ fontSize: 16, color: '#666666' }}>
                            缴款码
                          </span>
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
                                className="orgInput"
                                size="large"
                                style={{ width: 400 }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item
                        style={{ marginLeft: '-140px', marginTop: -20 }}
                        label={
                          <span style={{ fontSize: 16, color: '#666666' }}>
                            缴款人
                          </span>
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
                                className="orgInput"
                                size="large"
                                style={{ width: 400 }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item
                        // style={{ marginTop: -20 }}
                        style={{ marginLeft: '-140px', marginTop: -20 }}
                        label={
                          <span style={{ fontSize: 16, color: '#666666' }}>
                            验证码
                          </span>
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
                                className="orgInput"
                                size="large"
                                style={{ width: 200 }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <img
                              style={{ marginTop: 2 }}
                              className="verificationCode"
                              alt="验证码"
                              src={codeUrl}
                            />
                            <span
                              style={{
                                marginLeft: 20,
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#FF6100',
                              }}
                              onClick={this.changeImg}
                            >
                              换一张
                            </span>
                          </Col>
                        </Row>
                      </Form.Item>
                    </div>

                    <Form.Item {...tailLayout} style={{ marginTop: 10 }}>
                      <Button
                        className="button_submit"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loadings[1]}
                      >
                        查询
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
                <div className="middle_pay_three">
                  <div>
                    <span>温馨提示</span>
                    <p style={{ marginTop: 20 }}>
                      缴费人可以通过缴款码查询缴费结果信息。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NonTaxPay;

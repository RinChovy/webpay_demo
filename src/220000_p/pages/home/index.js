import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { queryPayInfo } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';

class NonTaxPay extends React.Component {
  formRef = React.createRef();
  state = {
    warnSpan: '“非税缴费技术服务电话 0532-85856831”',
    codeUrl: api.getCo, //验证码
    loadings: [], //等待时间
    buttonList: [
      {
        name: '非税缴款',
        id: '001',
        class: 'box_button box_button_hover',
      },
      // {
      //     'name':'缴款查询',
      //     'id':'002'
      // },
      {
        name: '教育缴费',
        id: '003',
        class: 'box_button',
      },
      // {
      //     'name':'法院诉讼缴费',
      //     'id':'004'
      // },
      // {
      //     'name':'出入境',
      //     'id':'005'
      // },
      {
        name: '不动产',
        id: '006',
        class: 'box_button',
      },
      {
        name: '更多',
        id: '007',
        class: 'box_button',
      },
    ],
  };

  componentDidMount() {
    // alert(this.state.isReload);
    // if (this.state.isReload) {
    //   alert(this.state.isReload);
    // }
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

  //提交
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
    });
  };
  render() {
    const { codeUrl, warnSpan, loadings, buttonList } = this.state;
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
              <span style={{ verticalAlign: 'top', marginLeft: 10 }}>
                缴费业务
              </span>
            </div>
            <div className="manu">{menu}</div>
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
                      <span style={{ fontSize: 15, color: '#787584' }}>
                        缴款通知书编号
                      </span>
                      <span style={{ fontSize: 15, color: 'red' }}>或</span>
                      <span style={{ fontSize: 15, color: '#787584' }}>
                        交罚决定书编号:
                      </span>
                      <Form.Item
                        style={{ marginTop: 6 }}
                        name="payCode"
                        rules={[
                          {
                            required: true,
                            message: '请输入缴款码',
                          },
                          // {
                          //   pattern: api.regular,
                          //   message: api.regularText,
                          // },
                        ]}
                      >
                        <Input size="large" style={{ width: 376 }} />
                      </Form.Item>

                      <span style={{ fontSize: 15, color: '#787584' }}>
                        缴款人：
                      </span>

                      <Form.Item
                        style={{ marginTop: 6 }}
                        name="payName"
                        rules={[
                          {
                            required: true,
                            message: '请输入缴款人',
                          },
                        ]}
                      >
                        <Input size="large" style={{ width: 376 }} />
                      </Form.Item>

                      <span style={{ fontSize: 15, color: '#787584' }}>
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
                                message: '请输入验证码',
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
                              cursor: 'pointer',
                              color: '#1890ff',
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
                    <div
                      style={{
                        marginTop: '-9px',
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      <span>{warnSpan}</span>
                    </div>
                  </Form>
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

import React from 'react';
import { Form, Input, Button, Row, Col, notification, Modal } from 'antd';
import { queryPayInfo, nontaxPage, getCo } from '../../service/services';
import { api } from '../../service/api';
import InputComponents from '../components/inputComponents';
import style from '../../public/css/index.css';
import img from '../../public/images/paycode_1.png';
import img2 from '../../public/images/paycode_2.png';
import img3 from '../../public/images/paycode_3.png';
import img_hover from '../../public/images/paycode_1_hover.png';
import img_hover2 from '../../public/images/paycode_2_hover.png';
import img_hover3 from '../../public/images/paycode_3_hover.png';
import Privacy from '../components/privacy';

class NonTaxPay extends React.Component {
  formRef = React.createRef();
  state = {
    spanPayTop: '温馨提示',
    codeUrl: '', //验证码
    uuid: '', //uuid
    loadings: [], //等待时间
    isModalVisible: false, // 遮罩控制
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
    const { codeUrl, loadings, isModalVisible } = this.state;
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
                        <InputComponents
                          name="payCode" //FROM名称
                          blur="paycode" //blur绑定参数
                          img={img} //图片1
                          img_hover={img_hover} //图片2
                          label="缴款码" //label名称
                          haveSpanPay={true} //是否含有感叹号提示信息
                          isVecode={false} //是否属于验证码
                        />
                        <InputComponents
                          name="payName"
                          blur="payname"
                          img={img2}
                          img_hover={img_hover2}
                          label="缴款人"
                          haveSpanPay={false}
                          isVecode={false}
                        />
                        <InputComponents
                          name="verificationCode"
                          blur="code"
                          img={img3}
                          img_hover={img_hover3}
                          label="验证码"
                          haveSpanPay={false}
                          isVecode={true}
                          codeUrl={codeUrl} //验证码地址
                          changeImg={this.changeImg} //验证码换一张点击方法
                        />
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
                    <div style={{ width: '100%', paddingLeft: '26%', cursor: 'pointer' }}>
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
          <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            <Privacy />
          </div>
        </Modal>
      </div>
    );
  }
}

export default NonTaxPay;

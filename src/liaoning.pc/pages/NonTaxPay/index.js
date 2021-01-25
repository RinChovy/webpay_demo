import React from "react";
import { Form, Input, Button, Checkbox} from "antd";
import { a } from "../../service/api.js";

class Home extends React.Component {
  state = {
    spanPayTop: "温馨提示",
    spanPay: "缴款码为执收单位开具的非税收入一般缴款书上的20位编码。",
  };

  componentDidMount() {}
  render() {
    const { spanPay, spanPayTop } = this.state;
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
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div>
        <div>
          <div className="outForm_pay">
            <div className="img_pay">
              <img src={require("./image/icon_top.png")} />
            </div>
            <div className="onForm_pay">
              <div className="top_pay">
                <span className="topSpan_pay">非税缴款</span>
              </div>
              <div className="middle_pay">
                <div className="middle_pay_left">
                  <div className="middle_pay_left_org">
                    <Form
                      {...layout}
                      name="basic"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label={<span style={{fontSize:17}}>缴款码</span>}
                        name="payCode"
                        rules={[
                          {
                            required: true,
                            message: "请输入缴款码",
                          },
                        ]}
                      >
                        <Input size="large"style={{width:400}}/>
                      </Form.Item>
                      <Form.Item
                        label={<span style={{fontSize:17}}>缴款人</span>}
                        name="payName"
                        rules={[
                          {
                            required: true,
                            message: "请输入缴款人",
                          },
                        ]}
                      >
                        <Input size="large"style={{width:400}}/>
                      </Form.Item>

                      <Form.Item
                        label={<span style={{fontSize:17}}>验证码</span>}
                        name="payicn"
                        rules={[
                          {
                            required: true,
                            message: "请输入验证码",
                          },
                        ]}
                      >
                        <Input size="large"style={{width:300}}/>
                      </Form.Item>
                      

                      <Form.Item {...tailLayout} style={{marginTop:40}}>
                        <button className="button_submit">下一步</button>
                        <button className="button_clear" >清空</button>
                        {/* <Button className="button_submit" color="#ff9900"size="large" type="primary" htmlType="submit">
                          下一步
                        </Button>
                        <Button className="button_clear" size="large"  htmlType="submit">
                          清空
                        </Button> */}
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="middle_pay_right">
                  <div className="middle_pay_right_org">
                    <div className="span_pay_top">{spanPayTop}</div>
                    <div className="span_pay">{spanPay}</div>
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

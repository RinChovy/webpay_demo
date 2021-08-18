import React from 'react';
import { Form, Input, Row, Col, Popover } from 'antd';
export default class inputComponents extends React.Component {
  state = {
    blurInput: {
      paycode: false,
      payname: false,
      code: false,
    },
    spanPay: '缴款码为执收单位开具的非税收入一般缴款书上的20位编码。',
  };

  // 焦点获取;
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
  changeImg = () => {
    this.props.changeImg();
  };
  render() {
    const { spanPay, blurInput } = this.state;
    const {
      name,
      label,
      blur,
      haveSpanPay,
      img,
      img_hover,
      isVecode,
      codeUrl,
    } = this.props;
    return (
      <>
        {isVecode ? (
          <Form.Item style={{ width: 630 }}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name={name}
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
                      blurInput[blur] ? (
                        <div className="input_icon_2">
                          <img src={img} />
                        </div>
                      ) : (
                        <div className="input_icon">
                          <img src={img_hover} />
                        </div>
                      )
                    }
                    onFocus={() => this.focusInput(blur)}
                    onBlur={() => this.blurInput(blur)}
                    placeholder={'请输入' + label}
                    className={
                      blurInput[blur] ? 'input_ningxia_hover' : 'input_ningxia'
                    }
                    size="large"
                    style={{ width: 230 }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <img
                  className={'verificationCode'}
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
        ) : (
          <Form.Item style={{ marginBottom: 11 }}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name={name}
                  style={{ width: 420, marginLeft: '-5px' }}
                  rules={[
                    {
                      required: true,
                      message: '请输入' + label,
                    },
                  ]}
                >
                  <Input
                    prefix={
                      blurInput[blur] ? (
                        <div className="input_icon_2">
                          <img src={img} />
                        </div>
                      ) : (
                        <div className="input_icon">
                          <img src={img_hover} />
                        </div>
                      )
                    }
                    onFocus={() => this.focusInput(blur)}
                    onBlur={() => this.blurInput(blur)}
                    placeholder={'请输入' + label}
                    className={
                      blurInput[blur] ? 'input_ningxia_hover' : 'input_ningxia'
                    }
                    size="large"
                    style={{ width: 420, borderRadius: 0 }}
                  />
                </Form.Item>
                {haveSpanPay && (
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
                )}
              </Col>
            </Row>
          </Form.Item>
        )}
      </>
    );
  }
}

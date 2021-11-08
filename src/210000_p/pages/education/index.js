import React from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  notification,
  Space,
  Select,
} from 'antd';
import { education, schools } from '../../service/services';

const { Option } = Select;

class school extends React.Component {
  state = {
    city: [],
    school: [],
    itemCode: '',
    schoolUrl: '',
  };
  componentDidMount() {
    //返回上一页做判断
    const itemCode = localStorage.getItem('itemCode');
    this.setState({
      itemCode: itemCode,
    });
    education().then((res) => {
      if (res.code === 0) {
        console.log(res);
        let city = res.data.cityData;
        this.setState({
          city: city,
          itemCode: itemCode,
        });
      } else {
        this.openNotificationWithIcon('error', res.msg);
      }
    });
  }
  //改变地区事件
  cityChange = (value) => {
    const itemCode = localStorage.getItem('itemCode');
    schools({
      cityCode: value.value,
      itemCode: itemCode,
    }).then((res) => {
      if (res.code === 0) {
        let school = res.data.schoolList;
        this.setState({
          school: school,
        });
      } else {
        this.openNotificationWithIcon('error', res.msg);
        this.setState({
          school: [],
        });
      }
    });
  };
  //改变学校事件
  schoolChange = (value) => {
    let schoolUrl = value.value;
    this.setState({
      schoolUrl: schoolUrl,
    });
  };
  // 提示信息方法
  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: '查询错误',
      description: msg,
    });
  };

  //跳转下一步
  submit = () => {
    let url = this.state.schoolUrl;
    url != ''
      ? (window.location.href = url)
      : this.openNotificationWithIcon('error', '不存在学校地址');
  };
  render() {
    const { city, school } = this.state;
    const layout = {
      // labelCol: {
      //   span: 8,
      // },
      // wrapperCol: {
      //   span: 16,
      // },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 16,
      },
    };
    const cityModel = city.map((v, k) => {
      return (
        <Option key={k} value={v.cityCode}>
          {v.cityName}
        </Option>
      );
    });
    const schoolModel = school.map((v, k) => {
      return (
        <Option key={k} value={v.thirdMerchantUrl}>
          {v.unitName}
        </Option>
      );
    });
    return (
      <div className="body">
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <span>统一支付公共平台</span>
              <span className="right">
                当前位置:&nbsp; 首页 &nbsp;{'>'}&nbsp;教育缴费
              </span>
            </div>

            <div className="outForm_pay_qingdao">
              <div className="middle_pay">
                <div className="middle_pay_left">
                  <img src={require('../../public/images/school_left.png')} />
                </div>
                <div className="middle_pay_right">
                  <div className="school_div_on">
                    <Form {...layout}>
                      <Form.Item
                        label={<span style={{ fontSize: 17 }}>学校区域</span>}
                      >
                        <Select
                          className="select"
                          labelInValue
                          placeholder="请选择学校区域"
                          size="large"
                          onChange={this.cityChange}
                          notFoundContent={<span>对不起,暂无学校区域信息</span>}
                        >
                          {cityModel}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{ marginTop: 40 }}
                        label={<span style={{ fontSize: 17 }}>学校名称</span>}
                      >
                        <Select
                          className="select"
                          labelInValue
                          onChange={this.schoolChange}
                          placeholder="请选择学校"
                          size="large"
                          notFoundContent={
                            <span>对不起,您选择的区域暂无学校信息</span>
                          }
                        >
                          {schoolModel}
                        </Select>
                      </Form.Item>
                      <Form.Item {...tailLayout} style={{ marginTop: 50 }}>
                        <button className="school_button" onClick={this.submit}>
                          下一步
                        </button>
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

export default school;

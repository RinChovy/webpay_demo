import React from "react";
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
} from "antd";
import { api } from "../../service/api.js";

const { Option } = Select;

class school extends React.Component {
  state = {
    city: [],
    school: [],
    itemCode: "",
    schoolUrl: "",
  };
  componentDidMount() {
    fetch(api.education, {
      method: "post", //改成post
      mode: "cors", //跨域
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        regionCode: 210000,
      },
      body: "", //向服务器发送的数据
    })
      .then((res) => res.json())
      .then((res) => {
        res.code == 500
          ? this.openNotificationWithIcon("error", res.msg)
          : console.log(res);
        let city = res.data.cityData;
        this.setState({
          city: city,
          itemCode: this.props.location.query.itemCode,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //改变地区事件
  cityChange = (value) => {
    let data = "cityCode=" + value.value + "&itemCode=" + this.state.itemCode;
    fetch(api.school, {
      method: "post", //改成post
      mode: "cors", //跨域
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        regionCode: 210000,
      },
      body: data, //向服务器发送的数据
    })
      .then((res) => res.json())
      .then((res) => {
        res.code == 500
          ? this.openNotificationWithIcon("error", res.msg)
          : console.log(res);
        let school = res.data.schoolList;
        this.setState({
          school: school,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //改变学校事件
  schoolChange = (value) => {
    let schoolUrl=value.value;
    this.setState({
      schoolUrl: schoolUrl,
    });
  };
  // 提示信息方法
  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: "查询错误",
      description: msg,
    });
  };

  //跳转下一步
  submit = () => {
    let url = this.state.schoolUrl;
    url != ""
      ? (window.location.href = url)
      : this.openNotificationWithIcon("error","不存在学校地址");
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
      <div>
        <div>
          <div className="outForm_pay">
            <div className="school_div">
              <div className="school_div_on">
                <Form {...layout}>
                  <Form.Item
                    label={<span style={{ fontSize: 17 }}>学校区域</span>}
                  >
                    <Select
                      labelInValue
                      placeholder="请选择学校区域"
                      size="large"
                      onChange={this.cityChange}
                    >
                      {cityModel}
                    </Select>
                  </Form.Item>
                  <Form.Item
                  style={{marginTop:40}}
                    label={<span style={{ fontSize: 17 }}>学校名称</span>}
                  >
                    <Select
                      labelInValue
                      onChange={this.schoolChange}
                      placeholder="请选择学校"
                      size="large"
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
    );
  }
}

export default school;

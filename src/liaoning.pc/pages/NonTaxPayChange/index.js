import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { a, api } from "../../service/api.js";

class NonTaxPayChange extends React.Component {
  state = {
    span: "新的风暴已经来临",
    exeAgencyCode: "" //执收单位编码
  };

  componentDidMount() {
    const query = this.props.location.query;
    console.log(query)
    JSON.parse
    let exeAgencyCode=JSON.parse(query.payBook).exeAgencyCode
    this.setState({
        exeAgencyCode:exeAgencyCode
    })
  }

  render() {
    const { span,exeAgencyCode} = this.state;
    return (
      <div>
        <div>
          <div className="outForm_pay">
            <div className="img_pay">
              <div className="onForm_pay">
                <div className="top_pay">
                  <span className="topSpan_pay">非税缴款</span>
                </div>
                <div className="middle_pay">
                  <div className="middle_payInfo">
                    <p className="title_t">
                      <b>缴款通知书</b>
                    </p>
                    <p className="title-ti">
                      <span>填制日期：20201010</span>
                    </p>
                    <p className="title-ti">
                      <span>执收单位编码：{exeAgencyCode}</span>
                      <span>执收单位名称：辽宁省公证处</span>
                    </p>
                    <p className="title-ti">
                      <span>缴款码：014004</span>
                    </p>
                    <table
                      border="1"
                      className="form_f"
                    >
                      <tbody>
                        <tr>
                          <td width="23" rowSpan="3">
                            <center>付款人</center>
                          </td>
                          <td width="73">
                            <center>全&nbsp;&nbsp;称</center>
                          </td>
                          <td width="230" colSpan="2">
                            &nbsp;aa
                          </td>

                          <td width="23" rowSpan="3">
                            <center>收款人</center>
                          </td>
                          <td width="73">
                            <center>全&nbsp;&nbsp;称</center>
                          </td>

                          <td colSpan="3">辽宁省非税收入待解缴账户</td>
                        </tr>
                        <tr>
                          <td>
                            <center>账&nbsp;&nbsp;号</center>
                          </td>
                          <td colSpan="2">
                            &nbsp;
                          </td>
                          <td>
                            <center>账&nbsp;&nbsp;号</center>
                          </td>
                          <td colSpan="3">
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <center>开户银行</center>
                          </td>
                          <td colSpan="2">
                            &nbsp;
                          </td>
                          <td>
                            <center>开户银行</center>
                          </td>
                          <td colSpan="3">
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <center>金额（小写）</center>
                          </td>
                          <td colSpan="2">
                            &nbsp;￥1.00
                          </td>
                          <td colSpan="2">
                            <center>金额（大写）</center>
                          </td>
                          <td colSpan="3">
                            &nbsp;壹元整
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <center>项目识别码</center>
                          </td>
                          <td width="120">
                            <center>收入项目编码</center>
                          </td>
                          <td width="160">
                            <center>收入项目名称</center>
                          </td>
                          <td colSpan="2">
                            <center>单位</center>
                          </td>
                          <td width="100">
                            <center>数量</center>
                          </td>
                          <td width="100">
                            <center>收缴标准</center>
                          </td>
                          <td width="100">
                            <center>金额</center>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2">
                            &nbsp;000000000584
                          </td>
                          <td>&nbsp;</td>
                          <td>&nbsp;外国人签证费</td>
                          <td colSpan="2">
                            <center></center>
                          </td>
                          <td>
                            <center></center>
                          </td>
                          <td>
                            <center></center>
                          </td>
                          <td>1.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <span>{span}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NonTaxPayChange;

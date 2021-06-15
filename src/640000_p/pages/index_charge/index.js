import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { api } from '../../service/api.js';
import { createCashier } from '../../service/services';
import { Arabia_to_Chinese as money, guid } from 'utils/utils';
import style from '../../public/css/index.css';
import Left from '../components/left';

class NonTaxPayChange extends React.Component {
  state = {
    spanTop: '', //头部标识
    billDate: '', //填制日期
    exeAgencyCode: '', //执收单位编码
    exeAgencyName: '', //执收单位名称
    payCode: '', //缴款码
    payerName: '', //付款人全称
    recName: '', //收款人全称
    payerAcct: '', //付款人账号
    recAcct: '', //收款人账号
    payerOpBk: '', //付款人开户银行
    recOpBk: '', //收款人开户银行
    amt: '', //金额小写
    amtZ: '', //金额大写
    queryItem: [], //项目信息
    status: '', //缴款状态
    einvoice_url: '', //电子票查验地址
  };
  // 填制日期格式化
  time = (date) => {
    var fillDate = date;
    var fillDateStr =
      fillDate.substr(0, 4) +
      '-' +
      fillDate.substr(4, 2) +
      '-' +
      fillDate.substr(6, 2);
    return fillDateStr;
  };
  //电子票地址跳转
  einvoiceUrl = () => {
    window.location.href = this.state.einvoice_url;
  };
  //收银台逻辑
  goCashier = () => {
    let that = this;
    const query = JSON.parse(localStorage.getItem('data'));
    const queryJson = query.payBook;
    //收银台参数定义
    const widget_param = {
      paycode: queryJson.payCode,
      paymentName: queryJson.payer,
    };
    const merchant_order_no = guid();
    const widget_content = {
      merchant_no: query.merchant_no,
      merchant_order_no: merchant_order_no,
      amount: queryJson.totalAmount,
      effective_time: '1c',
      version_no: '1.1',
      subject: 'subject',
      body: 'body',
      device_type: 'pc',
      widget_param: widget_param,
    };
    const charge_param = {
      payCode: queryJson.payCode,
      paymentName: queryJson.payer,
    };
    createCashier({
      charge_param: JSON.stringify(charge_param),
      widget_content: JSON.stringify(widget_content),
      frontCallBackUrl: api.callback,
      merchantOrderNo: merchant_order_no,
    }).then((res) => {
      res.code === 0 ? that.showCashier(res.msg) : that.handleError(res.msg);
    });
  };
  showCashier = (pageParams) => {
    document.write(pageParams);
  };
  handleError = (err) => {
    localStorage.removeItem('data');
    this.openNotificationWithIcon('error', err);
    //防止重复点击解开按钮限制
  };
  componentDidMount() {
    const spanTop = localStorage.getItem('spanTop');
    const query = JSON.parse(localStorage.getItem('data'));
    console.log(query);
    const queryJson = query.payBook;
    const queryItem = JSON.parse(query.itemDetails);
    let status = query.status; //缴款状态
    let exeAgencyCode = queryJson.exeAgencyCode; //执收单位编码
    let exeAgencyName = queryJson.exeAgencyName; //执收单位名称
    let payCode = queryJson.payCode; //缴款码
    let payerName = queryJson.payer; //付款人全称
    let recName = queryJson.recAcctName; //收款人全称
    let payerAcct = queryJson.payAcct; //付款人账号
    let recAcct = queryJson.recAcct; //收款人账号
    let payerOpBk = queryJson.payAcctBank; //付款人开户银行
    let recOpBk = queryJson.recAcctBank; //收款人开户银行
    let amt = parseFloat(queryJson.totalAmount / 100).toFixed(2); //金额小写
    let amtZ = money(amt); //金额大写
    let billDate = this.time(queryJson.fillDate); //填制日期
    let einvoice_url = query.einvoice_url; //电子票地址
    console.log(query.einvoice_url);
    this.setState({
      spanTop: spanTop,
      billDate: billDate,
      exeAgencyCode: exeAgencyCode,
      exeAgencyName: exeAgencyName,
      payCode: payCode,
      payerName: payerName,
      recName: recName,
      payerAcct: payerAcct,
      recAcct: recAcct,
      payerOpBk: payerOpBk,
      recOpBk: recOpBk,
      amt: amt,
      amtZ: amtZ,
      queryItem: queryItem,
      billDate: billDate,
      status: status,
      einvoice_url: einvoice_url,
    });
  }
  // 页面销毁生命周期
  componentWillUnmount() {
    window.location.reload();
  }

  render() {
    const {
      spanTop,
      exeAgencyCode,
      exeAgencyName,
      payCode,
      payerName,
      recName,
      payerAcct,
      recAcct,
      payerOpBk,
      recOpBk,
      amt,
      amtZ,
      queryItem,
      billDate,
      status,
      einvoice_url,
    } = this.state;
    // 项目遍历

    const itemModel = queryItem.map((v, k) => {
      return (
        <tr key={k}>
          <td colSpan="2">&nbsp;{v.itemIdCode}</td>
          <td>&nbsp;{v.itemCode}</td>
          <td>&nbsp;{v.itemName}</td>
          <td colSpan="2">
            <center>{v.units}</center>
          </td>
          <td>
            <center>{v.number}</center>
          </td>
          <td>
            <center>{v.std}</center>
          </td>
          <td>{parseFloat(v.amt).toFixed(2)}</td>
        </tr>
      );
    });
    // 挂件
    const thirdpay = (
      <div className="bottom_payInfo">
        <Button onClick={this.goCashier} className="button_dianzi">
          去支付
        </Button>
      </div>
    );

    // 电子票查验地址
    const thirdpayOk =
      einvoice_url != '' && einvoice_url != null ? (
        <div className="bottom_payInfo">
          <Button onClick={this.einvoiceUrl} className="button_dianzi">
            查看电子票
          </Button>
        </div>
      ) : null;
    // 已交款字段
    const statusOk =
      status == 0 ? null : (
        <div style={{ position: 'absolute', right: '25%' }}>
          <img
            style={{ width: 100 }}
            src={require('../../public/images/paiec.png')}
          />
        </div>
      );
    return (
      <div className="body">
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <img src={require('../../public/images/top_icon.png')} />
              <span>
                您当前位置: 统一公共支付 {'>>'} {spanTop}
              </span>
            </div>

            <div className="outForm_pay_qingdao">
              <div className="middle_pay_charge">
                <div className="middle_pay_right">
                  <div>
                    <div className="middle_pay_charge">
                      <div className="middle_payInfo">
                        {statusOk}
                        <p className="title_t">
                          <b>缴款通知书</b>
                        </p>
                        <p className="title-ti">
                          <span>填制日期：{billDate}</span>
                        </p>
                        <p className="title-ti">
                          <span>执收单位编码：{exeAgencyCode}</span>
                          <span style={{ marginLeft: 280 }}>
                            执收单位名称：{exeAgencyName}
                          </span>
                          <span style={{ marginLeft: 280 }}>
                            缴款码：{payCode}
                          </span>
                        </p>

                        <table border="1" className="form_f">
                          <tbody>
                            <tr>
                              <td width="23" rowSpan="3">
                                <center>
                                  付{<br />}款{<br />}人
                                </center>
                              </td>
                              <td width="73">
                                <center>全&nbsp;&nbsp;称</center>
                              </td>
                              <td width="230" colSpan="2">
                                &nbsp;{payerName}
                              </td>

                              <td width="23" rowSpan="3">
                                <center>
                                  收{<br />}款{<br />}人
                                </center>
                              </td>
                              <td width="73">
                                <center>全&nbsp;&nbsp;称</center>
                              </td>

                              <td colSpan="3">{recName}</td>
                            </tr>
                            <tr>
                              <td>
                                <center>账&nbsp;&nbsp;号</center>
                              </td>
                              <td colSpan="2">&nbsp;{payerAcct}</td>
                              <td>
                                <center>账&nbsp;&nbsp;号</center>
                              </td>
                              <td colSpan="3">&nbsp;{recAcct}</td>
                            </tr>
                            <tr>
                              <td>
                                <center>开户银行</center>
                              </td>
                              <td colSpan="2">&nbsp;{payerOpBk}</td>
                              <td>
                                <center>开户银行</center>
                              </td>
                              <td colSpan="3">&nbsp;{recOpBk}</td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <center>金额（小写）</center>
                              </td>
                              <td colSpan="2">&nbsp;￥{amt}</td>
                              <td colSpan="2">
                                <center>金额（大写）</center>
                              </td>
                              <td colSpan="3">&nbsp;{amtZ}</td>
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
                            {itemModel}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      className="middle_pay_charge"
                      style={{ overflow: 'hidden' }}
                    >
                      {status == 0 ? thirdpay : thirdpayOk}
                    </div>
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

export default NonTaxPayChange;

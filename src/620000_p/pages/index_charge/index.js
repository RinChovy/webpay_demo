import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { api } from '../../service/api.js';
import { Arabia_to_Chinese as money, guid } from 'utils/utils';

class NonTaxPayChange extends React.Component {
  state = {
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
  componentDidMount() {
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
    // 挂件调用

    setTimeout(() => {
      thirdpay_widget &&
        thirdpay_widget.init({
          container: 'widget', //挂件在当前页面放置的控件ID
          merchant_no: query.merchant_no, //分配的商户号
          merchant_order_no: guid(), //订单在商户系统中的订单号
          amount: queryJson.totalAmount, //订单价格，单位：人民币 分
          effective_time: '1c',
          device_type: 'pc', //设备类型
          widget_param: {
            paycode: payCode,
          }, //控件参数，常用来传递缴款服务所需定义的内容，如，非税paycode直缴或传入相关缴费信息生成缴款书
          charge_url: api.createCharge, //商户服务端创建charge时的controller地址
          charge_param: {
            payCode: queryJson.payCode,
            paymentName: queryJson.payer,
            regionCode: api.region,
            frontCallBackUrl: api.callback,
          }, //(可选，用户自定义参数，若存在自定义参数则会通过 POST 方法透传给 charge_url
          version_no: '1.1',
        });
    }, 100);
  }
  // 页面销毁生命周期
  componentWillUnmount() {
    window.location.reload();
  }
  render() {
    const {
      span,
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
        <tr key={k} height="28">
          <td style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>
            {v.itemIdCode}
          </td>
          <td style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>
            {v.itemName}
          </td>
          <td style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
            ￥{parseFloat(v.amt).toFixed(2)}
          </td>
        </tr>
      );
    });
    // 挂件
    const thirdpay = (
      <div className="bottom_payInfo">
        <p id="widget"></p>
      </div>
    );
    // 电子票查验地址
    const thirdpayOk =
      einvoice_url != '' && einvoice_url != null ? (
        <div className="bottom_payInfo">
          <Button onClick={this.einvoiceUrl}>电子票查验</Button>
        </div>
      ) : null;
    // 已交款字段
    const statusOk =
      status == 0 ? null : (
        <div style={{ position: 'absolute', right: '18%' }}>
          <img
            style={{ width: 100 }}
            src={require('../../public/images/paiec.png')}
          />
        </div>
      );
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
                    {statusOk}
                    <p className="title_t">
                      <b>甘肃省政府非税收入电子缴款通知书</b>
                    </p>
                    <p className="title-ti">
                      <span>执收单位编码：{exeAgencyCode}</span>
                    </p>
                    <p className="title-ti">
                      <span> 执收单位名称：{exeAgencyName}</span>
                    </p>

                    <p className="title-ti">
                      <span>业务生成日期：{billDate}</span>
                      <span style={{ marginLeft: 450 }}>
                        缴款识别码：
                        {payCode}
                      </span>
                    </p>
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="1"
                      bordercolor="black"
                      style={{ width: '91%', margin: '0 auto' }}
                    >
                      <tbody>
                        <tr height="28">
                          <td
                            width="6%"
                            rowspan="2"
                            style={{ borderBottom: 1, textAlign: 'center' }}
                          >
                            缴{<br />}款{<br />}人
                          </td>
                          <td width="15%" style={{ textAlign: 'center' }}>
                            全 &nbsp; &nbsp; &nbsp; &nbsp;称
                          </td>

                          <td width="32%">{payerName}</td>
                          <td width="15%" style={{ textAlign: 'center' }}>
                            邮 &nbsp; &nbsp; &nbsp; &nbsp;箱
                          </td>
                          <td width="32%"></td>
                        </tr>
                        <tr height="28">
                          <td
                            width="15%"
                            style={{ bordeBottom: 1, textAlign: 'center' }}
                          >
                            手 &nbsp; &nbsp; &nbsp; &nbsp;机
                          </td>

                          <td width="" style={{ borderBottom: 1 }}></td>
                          <td
                            width="15%"
                            style={{ borderBottom: 1, textAlign: 'center' }}
                          >
                            备 &nbsp; &nbsp; &nbsp; &nbsp;注
                          </td>
                          <td width="" style={{ borderBottom: 1 }}></td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="1"
                      bordercolor="black"
                      style={{ width: '91%', margin: '0 auto' }}
                    >
                      <tr height="28" style={{ borderTop: 2 }}>
                        <td
                          width="13%"
                          style={{
                            borderBottom: '1px',
                            borderTop: '0px',
                            textAlign: 'center',
                          }}
                        >
                          金额（大写）
                        </td>

                        <td
                          width="50%"
                          id="daxie"
                          style={{
                            borderBottom: '1px',
                            borderTop: '0px',
                            textAlign: 'right',
                          }}
                        >
                          &nbsp;{amtZ}
                        </td>
                        <td
                          width="13%"
                          style={{
                            borderBottom: '1px',
                            borderTop: '1px',
                            textAlign: 'center',
                          }}
                        >
                          小写
                        </td>
                        <td
                          width="24%"
                          style={{
                            borderBottom: 1,
                            borderTop: 1,
                            textAlign: 'right',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}
                        >
                          &nbsp;￥{amt}
                        </td>
                      </tr>
                    </table>
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="1"
                      bordercolor="black"
                      style={{ width: '91%', margin: '0 auto' }}
                    >
                      <tr
                        height="28"
                        style={{ bordertop: 2, backgroundColor: 'aliceblue' }}
                      >
                        <th
                          width="24%"
                          style={{ borderTop: '0px', textAlign: 'center' }}
                        >
                          项目识别码
                        </th>
                        <th
                          width=""
                          style={{ borderTop: '0px', textAlign: 'center' }}
                        >
                          项目名称
                        </th>
                        <th
                          width="24%"
                          style={{ borderTop: '0px', textAlign: 'center' }}
                        >
                          金 &nbsp; &nbsp; &nbsp;额
                        </th>
                      </tr>
                      {itemModel}
                      <tr height="28">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr height="28">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr height="28">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="middle_pay" style={{ overflow: 'hidden' }}>
                  {status == 0 ? thirdpay : thirdpayOk}
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

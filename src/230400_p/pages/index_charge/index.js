import React from 'react';
import { Button } from 'antd';
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
  time = date => {
    var fillDate = date;
    var fillDateStr =
      fillDate.substr(0, 4) + '-' + fillDate.substr(4, 2) + '-' + fillDate.substr(6, 2);
    return fillDateStr;
  };
  //电子票地址跳转
  einvoiceUrl = () => {
    window.location.href = this.state.einvoice_url;
  };
  componentDidMount() {
    const query = this.props.location.query;
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
      status: status,
      einvoice_url: einvoice_url,
    });
    // 挂件调用
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
        a: 'a',
        b: 'b',
        regionCode: api.region,
        frontCallBackUrl: api.callback,
      }, //(可选，用户自定义参数，若存在自定义参数则会通过 POST 方法透传给 charge_url
      version_no: '1.1',
    });
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
        <tr key={k}>
          <td colSpan='2'>&nbsp;{v.itemIdCode}</td>
          <td>&nbsp;{v.itemCode}</td>
          <td>&nbsp;{v.itemName}</td>
          <td colSpan='2'>
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
      <div className='bottom_payInfo'>
        <p id='widget'></p>
      </div>
    );
    // 电子票查验地址
    const thirdpayOk =
      einvoice_url != '' && einvoice_url != null ? (
        <div className='bottom_payInfo'>
          <Button onClick={this.einvoiceUrl}>电子票查验</Button>
        </div>
      ) : null;
    // 已交款字段
    const statusOk =
      status == 0 ? null : (
        <div style={{ position: 'absolute', right: '18%' }}>
          <img style={{ width: 100 }} src={require('./image/paiec.png')} />
        </div>
      );
    return (
      <div>
        <div>
          <div className='outForm_pay'>
            <div className='img_pay'>
              <div className='onForm_pay'>
                <div className='top_pay'>
                  <span className='topSpan_pay'>非税缴款</span>
                </div>
                <div className='middle_pay'>
                  <div className='middle_payInfo'>
                    {statusOk}
                    <p className='title_t'>
                      <b>缴款通知书</b>
                    </p>
                    <p className='title-ti'>
                      <span>填制日期：{billDate}</span>
                    </p>
                    <p className='title-ti'>
                      <span>执收单位编码：{exeAgencyCode}</span>
                      <span style={{ marginLeft: 50 }}>执收单位名称：{exeAgencyName}</span>
                    </p>
                    <p className='title-ti'>
                      <span>缴款码：{payCode}</span>
                    </p>
                    <table border='1' className='form_f'>
                      <tbody>
                        <tr>
                          <td width='23' rowSpan='3'>
                            <center>付款人</center>
                          </td>
                          <td width='73'>
                            <center>全&nbsp;&nbsp;称</center>
                          </td>
                          <td width='230' colSpan='2'>
                            &nbsp;{payerName}
                          </td>

                          <td width='23' rowSpan='3'>
                            <center>收款人</center>
                          </td>
                          <td width='73'>
                            <center>全&nbsp;&nbsp;称</center>
                          </td>

                          <td colSpan='3'>{recName}</td>
                        </tr>
                        <tr>
                          <td>
                            <center>账&nbsp;&nbsp;号</center>
                          </td>
                          <td colSpan='2'>&nbsp;{payerAcct}</td>
                          <td>
                            <center>账&nbsp;&nbsp;号</center>
                          </td>
                          <td colSpan='3'>&nbsp;{recAcct}</td>
                        </tr>
                        <tr>
                          <td>
                            <center>开户银行</center>
                          </td>
                          <td colSpan='2'>&nbsp;{payerOpBk}</td>
                          <td>
                            <center>开户银行</center>
                          </td>
                          <td colSpan='3'>&nbsp;{recOpBk}</td>
                        </tr>
                        <tr>
                          <td colSpan='2'>
                            <center>金额（小写）</center>
                          </td>
                          <td colSpan='2'>&nbsp;￥{amt}</td>
                          <td colSpan='2'>
                            <center>金额（大写）</center>
                          </td>
                          <td colSpan='3'>&nbsp;{amtZ}</td>
                        </tr>
                        <tr>
                          <td colSpan='2'>
                            <center>项目识别码</center>
                          </td>
                          <td width='120'>
                            <center>收入项目编码</center>
                          </td>
                          <td width='160'>
                            <center>收入项目名称</center>
                          </td>
                          <td colSpan='2'>
                            <center>单位</center>
                          </td>
                          <td width='100'>
                            <center>数量</center>
                          </td>
                          <td width='100'>
                            <center>收缴标准</center>
                          </td>
                          <td width='100'>
                            <center>金额</center>
                          </td>
                        </tr>
                        {itemModel}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='middle_pay' style={{ overflow: 'hidden' }}>
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

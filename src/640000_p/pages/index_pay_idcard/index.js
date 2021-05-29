import React from 'react';
import { Form, Input, Button, Row, Col, notification, Popover } from 'antd';
import { queryPayInfoNoCode } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';

class Index_pay_idcard extends React.Component {
  state = {
    spanPayTop: '温馨提示',
    dataList: [],
  };

  componentDidMount() {
    const dateString = JSON.parse(localStorage.getItem('edu_data'));
    this.setState({
      dataList: dateString.payBookList,
    });
  }
  //点击查看详情
  details = (payCode, payer) => {
    queryPayInfoNoCode({
      payCode: payCode,
      payPeople: payer,
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
  // 提交失败
  handleError = (err) => {
    localStorage.removeItem('data');
    this.openNotificationWithIcon('error', err);
  };
  render() {
    const { dataList } = this.state;
    const tableModel = dataList.map((v, k) => {
      return (
        <tr key={k}>
          <td>{k + 1}</td>
          <td>{v.payCode}</td>
          <td>{v.payer}</td>
          <td>{v.exeAgencyName}</td>
          <td>{v.itemNames}</td>
          <td>{v.fillDate}</td>
          <td>{v.totalAmount}元</td>
          <td>
            {v.payStatus == 1 && (
              <span onClick={() => this.details(v.payCode, v.payer)}>
                查看缴款书
              </span>
            )}
            {v.payStatus != 1 && (
              <span onClick={() => this.details(v.payCode, v.payer)}>
                前往支付
              </span>
            )}
          </td>
        </tr>
      );
    });
    return (
      <div className="body">
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <span>教育缴款</span>
            </div>

            <div className="outForm_pay_qingdao">
              <div className="table">
                <table className="gridtable">
                  <thead>
                    <tr>
                      <th width="50px">序号</th>
                      <th width="190px">缴款码</th>
                      <th width="80px">缴款人</th>
                      <th width="160px">执收单位名称</th>
                      <th width="180px">收费项目</th>
                      <th width="100px">编制日期</th>
                      <th width="100px">缴纳金额</th>
                      <th width="120px">操作</th>
                    </tr>
                  </thead>
                  <tbody>{tableModel}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index_pay_idcard;

import React from 'react';
import { Input, Button, Table, Tag, Space } from 'antd';
import reqwest from 'reqwest';
import { queryPayInfo } from '../../service/services';
import { api } from '../../service/api';
import style from '../../public/css/index.css';
import Model from '../components/model';

class Policy extends React.Component {
  state = {
    spanPayTop: '温馨提示',
    data: [
      {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
        item: [
          { id: '1', name: '财综〔2007〕3号' },
          { id: '2', name: '财综〔2007〕4号' },
        ],
      },
      {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
        item: [
          { id: '1', name: '财综〔2007〕3号' },
          { id: '2', name: '财综〔2007〕4号' },
        ],
      },
      {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        item: [
          { id: '1', name: '财综〔2007〕3号' },
          { id: '2', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
          { id: '3', name: '财综〔2007〕4号' },
        ],
      },
    ],
  };
  // 列表table点击弹出组件
  click_table = () => {};

  componentDidMount() {}
  // 查询方法
  select = () => {
    alert('这是查询方法');
  };
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        align: 'center',
      },
      {
        title: '全国项目识别码',
        dataIndex: 'name',
        align: 'center',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '项目编码',
        className: 'column-money',
        dataIndex: 'money',
        align: 'center',
      },
      {
        title: '项目名称',
        dataIndex: 'address',
        align: 'left',
      },
      {
        title: '政策依据',
        dataIndex: 'item',
        key: 'item',
        align: 'left',
        width: '600px',
        render: (v) => (
          <>
            {v.map((item) => (
              <Tag
                color="blue"
                key={item}
                style={{ marginTop: 20 }}
                onClick={this.click_table}
              >
                {item.name}
              </Tag>
            ))}
          </>
        ),
      },
    ];
    const { data, pagination, loading } = this.state;
    return (
      <div className="body">
        <Model model={true} />
        <div className="outForm_pay">
          <div className="img_pay">
            <div className="onForm_pay">
              <div className="policy_top">
                <a href="">首页</a>
                {'>'}
                <a href="">我要看</a>
                {'>'}
                <a href="">甘肃政务服务网</a>
                {'>'}
                <a href="">公共支付</a>
                {'>'}
                <a href="">政府依据查询</a>
              </div>
              <div className="policy_top_h1">
                <span>甘肃省非税收入政策库</span>
              </div>
              <div className="policy_top_input">
                <label>全国项目识别码:</label>
                <Input size="large" style={{ marginLeft: 20, width: 130 }} />
                <label>项目编码:</label>
                <Input size="large" style={{ marginLeft: 20, width: 130 }} />
                <label>项目名称:</label>
                <Input size="large" style={{ marginLeft: 20, width: 130 }} />
                <Button
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    marginTop: '-20px',
                  }}
                  type="primary"
                  onClick={this.select}
                >
                  搜索
                </Button>
              </div>
              <div className="policy_table">
                <Table columns={columns} dataSource={data} bordered />,
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Policy;

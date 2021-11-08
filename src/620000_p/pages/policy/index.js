import React from 'react';
import { Input, Button, Table, Tag } from 'antd';
import { searchItemInfo, searchPolicyDocument } from '../../service/services';
import MaskModel from '../components/maskModel';

class Policy extends React.Component {
  state = {
    spanPayTop: '温馨提示',
    model: false, //控制遮罩层显示隐藏属性
    pagination: {
      //table插件设置参数
      position: ['bottomCenter'],
      showSizeChanger: false,
      current: 1,
      pageSize: 10,
      total: '',
    }, //分页方面设置
    data: [], //table数据
    dataModel: {}, //遮罩参数
    loading: false, //等待参数
    selectModel: {
      itemStdIDCode: '',
      itemCode: '',
      itemName: '',
    }, //查询参数
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.tableList(pagination);
  }

  // 列表table点击弹出组件
  handleClickTable = value => {
    searchPolicyDocument({
      title: value,
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          dataModel: res.data,
          model: true,
        });
      } else {
        this.openNotificationWithIcon('error', res.msg);
      }
    });
  };

  // 页面方法
  tableList = (page, bool = false) => {
    let { pagination, selectModel } = this.state;
    this.setState({ loading: true });
    searchItemInfo({
      pageNo: bool ? 1 : page.current,
      pageSize: 10,
      ...selectModel,
    }).then(res => {
      if (res.code === 0) {
        const listArr = res.data.itemList.map((item, i) => {
          return { ...item, index: i + 1 };
        });
        pagination.current = page.current;
        pagination.total = res.data.totalPage * 10;
        this.setState({
          loading: false,
          data: listArr,
          pagination: pagination,
        });
      } else {
        this.openNotificationWithIcon('error', res.msg);
      }
    });
  };
  // 表格改变方法
  handleTableChange = pagination => {
    this.tableList(pagination);
  };
  // 查询方法
  handleSelect = () => {
    const { pagination } = this.state;
    this.tableList(pagination, true);
  };
  //绑定事件
  handleChange = (title, value) => {
    let arry = this.state.selectModel;
    title == 'itemStdIDCode'
      ? (arry.itemStdIDCode = value)
      : title == 'itemCode'
      ? (arry.itemCode = value)
      : (arry.itemName = value);
    this.setState({
      selectModel: arry,
    });
  };
  //模板消失
  onCancel = () => {
    this.setState({
      model: false,
    });
  };

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        width: '100px',
      },
      {
        title: '全国项目识别码',
        dataIndex: 'itemStdIDCode',
        align: 'center',
      },
      {
        title: '项目编码',
        dataIndex: 'itemCode',
        align: 'center',
      },
      {
        title: '项目名称',
        dataIndex: 'itemName',
        align: 'left',
      },
      {
        title: '政策依据',
        dataIndex: 'docNos',
        key: 'docNos',
        align: 'left',
        width: '500px',
        render: items => (
          <>
            {items.map((item, key) => (
              <Tag
                color="default"
                key={key}
                style={{ marginBottom: 4 }}
                onClick={() => this.handleClickTable(item)}
              >
                {item}
              </Tag>
            ))}
          </>
        ),
      },
    ];
    const {
      data,
      pagination,
      loading,
      model,
      dataModel,
      selectModel,
    } = this.state;
    return (
      <div className="body">
        {model && <MaskModel dataModel={dataModel} cancel={this.onCancel} />}
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
                <Input
                  size="large"
                  style={{ marginLeft: 20, width: 130 }}
                  value={selectModel.itemStdIDCode}
                  onChange={e =>
                    this.handleChange('itemStdIDCode', e.target.value)
                  }
                />
                <label>项目编码:</label>
                <Input
                  size="large"
                  style={{ marginLeft: 20, width: 130 }}
                  value={selectModel.itemCode}
                  onChange={e => this.handleChange('itemCode', e.target.value)}
                />
                <label>项目名称:</label>
                <Input
                  size="large"
                  style={{ marginLeft: 20, width: 130 }}
                  value={selectModel.itemName}
                  onChange={e => this.handleChange('itemName', e.target.value)}
                />
                <Button
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    marginTop: '-20px',
                  }}
                  type="primary"
                  onClick={this.handleSelect}
                >
                  搜索
                </Button>
              </div>
              <div className="policy_table">
                <Table
                  rowKey="itemIDCode"
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  loading={loading}
                  onChange={this.handleTableChange}
                  locale={{
                    emptyText: '未查询到相关数据',
                  }}
                  bordered
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Policy;

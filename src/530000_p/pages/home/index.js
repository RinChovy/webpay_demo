import React from 'react';
import style from '../../public/css/index.css';

import CustomerService from '../components/customerService';

class Home extends React.Component {
  state = {
    list: [
      {
        itemCode: '0',
        modelPicture: require('../../public/images/feisui.png'),
        itemName: '非税缴款',
        modelUrl: 'index_pay',
      },
      {
        itemCode: '1',
        modelPicture: require('../../public/images/caizheng.png'),
        itemName: '财政票据查询',
        modelUrl: 'http://222.172.224.34:18003/billcheck/#/home',
      },
      {
        itemCode: '1',
        modelPicture: require('../../public/images/yuxi.jpg'),
        itemName: '玉溪不动产缴费',
        modelUrl: 'https://ipp.epayservice.cn/h5/bdcPay/index?vde=53000001',
      },
      {
        itemCode: '0',
        modelPicture: require('../../public/images/jiaoyu.jpg'),
        itemName: '教育缴费',
        modelUrl: 'index_education',
      },
    ],
    yunwei: '由博思致新提供技术支持 技术服务热线：0411-82569885', //运维信息
  };

  componentDidMount() {
  }

  router = (url, code) => {
    if (code === '1') {
      window.location.href = url;
    } else {
      code === '0' ? localStorage.setItem("isPayCode", 'true') : localStorage.setItem("isPayCode", 'false')
      let data = { itemCode: code };
      this.props.history.push({ pathname: `/${url}`, query: data });
    }
  };

  render() {
    const { list } = this.state;
    const listModel = list.map((v, k) => {
      return (
        <div className="box" key={k}>
          <div
            className="box_on"
            onClick={this.router.bind(
              this,
              `${list[k].modelUrl}`,
              `${list[k].itemCode}`
            )}
          >
            <img className="img-size" src={list[k].modelPicture} />
            <p>{list[k].itemName}</p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="outForm">
          <CustomerService />
          <div className="outForm_left">
            <img src={require('../../public/images/background_left.png')} style={{ width: 620, marginLeft: '30%' }} />
          </div>
          <div className="outForm_right">
            <div className="onForm">
              {listModel}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import style from '../../public/css/index.css';

import { queryHomelist } from '../../service/services';

class Home extends React.Component {
  state = {
    list: [
      {
        itemCode: '0',
        modelPicture: require('../../public/images/feisui.png'),
        itemName: '一般非税缴款',
        modelUrl: 'index_pay',
      },
      {
        itemCode: '1',
        modelPicture: require('../../public/images/caizheng.png'),
        itemName: '财政票据查询',
        modelUrl: 'http://www.czj.dl.gov.cn/billcheck/html/index.html',
      },
      {
        itemCode: '00',
        modelPicture: require('../../public/images/jiaokuan.png'),
        itemName: '缴款凭证查询',
        modelUrl: 'index_pay',
      },
    ],
    yunwei: '由博思致新提供技术支持 技术服务热线：0411-82569885', //运维信息
  };

  componentDidMount() { }

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
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="outForm">
          <div className="home_top">
            <span>统一支付平台</span>
          </div>
          <div className="onForm">
            {listModel}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

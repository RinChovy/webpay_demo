import React from 'react';
import { api } from '../../service/api';
import style from '../../public/css/index.css';


class Home extends React.Component {
  state = {
    yunwei: '', //运维信息
    list: [
      {
        "deviceType": "pc",
        modelPicture: require('../../public/images/code_icon.jpg'),
        "itemName": "一般非税缴款",
        "siteCode": "webpay",
        "cityCode": "210000",
        "provinceCode": "210000",
        "itemCode": "21000001",
        "id": "0001",
        "provinceName": "辽宁省",
        "modelUrl": "index_pay",
        "channelCode": "2101002020042801"
      },
      {
        "deviceType": "pc",
        modelPicture: require('../../public/images/kaipiao.jpg'),
        "itemName": "电子票据查询",
        "siteCode": "webpay",
        "cityCode": "210000",
        "provinceCode": "210000",
        "itemCode": "002",
        "id": "0002",
        "provinceName": "辽宁省",
        "modelUrl": "index_payEn",
        "channelCode": "2101002020042801"
      },
    ]
  };

  componentDidMount() {
  }

  router = (url, code) => {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      localStorage.setItem('itemCode', code);
      this.props.history.push({ pathname: `/${url}` });
    }
  };

  render() {
    const { list, yunwei } = this.state;
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
            <span className="img-span">{list[k].itemName}</span>
          </div>
        </div>
      );
    });
    return (
      <div className='body_hubei'>
        <div className="outForm">
          <div className="onForm_top">
            <div>
              <span>湖北省非税收入管理平台</span>
            </div>
          </div>
          <div className="onForm_bottom">
            <div className='onForm_left'>
              <img style={{ width: 400 }} src={require('../../public/images/background_left_image.png')} />
            </div>
            <div className="onForm">
              {listModel}
              <div className="home_span_warn">
                <span>{yunwei}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

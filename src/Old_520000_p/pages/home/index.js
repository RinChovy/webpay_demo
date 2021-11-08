import React from "react";
import style from "../../public/css/index.css";

import { queryHomelist } from "../../service/services";

class Home extends React.Component {
  state = {
    list: [
      {
        itemCode: "0",
        modelPicture: require("../../public/images/feisui.png"),
        itemName: "一般非税缴款",
        modelUrl: "index_pay",
      },
      {
        itemCode: "0",
        modelPicture: require("../../public/images/jiaoyu.png"),
        itemName: "交罚缴款",
        modelUrl: "index_pay_traffic",
      },
      {
        itemCode: "1",
        modelPicture: require("../../public/images/caiz.png"),
        itemName: "财政票据查验",
        modelUrl: "http://fs.guizhou.gov.cn/billcheck",
      },
      {
        itemCode: "0",
        modelPicture: require("../../public/images/jiaok.png"),
        itemName: "缴款状态查询",
        modelUrl: "index_pay",
      },
    ],
    yunwei: "", //运维信息
  };

  componentDidMount() {}

  router = (url, code) => {
    if (code === "1") {
      window.location.href = url;
    } else {
      let data = { itemCode: code };
      this.props.history.push({ pathname: `/${url}`, query: data });
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
      <div>
        <div className="outForm">
          <div className="onForm">
            {listModel}
            <div className="home_span_warn">
              <span>{yunwei}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

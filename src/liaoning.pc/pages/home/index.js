import React from "react";
import { Button } from "antd";
import style from "./css/index.css";
import { api } from "../../service/api.js";

class Home extends React.Component {
  state = {
    list: [],
  };

  componentDidMount() {
    let data = "regionCode=" + 210000 + "&password=" + 210000;
    fetch(api.common, {
      method: "post", //改成post
      mode: "cors", //跨域
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        regionCode: 210000,
      },
      body: data, //向服务器发送的数据
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          list: JSON.parse(res.data.businessModels),
        });
        console.log(this.state.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  router = (url) => {
    this.props.history.push({ pathname: `/${url}`, query: "太对了" });
  };

  render() {
    const { list } = this.state;
    const listModel = list.map((v, k) => {
      return (
        <div className="box" key={k}>
          <div
            className="box_on"
            onClick={this.router.bind(this, `${list[k].modelUrl}`, "url")}
          >
            <img
              className="img-size"
              src={require(`./image/caiz.png`)}
            />
            <span className="img-span">{list[k].itemName}</span>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="outForm">
          <div className="onForm">{listModel}</div>
        </div>
      </div>
    );
  }
}

export default Home;

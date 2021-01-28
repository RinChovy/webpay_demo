import React from "react";
import { Button } from "antd";
import style from "./css/index.css";
import { api } from "../../service/api.js";

class Home extends React.Component {
  state = {
    list: [],
    yunwei: "运维联系方式：024-22835015", //运维信息
  };

  componentDidMount() {
    let data = "regionCode=" + 210000 + "&password=" + 210000;
    fetch(api.common, {
      method: "post", //改成post
      mode: "cors", //跨域
      credentials: "include",
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

  router = (url, code) => {
    if(code==110){
      window.location.href = url
    }else{
      let data = { itemCode: code };
      this.props.history.push({ pathname: `/${url}`, query: data });
    }
  };
  routers = (url) => {
    this.props.history.push({ pathname: "/success", query: "太对了" });
  };

  render() {
    const { list,yunwei} = this.state;
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
            <div className='home_span_warn'>
              <span>{yunwei}</span>
            </div>
          </div>
        </div>
        <button onClick={this.routers}>666</button>
      </div>
    );
  }
}

export default Home;

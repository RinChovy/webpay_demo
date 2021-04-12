import React from "react";
import { api } from "../../service/api";
import style from "../../public/css/index.css";
import { queryHomelist } from "../../service/services";

class Home extends React.Component {
  state = {
    list: [],
    yunwei: "运维联系方式：024-22835015", //运维信息
  };

  componentDidMount() {
    queryHomelist({ regionCode: api.region }).then((res) => {
      if (res.code === 0) {
        this.setState({
          list: res.data.businessModels.itemList,
        });
      }
    });
  }

  router = (url, code) => {
    if (code == 110) {
      window.location.href = url;
    } else {
      localStorage.setItem("itemCode", code);
      this.props.history.push({ pathname: `/${url}` });
    }
  };
  // routers = url => {
  //   this.props.history.push({ pathname: '/success', query: '太对了' });
  // };

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

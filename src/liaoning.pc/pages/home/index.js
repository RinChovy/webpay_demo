import React from "react";
import { Button } from "antd";
import style from "./css/index.css";
import {a} from '../../service/api.js'

class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="outForm">
          <div className="onForm">
            <div className="box">
              <div className="box_on">
                <img
                  className="img-size"
                  src={require("./image/icon_feishui.png")}
                />
                <span className="img-span">一般非税缴款</span>
              </div>
            </div>
            <div className="box">
              <div className="box_on">
                <img
                  className="img-size"
                  src={require("./image/icon_jiaoyu.png")}
                />
                <span className="img-span">教育缴费</span>
              </div>
            </div>
            <div className="box">
              <div className="box_on">
                <img
                  className="img-size"
                  src={require("./image/icon_caizheng.png")}
                />
                <span className="img-span">电子票据查询</span>
              </div>
            </div>
            <div className="box">
              <div className="box_on">
                <img
                  className="img-size"
                  src={require("./image/icon_jiaokuan.png")}
                />
                <span className="img-span">缴款状态查询</span>
              </div>
            </div>
          </div>
        </div>
        <Button type="primary">dddddd</Button>
      </div>
    );
  }
}

export default Home;

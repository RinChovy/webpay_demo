import React from 'react';
import { queryPayInfo, getCo } from '../../service/services';
import style from '../../public/css/index.css';

class home extends React.Component {
  state = {
    classBox: '', //class类标识
    classButton: false, //第一个box按钮标识
    url_1: 'http://pjcy.mof.gov.cn', //电子票查询地址
    url_2: 'https://nx.122.gov.cn/vio/violation/main.do', //交罚缴款地址
    url_3: {
      url_1: 'https://www.nxks.nx.edu.cn/common/LoginExam.do', //普通高考
      url_2: 'https://www.nxks.nx.edu.cn/adult/Regist.do', //成人高考
      url_3: 'https://www.nxks.nx.edu.cn/self/Login.do', //高等教育自学考试
      url_4: 'https://www.nxks.nx.edu.cn/seniorExam/senior/Login.do', //高中学业毕业考试
      url_5: 'https://www.nxks.nx.edu.cn/zsb/LoginExam.do', //普通专升本
    },
  };

  componentDidMount() {}
  // 点击左侧按钮
  left = () => {
    const { classBox } = this.state;
    classBox == 'go_1' || classBox == 'out_2'
      ? this.setState({
          classBox: 'out_1',
        })
      : classBox == 'go_2'
      ? this.setState({
          classBox: 'out_2',
        })
      : null;
  };
  // 点击右侧按钮
  right = () => {
    const { classBox } = this.state;
    classBox == '' || classBox == 'out_1'
      ? this.setState({
          classBox: 'go_1',
        })
      : classBox == 'go_1' || classBox == 'out_2'
      ? this.setState({
          classBox: 'go_2',
        })
      : null;
  };
  button = (e) => {
    this.setState({
      classButton: true,
    });
  };
  //非税缴款
  indexPay = () => {
    this.props.history.push({
      pathname: '/index_pay',
    });
  };
  //教育缴款
  education = () => {
    this.props.history.push({
      pathname: '/education',
    });
  };

  render() {
    const { classBox, classButton, url_1, url_2, url_3 } = this.state;
    return (
      <div className="body">
        <div className="outForm_pay">
          <div className="home_div">
            <div className="home_div_LR">
              <div className="homeButton" onClick={this.left}>
                <img src={require('../../public/images/home_left.png')} />
              </div>
            </div>
            <div className="home_div_middle">
              <div className={'home_div_middle_nei ' + classBox}>
                <div className="home_box" onClick={this.indexPay}>
                  <div>
                    <img src={require('../../public/images/home_1.png')} />
                    <p>非税缴款</p>
                  </div>
                </div>
                <div className="home_box" onClick={this.education}>
                  <div>
                    <img src={require('../../public/images/home_2.png')} />
                    <p>教育缴费</p>
                  </div>
                </div>
                <div className="home_box" onClick={this.education}>
                  <div>
                    <img src={require('../../public/images/home_3.png')} />
                    <p>缴款凭证查询</p>
                  </div>
                </div>
                <div className="home_box">
                  <a target="_blank" href={url_1}>
                    <div>
                      <img src={require('../../public/images/home_4.png')} />
                      <p>电子票据查询</p>
                    </div>
                  </a>
                </div>
                <div className="home_box">
                  <a target="_blank" href={url_2}>
                    <div>
                      <img src={require('../../public/images/home_5.png')} />
                      <p>交罚缴款</p>
                    </div>
                  </a>
                </div>
                <div className="home_box" onClick={this.button}>
                  {classButton == false && (
                    <div>
                      <img src={require('../../public/images/home_6.png')} />
                      <p>高校缴费</p>
                    </div>
                  )}
                  {classButton == true && (
                    <div className="background-t">
                      <a target="_blank" href={url_3.url_1}>
                        <li>普通高考</li>
                      </a>
                      <a target="_blank" href={url_3.url_2}>
                        <li>成人高考</li>
                      </a>
                      <a target="_blank" href={url_3.url_3}>
                        <li>高等教育自学考试</li>
                      </a>
                      <a target="_blank" href={url_3.url_4}>
                        <li>高中学业毕业考试</li>
                      </a>
                      <a target="_blank" href={url_3.url_5}>
                        <li>普通专升本</li>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="home_div_LR">
              <div className="homeButton" onClick={this.right}>
                <img src={require('../../public/images/home_right.png')} />
              </div>
            </div>
          </div>
          <div>
            <img src={require('../../public/images/background_bottom.png')} />
          </div>
        </div>
      </div>
    );
  }
}

export default home;

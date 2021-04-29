import React from 'react';
import { Input, Button } from 'antd';
import { api } from '../../service/api';
export default class model extends React.Component {
  state = {
    //   判断遮罩亮起元素
    model: false,
    dataModel: {},
  };

  componentWillMount() {
    this.setState({
      dataModel: this.props.dataModel,
    });
    console.log(this.props.dataModel);
  }
  down = () => {
    const { dataModel } = this.state;
    window.location.href =
      api.downLoadPolicyDocument +
      '?title=' +
      encodeURIComponent(dataModel.docNo);
  };
  render() {
    const { dataModel } = this.state;
    const { cencel } = this.props;
    return (
      <>
        <div className="maska">
          <div className="modall">
            <div>
              <div className="modall_top">
                <h2>{dataModel.title}</h2>
              </div>
              <div className="modall_top2">
                <div>
                  <span>文号:{dataModel.docNo}</span>
                </div>
                <div>
                  <span>年度:{dataModel.year}</span>
                </div>
                <div>
                  <span>发文日期:{dataModel.issDate}</span>
                </div>
              </div>
              <div className="modall_middle">
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataModel.fabstract,
                  }}
                ></div>
              </div>
              <div className="modall_bottom">
                <Button
                  className="modall_button"
                  type="primary"
                  onClick={this.down}
                >
                  下载文件
                </Button>
                <Button
                  className="modall_button"
                  type="primary"
                  onClick={cencel}
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

import React from 'react';
import { Button } from 'antd';
import { api } from '../../service/api';
import { downLoadPolicyDocument } from '../../service/services';
export default class model extends React.Component {
  state = {
    dataModel: {},
  };

  componentDidMount() {
    this.setState({
      dataModel: this.props.dataModel,
    });
  }
  handleDown = () => {
    const { dataModel } = this.state;
    const mimeMap = {
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      zip: 'application/zip',
    };
    downLoadPolicyDocument({
      title: dataModel.docNo,
      fileStr: dataModel.file,
    }).then((res) => {
      this.resolveBlob(res, mimeMap.zip);
    });
  };
  resolveBlob = (res, mimeType) => {
    const aLink = document.createElement('a');
    var blob = new Blob([res.data], { type: mimeType });
    // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
    var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
    var contentDisposition = decodeURI(res.headers['Content-Disposition']);
    var result = patt.exec(contentDisposition);
    var fileName = result[1];
    fileName = fileName.replace(/\"/g, '');
    aLink.href = URL.createObjectURL(blob);
    aLink.setAttribute('download', fileName); // 设置下载文件名称
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  };
  render() {
    const { dataModel } = this.state;
    const { cancel } = this.props;
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
                  onClick={this.handleDown}
                >
                  下载文件
                </Button>
                <Button
                  className="modall_button"
                  type="primary"
                  onClick={cancel}
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

import React from 'react';
import { Card } from 'antd';
import { queryPayInfo, getCo } from '../../service/services';
import style from '../../public/css/index.css';
import one from '../../public/xls/one.pdf'
import two from '../../public/xls/two.pdf'
import three from '../../public/xls/three.pdf'

class Pdf extends React.Component {
  state = {
    blurInput: ''

  };

  componentDidMount() {
  }
  render() {
    return (
      <div className="body">
        <div className="outForm_pay_ningxia">
          <div className="onForm_pay">
            <div className="onForm_pay_top">
              <img src={require('../../public/images/top_icon.png')} />
              <span>您当前位置: 统一公共支付 {'>>'} 收费依据</span>
            </div>

            <div className="outForm_pay_qingdao">
              <div className="middle_pay">

                <div style={{ width: '100%' }}>
                  <a href={one} target="_blank">
                    <p style={{ marginTop: 20, marginLeft: 40, fontSize: 20 }}>1. 2021年宁夏政府性基金目录清单.pdf</p>
                  </a>
                  <a href={two} target="_blank">
                    <p style={{ marginTop: 20, marginLeft: 40, fontSize: 20 }}>2. 2021年宁夏考试收费.pdf</p>
                  </a>
                  <a href={three} target="_blank">
                    <p style={{ marginTop: 20, marginLeft: 40, fontSize: 20 }}>3. 宁夏行政事业性收费目录.pdf</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pdf;

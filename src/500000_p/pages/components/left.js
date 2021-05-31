import React from 'react';
export default class left extends React.Component {
  state = {
    //   判断亮起元素
    over: '1',
  };

  componentWillMount() {
    const { over } = this.props;
    this.setState({
      over: over,
    });
  }

  click = (e) => {
    let that = this;
    function right(value) {
      that.setState({
        over: value,
      });
    }
    e == '1'
      ? (this.props.history.push({
          pathname: '/index_pay',
        }),
        right(e))
      : e == '2'
      ? (this.props.history.push({
          pathname: '/index_pay_select',
        }),
        right(e))
      : (window.open('_blank').location =
          'http://ywxt.czj.cq.gov.cn:8011/billcheck/#/home');
  };
  render() {
    const { over } = this.state;
    return (
      <>
        <div className="left_image">
          <div className="box_top">
            <span>统一支付平台</span>
          </div>
          <div
            className={over == '1' ? 'box_hover' : 'box'}
            onClick={() => this.click('1')}
          >
            {over == '1' && <div className="logo"></div>}
            <span>非税缴款</span>
          </div>
          <div
            className={over == '2' ? 'box_hover' : 'box'}
            onClick={() => this.click('2')}
          >
            {over == '2' && <div className="logo"></div>}
            <span>缴款凭证查询</span>
          </div>
          <div
            className={over == '3' ? 'box_hover' : 'box'}
            onClick={() => this.click('3')}
          >
            {over == '3' && <div className="logo"></div>}
            <span>财政电子票校验</span>
          </div>
        </div>
      </>
    );
  }
}

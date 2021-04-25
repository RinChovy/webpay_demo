import React from 'react';
export default class model extends React.Component {
  state = {
    //   判断遮罩亮起元素
    model: false,
  };

  componentWillMount() {
    this.setState({
      model: this.props.model,
    });
  }
  render() {
    const { model } = this.state;
    return (
      <>
        {model == true && (
          <div className="maska">
            <div className="modall">
              <div
                dangerouslySetInnerHTML={{ __html: '<span>我也是醉了</span>' }}
              ></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

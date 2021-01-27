import React from 'react';
import { Button, Input } from 'antd';

class Home extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        This is Home Page! <Button type='primary'>Button</Button>
      </div>
    );
  }
}

export default Home;

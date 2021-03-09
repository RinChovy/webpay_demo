import React from 'react';
import { Button } from 'antd';
import xFetch from '../../../utils/xFetch';
// import fetchs from 'isomorphic-fetch';

class Home extends React.Component {
  componentDidMount() {
    console.log(this.props);

    // xFetch('http://192.168.5.15:8600/webpay_new/common/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     regionCode: 210000,
    //   },
    //   // data: stringify(params),
    //   body: '',
    // });

    let data = 'regionCode=' + 210000 + '&password=' + 210000;
    xFetch('http://192.168.5.15:8600/webpay_new/common/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        regionCode: 210000,
      },
      body: data,
    });
  }
  render() {
    return (
      <div>
        This is Home Page! <Button type='primary'>Button1</Button>
      </div>
    );
  }
}

export default Home;

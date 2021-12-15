import React from 'react';
import Qrcode from 'qrcode.react';
import { userIssues } from '../../service/services';
import { Popover, Button } from 'antd';

export default class customerService extends React.Component {
    state = {
        href: ''
    };
    componentDidMount() {
        userIssues().then((res) => {
            res.code === 0 ? this.setState({ href: res.data }) : console.log(res);
        });
    }
    render() {
        const { href } = this.state
        const content = (
            <div style={{ width: 140 }}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Qrcode value={href} />
                </div>
                <div>
                    <span>关注微信小程序时时关注问题反馈</span>
                </div>
            </div>
        );
        return (
            <>
                <div>
                    <Popover content={content} trigger="hover" placement="left">
                        <img className='qrcode_img'
                            src={require('../../public/images/icon_qrcode.jpg')}
                        />
                    </Popover>
                </div>
            </>
        );
    }
}

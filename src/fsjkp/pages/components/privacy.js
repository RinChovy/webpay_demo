import React from 'react';
import { getPrivacyAuthInfo } from '../../service/services';
export default class privacy extends React.Component {
    state = {
        html: ``
    };
    componentDidMount() {
        getPrivacyAuthInfo().then((res) => {
            res.code === 0 ? this.handleHtml(res.data.entitleInfo) : console.log('错误');
        });
    }
    handleHtml(e) {
        this.setState({
            html: e
        })
    }
    render() {
        return (
            <>
                <span dangerouslySetInnerHTML={{ __html: this.state.html }}></span>
            </>
        );
    }
}

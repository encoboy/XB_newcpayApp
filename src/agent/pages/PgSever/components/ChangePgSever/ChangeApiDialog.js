import React, { Component } from 'react';
import { Dialog, Button,Input,Feedback } from "@icedesign/base";
const Toast = Feedback.toast;

class ChangeApiDialog extends Component {
    state = {
        visible: false,
        apiValue:'',
    };

    onOpen = () => {
        this.setState({
        visible: true
        });
    };

    onClose = () => {
        this.setState({
        visible: false
        });
    };

    // 更改代理API地址
    getAPIValue = (value) => {
        this.setState({
            apiValue:value
        })
    }
    updateApi = () =>{
        const {apiValue} = this.state;
        _fetch({
        url:'/Merchant/Profile',
        data:{
            method:'updateapi',
            api_url:apiValue
        },
        success:(data)=>{
            console.log('updateapi',data);
            Toast.success(_intl.get('sub.tip'));
            this.props.getData();
            this.onClose();
        }
        });
    }


  render() {
    const {apiData} = this.props;
    return (
      <span>
        <Button type="primary" onClick={this.onOpen} style={{marginLeft:'5px'}}>{_intl.get('operation.Modify_API')}</Button>
        <Dialog
          visible={this.state.visible}
          onOk={this.updateApi}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('public.changeApiaddress')}
        >
          {_intl.get('public.changeApiaddress')}：<Input defaultValue={apiData} style={{width:'300px'}} onChange={(value)=>this.getAPIValue(value)}/>
        </Dialog>
      </span>
    );
  }
}

export default ChangeApiDialog;


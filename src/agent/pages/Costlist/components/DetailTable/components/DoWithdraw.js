import React, { Component } from 'react';
import { Dialog, Input, Radio, Button,Form,Field ,Checkbox} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
// import {getUserInfo} from '../../../../util'

const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status:'',
      value: {},
      isMobile: false,
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = (status) => {
    // this.field.setValues({ ...data });
    this.setState({
      visible: true,
      status
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false
    },()=>{
      this.field.reset()
    });
  };

  onOk = () => {
    this.field.validate((error,values) => {
      if (error) {
        return;
      }
      this.hideDialog();
      _fetch({
        url:'/merchant/Userwithdraw',
        data:{
          method:'dowithdraw',
          withdrawid:this.props.id,
          status:this.state.status,
          ...values
        },
        success:()=>{
          this.props.onOk();
        }
      });

    });
  };
  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    return (
      <span>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title={_intl.get('public.revise')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          // isFullScreen
          visible={this.state.visible}
          // language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
            <FormItem label={_intl.get('withdraw.comment')}>
              <Input
                {...init('comment',{rules:{required:true,message:_intl.get('public.required')}})}
              />
            </FormItem>
            {/*<FormItem label={_intl.get('public.code')} >*/}
              {/*<Input   {...init("code",{rules:[{required:true,message:_intl.get('public.required')}]})}  />*/}
            {/*</FormItem>*/}
          </Form>
        </Dialog>
         <Button type='primary' onClick={()=>this.showDialog('approve')}>{_intl.get('withdraw.approve')}</Button>
        <Button style={{margin:'0 10px'}} type="normal" shape="warning" onClick={()=>this.showDialog('reject')}>{_intl.get('withdraw.reject')}</Button>
      </span>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};

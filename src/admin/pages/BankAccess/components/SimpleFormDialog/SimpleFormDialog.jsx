import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Select,Icon } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo} from '../../../../util'

const FormItem = Form.Item;

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  showDialog = (data) => {
    this.field.setValues({ ...data });
    this.setState({
      visible: true,
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
        url:'/merchant/Bankaccess',
        data:{
          method:'addaccess',
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
    const {data} = this.props;
    return (
      <span>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title={_intl.get('bank.new')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          // isFullScreen
          visible={this.state.visible}
          language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
              <FormItem label={_intl.get('bank.bank')}>
                <Select style={{width:'100%'}}  {...init('bank',{rules:[{required:true,message:_intl.get('public.required')}]})}>
                <Select.Option value="mbb">mbb</Select.Option>
                <Select.Option value="cimb">cimb</Select.Option>
                <Select.Option  value="pbb">pbb</Select.Option>
                <Select.Option  value="hlb">hlb</Select.Option>
                <Select.Option  value="rhb">rhb</Select.Option>
              </Select>
            </FormItem>
            <FormItem label={_intl.get('public.username')}>
              <Input
                {...init('username',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
            <FormItem label={_intl.get('public.password')}>
              <Input
                {...init('password',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
            <FormItem label={_intl.get('bank.phone')}>
              <Input
                {...init('phone',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
            {/*<FormItem label={_intl.get('public.code')} >*/}
              {/*<Input   {...init("code",{rules:[{required:true,message:_intl.get('public.required')}]})}  />*/}
            {/*</FormItem>*/}
          </Form>
        </Dialog>
        <Button type="normal" onClick={()=>this.showDialog(data)}>
            <Icon type="add" />
          {_intl.get('bank.new')}
        </Button>
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

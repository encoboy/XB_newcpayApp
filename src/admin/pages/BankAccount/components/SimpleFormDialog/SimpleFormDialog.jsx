import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Select,Icon,Radio } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo} from '../../../../util'

const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      access:[],
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
        url:'/Manager/BankAccount',
        data:{
          method:'addaccount',
          ...values
        },
        success:()=>{
          this.props.onOk();
        }
      });

    });
  };
  getAccess= (bank)=>{
    _fetch({
      url:'/merchant/Bankaccess',
      data:{
        method:'getaccesslist',
        bank
      },
      success:(data)=>{
        this.setState({
          access:data.data
        },()=>{
          this.field.setValues({bank:bank});
        })
      }
    });
  };
  render() {
    const { isMobile ,access} = this.state;
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
                <Select
                  style={{width:'100%'}}
                  {...init('bank',{rules:[{required:true,message:_intl.get('public.required')}]})}
                  onChange={(value)=>this.getAccess(value)}
                >
                    <Select.Option value="mbb">mbb</Select.Option>
                    <Select.Option value="cimb">cimb</Select.Option>
                    <Select.Option  value="pbb">pbb</Select.Option>
                    <Select.Option  value="hlb">hlb</Select.Option>
                    <Select.Option  value="rhb">rhb</Select.Option>
              </Select>
            </FormItem>
             <FormItem label={_intl.get('bank.access')}>
                <Select style={{width:'100%'}}  {...init('accessid',{rules:[{required:true,message:_intl.get('public.required')}]})}>
                 {
                   access.map(function (item,index) {
                     return(
                       <Select.Option key={index} value={item.id}>{item.bank} - {item.name}</Select.Option>
                     )
                   })
                 }
              </Select>
            </FormItem>
            <FormItem label={_intl.get('bank.account')}>
              <Input
                {...init('account',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
            <FormItem label={_intl.get('bank.genre')}>
               <RadioGroup {...init("genre",{rules:[{required:true,message:_intl.get('public.required')}]})}>
                <Radio value="enterprise">{_intl.get('bank.enterprise')}</Radio>
                <Radio value="corporatelite">{_intl.get('bank.corporatelite')}</Radio>
                <Radio value="personal">{_intl.get('bank.personal')}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label={_intl.get('bank.limit_transfer')}>
              <Input
                {...init('limit_transfer',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
              <FormItem label={_intl.get('bank.limit_times')}>
              <Input
                {...init('limit_times',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
              <FormItem label={_intl.get('bank.cur_transfer')}>
              <Input
                {...init('cur_transfer',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
              <FormItem label={_intl.get('bank.cur_times')}>
              <Input
                {...init('cur_times',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
             <FormItem label={_intl.get('bank.type')}>
                <Select
                  style={{width:'100%'}}
                  {...init('accounttype',{rules:[{required:true,message:_intl.get('public.required')}]})}
                >
                    <Select.Option value="2">{_intl.get('bank.2')}</Select.Option>
                    <Select.Option value="3">{_intl.get('bank.3')}</Select.Option>
                    <Select.Option  value="4">{_intl.get('bank.4')}</Select.Option>

              </Select>
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

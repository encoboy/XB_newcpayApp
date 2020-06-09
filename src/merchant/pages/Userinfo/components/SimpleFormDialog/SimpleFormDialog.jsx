import React, { Component } from 'react';
import { Dialog, Input, Radio, Button,Form,Field ,Checkbox} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo} from '../../../../util'

const { Group: RadioGroup } = Radio;
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
        url:'/User/Profile',
        data:{
          method:'updateinfo',
          type:this.props.type,
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
    const {data,type} = this.props;
    return (
      <span >
      <Dialog
    className="simple-form-dialog"
    style={simpleFormDialog}
    autoFocus={false}
    footerAlign="center"
    title={_intl.get('profile.revise')}
    {...this.props}
    onOk={this.onOk}
    onCancel={this.hideDialog}
    onClose={this.hideDialog}
    // isFullScreen
    visible={this.state.visible}
    language={getUserInfo().lang}
  >
  <Form direction="ver" field={this.field } labelAlign='top'>
      {
        type==='base'&&
        <div>
          <FormItem label={_intl.get('profile.nickname')}>
            <Input
              {...init('nickname',{
                rules:[
                  {required:true,min:5,max:15,message:_intl.get('profile.nmin')}
                ]
              })}
            />
          </FormItem>
          {/*<FormItem label={_intl.get('profile.country')} >*/}
          {/*<Input*/}
          {/*{...init('country')}*/}
          {/*/>*/}
          {/*</FormItem>*/}
          <FormItem label={_intl.get('profile.tel')} >
            <Input
              {...init('tel',{
                rules:[
                  {required:true,min:10,max:11,message:_intl.get('profile.tmin')}
                ]
              })}
            />
          </FormItem>
          <FormItem label={_intl.get('profile.lang')} >
            <RadioGroup {...init("lang",{
              rules:[
                {required:true,message:_intl.get('public.required')}
              ]
            })}>
              <Radio value="zh-CN">中文</Radio>
              <Radio value="en-US">English</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      }
        {
          type==='secure'&&
          <div>
            <FormItem label={_intl.get('profile.email')} >
              <Input
                {...init('email',{
                  rules:[
                    {required:true,trigger: "onBlur",message:_intl.get('public.required') },
                    {
                      type: "email",
                      message: _intl.get('profile.emin'),
                      trigger: ["onBlur", "onChange"]
                    }
                  ]
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('profile.mobile')} >
              <Input
                {...init('mobile',{
                  rules:[
                    {required:true,message:_intl.get('public.required')}
                  ]
                })}
              />
            </FormItem>
          </div>
        }
        {
          type==='api'&&
          <div>
            <FormItem label={_intl.get('profile.pg_redirect_url')} >
              <Input
                {...init('pg_redirect_url',{
                  rules:[
                    {required:true,message:_intl.get('public.required')}
                  ]
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('profile.pg_callback_url')} >
              <Input
                {...init('pg_callback_url',{
                  rules:[
                    {required:true,message:_intl.get('public.required')}
                  ]
                })}
              />
            </FormItem>
            <FormItem  style={{lineHeight:'32px'}}>
              <Checkbox
                {...init("secret")}
              />
              <span style={{marginLeft:'5px'}}>{_intl.get('profile.reviseApi')}</span>
            </FormItem>
          </div>
        }
        {/*<FormItem label={_intl.get('public.code')} >*/}
        {/*<Input   {...init("code",{rules:[{required:true,message:_intl.get('public.required')}]})}  />*/}
        {/*</FormItem>*/}
    </Form>
  </Dialog>
    <Button type="normal" shape='text' onClick={()=>this.showDialog(data)}>
      {_intl.get('public.compile')}
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

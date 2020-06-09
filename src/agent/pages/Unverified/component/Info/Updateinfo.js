import React, { Component } from 'react';
import { Dialog, Input, Radio, Button,Form,Field ,Checkbox,Feedback} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {connect} from 'react-redux';
import {hasAction} from '../../../../util';
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;
const Toast = Feedback.toast;

class Updateinfo extends Component {
  static displayName = 'Updateinfo';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
      isMobile: false,
      id:null
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

  showDialog = (infodata) => {
    this.field.setValues({ ...infodata });
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
        url:'/Merchant/Agentaccount',
        data:{
          id:this.props.detaildata.id,
          method:'updateaccount',
          ...values
        },
        success:(data)=>{
          console.log('updateaccount',data);
          Toast.success(_intl.get('myfinance.updatesuccess'));
          this.props.showDetails();
        }
      });

    });
  };

  render() {
    const { isMobile, } = this.state;
    const {btn,infodata} = this.props;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    return (
      <div style={styles.inlineBlock}>
    <Dialog
      className="simple-form-dialog"
      style={simpleFormDialog}
      autoFocus={false}
      footerAlign="center"
      title={_intl.get('profile.revise')}
      onOk={this.onOk}
      onCancel={this.hideDialog}
      onClose={this.hideDialog}
      visible={this.state.visible}
    >
    <Form direction="ver" field={this.field } labelAlign='top' value={infodata}>
        <div>
          <FormItem label={_intl.get('myfinance.financename')}>
          <Input
            {...init('name',{
              rules:[
                {required:true,min:5,max:60,message:_intl.get('profile.nmin')}
              ]
            })}
          />
        </FormItem>
          <FormItem label={_intl.get('myfinance.financedes')} >
            <Input
              {...init('description',{
                rules:[
                  {required:true,message:_intl.get('public.required')}
                ]
              })}
            />
          </FormItem>
          <FormItem>
            <RadioGroup {...init("status",{
              rules:[
                {required:true,message:_intl.get('public.required')}
              ]
            })}>
              <label>{_intl.get('myfinance.status')}: &nbsp;&nbsp;</label>
              <Radio value={1}>{_intl.get('myfinance.1')}</Radio>
              <Radio value={0}>{_intl.get('myfinance.0')}</Radio>
            </RadioGroup>
          </FormItem>
        </div>
    </Form>
  </Dialog>
    {hasAction(btn,'Amend_compilefinance')&&<Button type="primary" onClick={()=>this.showDialog(infodata)} >
      {_intl.get('public.compile')}
    </Button>}
  </div>
    );
  }
}

const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}
export default connect(mapStatToProp)(Updateinfo)

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  inlineBlock:{
    display:'inline',
  }
};
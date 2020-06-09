import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Select,Icon } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo,hasAction} from '../../../../util';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
      key:[0],
      isMobile: false,
      bankList:[]
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
    this.getBankList();
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
      visible: false,
      key:[0]
    },()=>{
      this.field.reset()
    });
  };

  onOk = () => {
    this.field.validate((error,values) => {
      if (error) {
        return;
      }
      const {key} = this.state;
      const saqs = [];
      key.forEach(function (item) {
        const saq = {};
        saq.question = values[`question${item}`];
        saq.answer = values[`answer${item}`];
        saqs.push(saq);
        delete values[`question${item}`];
        delete values[`answer${item}`];
      });
      values.saq = JSON.stringify(saqs);

      _fetch({
        url:'/Merchant/Bankaccess',
        data:{
          method:'addaccess',
          ...values
        },
        success:(data)=>{
          console.log('addaccess',data);
          this.hideDialog();
          this.props.onOk();
        }
      });
    });
  };
  add = ()=>{
    const {key} = this.state;
    key.push(key[key.length-1]+1);
    this.setState({key:key})
  };
  remove = (item) => {
    const { key} = this.state;
    key.splice(key.indexOf(item),1);
    this.field.remove(`question${item}`);
    this.field.remove(`answer${item}`);
    this.setState({key});
  };
  getBankList= ()=>{
    _fetch({
      url:'/Merchant/Bank',
      data:{
        method:'getgrabbank'
      },
      success:(data)=>{
        console.log('getgrabbank',data);
        this.setState({
          bankList:data.data
        })
      }
    });
  };
  render() {
    const { btn } = this.props;
    const { isMobile,key,bankList } = this.state;
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
          visible={this.state.visible}
          language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
              <FormItem label={_intl.get('bank.bank')}>
                <Select style={{width:'100%'}}  {...init('bank',{rules:[{required:true,message:_intl.get('public.required')}]})}>
                {
                  bankList&&bankList.map((item,index)=>{
                    return(
                      <Select.Option value={item} key={index}>{item.toUpperCase()}</Select.Option>
                    )
                  })
                }
              </Select>
            </FormItem>
            <FormItem label={_intl.get('public.username')}>
              <Input
                {...init('username',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
            <FormItem label={_intl.get('public.holder_name')}>
              <Input
                {...init('holder_name',{rules:[{required:true,message:_intl.get('public.required')}]})}
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
               <FormItem label={_intl.get('bank.companyid')}>
              <Input
                {...init('companyid',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
            </FormItem>
            <FormItem label={_intl.get('bank.saq')} >
              {key.map( (item,index) => {
                return(
                  <div>
                    <FormItem label={
                      <span>
                        <span>{_intl.get('bank.question')}{index+1}</span>
                        {index>0&&<span  style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.remove(item)}><Icon type="ashbin" style={{color:'#FA7070'}} /></span>}
                      </span>
                    }>
                      <Input
                        {...init(`question${item}`,{rules:[{required:true,message:_intl.get('public.required')}]})}
                      />
                    </FormItem>
                    <FormItem label={_intl.get('bank.answer')} style={{margin:'8px 0'}}>
                      <Input
                        {...init(`answer${item}`,{rules:[{required:true,message:_intl.get('public.required')}]})}
                      />
                    </FormItem>
                  </div>
                )
              })}
            </FormItem>
            <Button type="normal" onClick={this.add}>＋{_intl.get('bank.add')}</Button>
          </Form>
        </Dialog>
        {hasAction(btn,'BankAccount_accountdetail')&&<Button type="normal" onClick={()=>this.showDialog(data)}>
            <Icon type="add" />
          {_intl.get('bank.new')}
        </Button>}
      </span>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
}
export default connect(mapStateToProps)(SimpleFormDialog);
const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};

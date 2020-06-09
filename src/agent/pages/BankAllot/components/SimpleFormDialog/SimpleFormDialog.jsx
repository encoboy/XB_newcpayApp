import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Select,Icon,Radio } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux';

const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;

class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      access:[],
      value: {},
      isMobile: false,
      bankList:[]
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
    this.getBankList();
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
      let {activeKey} = this.props;
      _fetch({
        url:'/Merchant/Bankassign',
        data:{
          method:'addbankassign',
          type:activeKey,
          ...values
        },
        success:(data)=>{
          console.log('addbankassign',data);
          this.hideDialog();
          this.props.onOk();
        }
      });

    });
  };
  getBankList= ()=>{
    let {activeKey} = this.props;
    _fetch({
      url:'/Merchant/Bankassign',
      data:{
        method:'getbanks',
        type:activeKey
      },
      success:(data)=>{
        console.log('getbanks',data);
        this.setState({
          bankList:data.data
        })
      }
    });
  };
  render() {
    const {btn} = this.props;
    const { isMobile ,access,bankList} = this.state;
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
                <Select
                  style={{width:'100%'}}
                  {...init('bank',{rules:[{required:true,message:_intl.get('public.required')}]})}
                  // onChange={(value)=>this.getAccess(value)}
                >
                {
                  bankList&&bankList.map((item,index)=>{
                    return(
                      <Select.Option value={item} key={index}>{item.toUpperCase()}</Select.Option>
                    )
                  })
                }
              </Select>
            </FormItem>
          </Form>
        </Dialog>
        {hasAction(btn,'BankAccount_addaccount')&&<Button type="normal" onClick={()=>this.showDialog(data)}>
            <Icon type="add" />
          {_intl.get('bank.new')}
        </Button>}
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    btn:state.operation.btn,
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

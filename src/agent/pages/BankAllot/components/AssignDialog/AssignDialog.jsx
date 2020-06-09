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
      userList:[]
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
    this.getUserList();
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
      let {id} = this.props;
      _fetch({
        url:'/Merchant/Bankassign',
        data:{
          method:'setmerchant',
          id:id,
          ...values
        },
        success:(data)=>{
          console.log('setmerchant',data);
          this.hideDialog();
          this.props.assignOk();
        }
      });

    });
  };
  getUserList= ()=>{
    let {id} = this.props;
    _fetch({
      url:'/Merchant/Bankassign',
      data:{
        method:'getusers',
        id:id
      },
      success:(data)=>{
        console.log('getusers',data);
        this.setState({
          userList:data.data
        })
      }
    },false);
  };
  render() {
    const {btn} = this.props;
    const { isMobile ,access,userList} = this.state;
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
          title={_intl.get('bank.assign')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          visible={this.state.visible}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
              <FormItem label={_intl.get('pg.user')}>
                <Select
                  style={{width:'100%'}}
                  {...init('user',{rules:[{required:true,message:_intl.get('public.required')}]})}
                >
                {
                  userList&&userList.map((item,index)=>{
                    return(
                      <Select.Option value={item.id} key={index}>{item.username}</Select.Option>
                    )
                  })
                }
              </Select>
            </FormItem>
          </Form>
        </Dialog>
        <Button  type="normal" shape="text" onClick={()=>this.showDialog(data)}>{_intl.get('bank.assign')}</Button>
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

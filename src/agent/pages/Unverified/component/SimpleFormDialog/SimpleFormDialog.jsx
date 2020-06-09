import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Select,Icon,Feedback } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo,hasAction} from '../../../../util';
import { connect } from 'react-redux';
// import logo_fetch from '../../../../components/fetchForm';
import IceContainer from '@icedesign/container';

const FormItem = Form.Item;
const Toast = Feedback.toast;

class AddRecharge extends Component {
  static displayName = 'AddRecharge';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
      key:[0],
      isMobile: false,

      userid:[],
      logo:null,
      imgShow:false,
      imgname:null,
      mustResit:false
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
    this.getUserId();
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
        value:{},
        logo:null,
        imgname:null
    },()=>{
      this.field.reset()
    });
  };

  // 得到userid
  getUserId = () => {
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'getusers'
      },
      success:(data)=>{
        console.log('getusers',data);
        this.setState({
          userid:data.users
        })
      }
    })
  };

  onOk = () => {
    this.field.validate((error,values) => {
      if (error) {
        return;
      }
      values.amount = values.amount&&parseInt(values.amount);
      if(!values.description){
        values.description = ''
      }else{
        values.description = values.description
      }
      logo_fetch({
        url:'/Merchant/Usertopup',
        data:{
          method:'addtopup',
          resit:this.state.logo,
          ...values
        },
        success:(data)=>{
          console.log('addtopup',data);
          if(data.status==='ok'){
            this.setState({
              value:{},
              logo:null,
              imgname:null
            });
            Toast.success(_intl.get('usercard.tip'));
            this.hideDialog();
            this.props.getCards();
          }
        }
      })
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
    // 得到图片
    isInArray=(arr,value)=>{
      for(var i = 0; i < arr.length; i++){
      if(value === arr[i]){
      return true;
      }
      }
      return false;
      }
    getlogo = (e) => {
      let logo = e.target.files[0];
      // var file = document.getElementById('file').value;
      // var extension = file.substr(index + 1);
      // var arr = ['jpeg','png','jpg','gif'];
      // if (this.isInArray(arr,extension)) {
      //   var img = document.getElementById("previewimg");
      //   img.src = window.URL.createObjectURL(e.target.files[0]);
      //   } else {
      //   message.info('请选择正确的图片格式');
      //   return false;
      //   }
      this.setState({
        logo:logo,
        imgShow:true,
        imgname:logo.name,
        mustResit:false
      })
    }
  render() {
    const { btn,data } = this.props;
    const { isMobile,key,userid,imgname,mustResit } = this.state;
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
          title={_intl.get('Recharge.new')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          visible={this.state.visible}
          language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
              <FormItem label={_intl.get('Recharge.userid')}>
                <Select style={{width:'100%'}}  {...init('userid',{rules:[{required:true,message:_intl.get('public.required')}]})}>
                  {userid.map((item,index)=>{
                    return (
                      <Select.Option value={item.id} key={item.id}>{item.username}</Select.Option>
                    )
                  })}
                </Select>
              </FormItem>
              {/*<FormItem label={_intl.get('Recharge.bank')}>
                <Select style={{width:'100%'}}  {...init('bank',{rules:[{required:true,message:_intl.get('public.required')}]})}>
                  <Select.Option value="mbb">MBB</Select.Option>
                  <Select.Option value="cimb">CIMB</Select.Option>
                  <Select.Option  value="pbb">PBB</Select.Option>
                  <Select.Option  value="hlb">HLB</Select.Option>
                  <Select.Option  value="rhb">RHB</Select.Option>
                </Select>
                </FormItem>*/}
                  
            {/*<FormItem label={_intl.get('Recharge.account')}>
              <Input 
                {...init('account',{rules:[{required:true,message:_intl.get('public.required')},
                { pattern: /^[0-9]{6,20}$/, message: _intl.get('Recharge.mustnumber') }]})}
              />
              </FormItem>*/}

            {/*<FormItem label={_intl.get('Recharge.holder')}>
              <Input
                {...init('holder',{rules:[{required:true,message:_intl.get('public.required')}]})}
              />
              </FormItem>*/}

            <FormItem label={_intl.get('Recharge.rechargeamount')}>
              <Input
                {...init('amount',{rules:[{required:true,message:_intl.get('public.required')},
                { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: _intl.get('Recharge.mustnumber') }]})}
              />
            </FormItem>
            <FormItem label={_intl.get('Recharge.description')}>
              <Input 
                {...init('description')}
              />
            </FormItem>

            <FormItem label={_intl.get('Recharge.resit')}>
            <div>
              <a href="#" className="file">
                <label for="file">{_intl.get('public.logo')}</label>
                <input
                  onChange={(e)=>{this.getlogo(e)}}
                  name="file" 
                  type="file" 
                  className='upload'
                  id="file"
                />
              </a>
              {/*mustResit&&<div style={styles.mustResit}>{_intl.get('public.required')}</div>*/}
            <div>{_intl.get('myfinance.logoname')}：{imgname}</div>
            </div>
          </FormItem>
            
          </Form>
        </Dialog>
        <Button size="large" type="normal" onClick={()=>this.showDialog(data)}>
            <Icon type="add" />
          {_intl.get('Recharge.new')}
        </Button>
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
export default connect(mapStateToProps)(AddRecharge);
const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  mustResit:{
    color:'red',
    fontSize:'12px',
  }
};

/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio,Dialog,DatePicker,moment,Select} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './Addrunwater.scss';
// import logo_fetch from '../../../../components/fetchForm';
import {connect} from 'react-redux'
import {hasAction} from '../../../../util';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

 class Addrunwater extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
      imgname:null,
      imgShow:false,
      logo:null,
      currencyData:[]
    };
  }


  formChange = (value) => {
    this.setState({
      value,
    });
  };
  // 获取货币
  getCurrency = () => {
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'currency'
      },
      success:(data)=>{
        console.log('currency',data),
        this.setState({
          currencyData:data.data
        })
      }
    })
  }
  componentDidMount(){
    this.getCurrency();
  }

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
      logo_fetch({
        url:'/Manager/Wallettrx',
        data:{
          method:'addwallettrx',
          resit:this.state.logo,
          add_date:moment(values.add_date).format('YYYYMMDD'),
          total:values.total,
          description:values.description,
          currencyid:values.currencyid
        },
        success:(data)=>{
          console.log('addwallettrx',data);
          if(data.status==='ok'){
            this.setState({value:{}});
            Toast.success(_intl.get('usercard.tip'));
            this.props.history.push('/wallet/cost');
          }else{
            Toast.error(_intl.get('usercard.mustamount'));
          }
        }
      })

    });
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
      console.log(e);
      let logo = e.target.files[0];
      console.log(logo)
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
        imgname:logo.name
      })
    }

  // 二次确认
  yesandno = () => {
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:() => {
        this.validateAllFormField();
    }
    });
  }

  render() {
    const {btn} = this.props;
    const {value,imgname,currencyData} = this.state;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>
                {_intl.get('wallet.addrunwater')}
              </h2>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('merchantlist.currency')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="currencyid"   required message= {_intl.get('public.required')}>
                  <Select style={{width:'100%'}} placeholder={_intl.get('merchantlist.currencytype')}>
                    {currencyData&&currencyData.map((item,index)=>{
                      return (
                        <Select.Option value={item.id} key={index}>{item.code}</Select.Option>
                      )
                    })}
                  </Select>
                  </IceFormBinder>
                  <IceFormError name="currencyid" />
                </Col>
              </Row>
  
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.total')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="total"
                    rules={[
                      {pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,required:true,message:_intl.get('wallet.mustnumber')}
                    ]} 
                  >
                    <Input size="large"  style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="total" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.description')}：
                </Col>
                <Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>
                  <IceFormBinder name="description"                     
                  rules={[
                    {min:5,max:40,required:true,message:_intl.get('wallet.checkdes')}
                  ]} 
                  message= {_intl.get('public.required')}>
                  <Input
                  size="large"
                  style={{width:'100%'}}
                  />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.add_date')}：
                </Col>
                <Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>
                  <IceFormBinder name="add_date"                     
                  rules={[
                    {required:true, message: _intl.get('public.required')}
                  ]} 
                  message= {_intl.get('public.required')}>
                  <DatePicker style={{width:'100%'}} disabledDate={this.disabledDate}/>
                  </IceFormBinder>
                  <IceFormError name="add_date" />
                </Col>
              </Row>
              
              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('wallet.logo')}：
              </Col>
              <Col xxs="16" s="12" l="10">
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
                <div>{_intl.get('wallet.logoname')}:{imgname}</div>
              </Col>
            </Row>
            </div>
          </IceFormBinderWrapper>

          {
            <Row style={{ marginTop: 20 }}>
              <Col offset="3">
                <span>
                  {hasAction(btn,'Amend_addcost')&&<Button onClick={this.yesandno} type="primary">
                    {_intl.get('public.submit')}
                  </Button>}
                </span>
              </Col>
            </Row>
          }
        </IceContainer>
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


export default connect(mapStatToProp)(Addrunwater)

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  buttonfloat:{
    float:'right'
  }
};
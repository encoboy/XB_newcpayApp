/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button,Field, Feedback ,Dialog,DatePicker,moment} from '@icedesign/base';
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
      logo:null,
      src:null,
      currencyData:[]
    };
    this.field = new Field(this);
  }


  // 是否确认上传图片
  yessubmit = () => {
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        this.refs.form.validateAll((errors, values) => {
          if (errors) {
            return;
          }
          if(!values.add_date||!values.description||!values.total){
            Toast.error(_intl.get('usercard.mustamount'));
            return;
          }
          logo_fetch({
            url:'/Merchant/MerchantWalletTrx',
            data:{
              method:'addwallettrx',
              resit:this.state.logo,
              add_date:values.add_date?moment(values.add_date).format('YYYYMMDD'):null,
              total:values.total?values.total:null,
              description:values.description?values.description:null
            },
            success:(data)=>{
              console.log('addwallettrx',data);
              if(data.status==='ok'){
                this.setState({value:{}});
                Toast.success(_intl.get('usercard.tip'));
                this.props.history.push('/wallet/costlist');
              }
            }
          })  
        })
      }
    });
  }

  // 得到图片

  getlogo = (e) => {
    console.log(e.target.files)
    let logo = e.target.files[0];
    this.setState({
      logo:logo,
      imgname:logo.name
    })

    let reader = new FileReader();
    let _this = this;
    reader.onload = function(e){
      let data = e.target.result;
      let image = new Image();
      image.src = data;
      image.onload = function(){
        _this.setState({src:image.src})
      };
    };
    reader.readAsDataURL(logo);
  }

  // 新的校验
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

  render() {
    const {btn} = this.props;
    const {value,imgname,src} = this.state;
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
              </h2>
  
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
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
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
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
                  <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                    {_intl.get('wallet.add_date')}：
                  </Col>
                  <Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>
                    <IceFormBinder name="add_date"                     
                    rules={[
                      // {required:true,message:_intl.get('public.required')}
                    ]} 
                    >
                    <DatePicker style={{width:'100%'}} disabledDate={this.disabledDate}/>
                    </IceFormBinder>
                    <IceFormError name="add_date" />
                  </Col>
              </Row>
              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                {_intl.get('myfinance.logo')}：
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
                <div>{_intl.get('myfinance.logoname')}:{imgname}</div>
              </Col>
              </Row>

            </div>
                </IceFormBinderWrapper>


          {
            <Row style={{ marginTop: 20 }}>
              <Col offset="4">
                <span>
                  { hasAction(btn,'Amend_addcost')&&<Button onClick={this.yessubmit} type="primary">
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


// export default Addrunwater;

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
  },
  formwith:{
    width:'500px',
    marginLeft:'200px'
  }
};
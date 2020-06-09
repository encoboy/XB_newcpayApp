/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio,Field,} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './Addrunwater.scss';
import {connect} from 'react-redux';
import {hasAction} from '../../../../util';
// import logo_fetch from '../../../../components/fetchForm';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
const { Group: RadioGroup } = Radio;

class Addrunwater extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  
  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
      username:[],
      logo:null,
      imgShow:false,
      imgname:null,
      is_button:true
    };
    this.field = new Field(this);
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  componentDidMount(){
  }
  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      logo_fetch({
        url:'/Merchant/Agentaccount',
        data:{
          method:'addnormaljournal',
          ledgerid:this.props.moneydata.id,
          resit:this.state.logo,
          amount:values.amount,
          description:values.description,
          type:values.type,
          fee:values.fee
        },
        success:(data)=>{
          console.log('addnormaljournal',data);
          this.setState({value:{}});
          Toast.success(_intl.get('usercard.tip'));
          this.props.goback()
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


  render() {
    const {imgShow,imgname,is_button} = this.state;
    const {goback,btn} = this.props;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{_intl.get('myfinance.addrunwater')}
              <Button style={styles.floatRight} type='normal' shape='text' style={styles.floatRight}
              onClick={goback}>{_intl.get('myfinance.goback')}</Button>
              </h2>
              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('public.type')}：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="type"
                rules={[
                  {required:true,message:_intl.get('public.required')},
                ]}
                >
                <RadioGroup style={{marginTop:'6px'}}>
                <Radio value="1">{_intl.get('myfinance.income')}</Radio>
                <Radio value="0">{_intl.get('myfinance.transfer')}</Radio>
                </RadioGroup>
                </IceFormBinder>
                <IceFormError name="type" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.amount')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="amount"
                  rules={[
                    {required:true, message:_intl.get('public.required')},
                    { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: _intl.get('myfinance.mustnumber') }
                  ]}
                  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="amount" />
                </Col>
            </Row>
            <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('bank.fee_mony')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="fee"
                  rules={[
                    {required:true, message:_intl.get('public.required')},
                    { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: _intl.get('myfinance.mustnumber') }
                  ]}
                  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="fee" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.description')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="description"
                  rules={[
                    {required:true,message:_intl.get('public.required')},
                  ]}
                  >
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
                {_intl.get('myfinance.logo')}：
              </Col>
              <Col xxs="16" s="12" l="10">

              <IceFormBinder name="img"
              rules={[
                {required:true,message:_intl.get('public.required')},
              ]}
              >
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
              <div>{_intl.get('myfinance.logoname')}:{imgname}</div>
                </div>
              </IceFormBinder>
              <IceFormError name="img" />

              </Col>
            </Row>
            </div>
          </IceFormBinderWrapper>
          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              {is_button?hasAction(btn,"Amend_addrunwater")&&<Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.submit')}
              </Button>:<Button size="large" type="primary" >{_intl.get('public.submit')}</Button>}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
}
export default connect(mapStateToProps)(Addrunwater);

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
  floatRight:{
    float:'right'
  }
};

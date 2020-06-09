/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button,Field, Feedback ,Dialog,DatePicker,moment} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './FrontLogo.scss';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

const { Row, Col } = Grid;
const Toast = Feedback.toast;


 class FrontLogo extends Component {
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
      currencyData:[],
      getlogodata:'',
      uplodaImg:false
    };
    this.field = new Field(this);
  }

  componentDidMount(){
      this.getDatalogo();
  }
  //获得logo
  getDatalogo = () => {
      _fetch({
          url:'/Merchant/Profile',
          data:{
              method:'getlogo'
          },
          success:(data)=>{
              console.log('getlogo',data);
              this.setState({
                  getlogodata:data.data
              })
          }
      })
  }


  // 是否确认上传图片
  yessubmit = () => {
    this.refs.form.validateAll((errors, values) => {
        if (errors) {
        return;
        }
        logo_fetch({
        url:'/Merchant/Profile',
        data:{
            method:'uploadlogo',
            logo:this.state.logo,
        },
        success:(data)=>{
            console.log('uploadlogo',data);
            if(data.status==='ok'){
                this.getDatalogo();
                this.setState({value:{},uplodaImg:false});
                Toast.success(_intl.get('usercard.tip'));
                let inputImg = document.getElementById('file');
                inputImg.value = '';
            }
        }
        })  
    })
  }

  // 得到图片

  getlogo = (e) => {
    let logo = e.target.files[0];
    let fr = new FileReader();
    fr.onload = function(){
        document.getElementById('image').src=fr.result;
    }
    fr.readAsDataURL(logo);
    this.setState({
      logo:logo,
      uplodaImg:true
    });
    
    // let reader = new FileReader();
    // let _this = this;
    // reader.onload = function(e){
    //   let data = e.target.result;
    //   let image = new Image();
    //   image.src = data;
    //   image.onload = function(){
    //     _this.setState({src:image.src})
    //   };
    // };
    // reader.readAsDataURL(logo);
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

  //取消上传图片
  cancelUploadLogo = () => {
    this.setState({
        uplodaImg:false
    })
    let inputImg = document.getElementById('file');
    inputImg.value = '';
    this.setState({
      logo:null
    });
  }

  render() {
    const {btn} = this.props;
    const {value,imgname,src,getlogodata,uplodaImg} = this.state;
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
                <Col offset="2">
                    {/*uplodaImg&&<img id="image"  alt="" style={styles.newImg}/>*/}
                    <img  src={getlogodata} id="image"  alt="" style={{height:'100px',width:'200px'}}/>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col offset="2">
                    <a href="#" className="file">
                    <label for="file">{_intl.get('public.uplodaLogo')}</label>
                    <input
                        onChange={(e)=>{this.getlogo(e)}}
                        name="file" 
                        type="file" 
                        className='upload'
                        id="file"
                    />
                    </a>
                    <span style={styles.waringFont}>{_intl.get('error.error_size')}</span>
                </Col>
              </Row>
            </div>
            </IceFormBinderWrapper>

          {
            <Row style={{ marginTop: 5 }}>
              <Col offset="2">
                <span>
                  <Button onClick={this.yessubmit} type="primary">
                    {_intl.get('public.submit')}
                  </Button>
                </span>

                {/*<span style={{marginLeft:'10px'}}>
                  <Button onClick={this.cancelUploadLogo} type="primary">
                    {_intl.get('order.cancel')}
                  </Button>
                </span>*/}
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


export default connect(mapStatToProp)(FrontLogo)

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 15,
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
  },
  frontLogo:{
      width:'300px',
      height:'100px',
      margin:'0 0 20px 97px',
  },
  newImg:{
    height:'100px',
    width:'200px',
    marginRight:'50px'
  },
  notNewImg:{
    height:'100px',
    width:'200px',
    diplay:'none'
  },
  waringFont:{
    color:'red',
    marginLeft:'10px',
    fontSize:'10px'
  }
};
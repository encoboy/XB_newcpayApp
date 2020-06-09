/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback,Switch,Loading } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux'
import './ChangePgSever.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

 class ChangePgSever extends Component {
  static displayName = 'ChangePgSever';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
      defaultChecked:'',
      isLoading:true,
      apiData:''
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  // validateAllFormField = () => {
  //   this.refs.form.validateAll((errors, values) => {
  //     if (errors) {
  //       return;
  //     }
  //     let pg_control;
  //     if(values.pg_control){
  //       pg_control = 1;
  //     }else{
  //       pg_control = 2;
  //     }
  //     _fetch({
  //       url:'/Manager/Setting',
  //       data:{
  //         method:'setting',
  //         pg_control:pg_control
  //       },
  //       success:(data)=>{
  //         console.log('setting',data);
  //       }
  //     });
  //   });
  // };

  getPgcontrol = () => {
    _fetch({
      url:'/Manager/Setting',
      data:{
        method:'setting'
      },
      success:(data)=>{
        console.log('pgcontrol',data);
        this.setState({
          defaultChecked:data.data.pg_control,
          isLoading:false
        })
      }
    })
  }

  // 更新
  handleChange = (value) => {
    let pg_control;
    if(value){
      pg_control = 1;
    }else{
      pg_control = 2;
    }
    _fetch({
      url:'/Manager/Setting',
      data:{
        method:'updatesetting',
        pg_control:pg_control
      },
      success:(data)=>{
        console.log('updatesetting',data);
      }
    });
  }

  componentDidMount(){
    this.getPgcontrol();
  }

  render() {
    const {defaultChecked,isLoading} = this.state;
    let checkedValue;
    if(defaultChecked==1){
      checkedValue = true;
    }else if(defaultChecked==2){
      checkedValue = false;
    }
    return (
      <div className="change-password-form">
        <IceContainer>
  
            {isLoading?<Loading/>:<div style={styles.formContent}>
            <h2 style={styles.formTitle}></h2>
            <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('public.pgseverswitch')}：
              </Col>
              <Col xxs="16" s="10" l="6">
                <Switch defaultChecked={checkedValue}  onChange={(value)=>this.handleChange(value)}/>
              </Col>
            </Row>
          </div>}
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language:state.language,
    btn:state.operation.btn
  }
};

export default connect(mapStateToProps)(ChangePgSever)

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
};

import React, { Component } from 'react';
import { Button,Grid,Select ,Input,Feedback} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import New from '../SimpleFormDialog';
const { Row, Col } = Grid;
const Toast = Feedback.toast;

export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        bank: null,
        user:null
      }
    };
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      let params = {
        bank:values.bank?values.bank:undefined,
        user:values.user?values.user:undefined
      }
     this.props.onSubmit(params);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        bank: '',
        user:''
      }
    },()=>{
      this.props.onReset()
    })
  };
  render(){
    let {activeKey} = this.props;
    return(
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="bank" >
                <Input  style={{width:'90%'}}  placeholder={_intl.get('bank.bank')}/>
              </IceFormBinder>
              <IceFormError name="bank" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="user" >
                <Input  style={{width:'90%'}}  placeholder={_intl.get('pg.user')}/>
              </IceFormBinder>
              <IceFormError name="user" />
            </Col>
            <Col xxs="24" s="16" l="16" style={styles.formItem} >
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.search')}
              </Button>
              <Button
                style={{margin:'0 10px'}}
                size="large"
                type="normal"
                onClick={this.handleReset}
              >
                {_intl.get('public.reset')}
              </Button>
              <New onOk={this.props.onReset} activeKey={activeKey}/>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    )
  }
}

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

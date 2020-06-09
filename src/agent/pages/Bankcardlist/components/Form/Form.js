import React, { Component } from 'react';
import { Button,Grid,Input,Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        number:'',
        bank:'',
        status:''
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
     this.props.onSubmit(values);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        username: '',
        number:'',
        bank:'',
        status:''
      }
    },()=>{
      this.props.onReset()
    })
  };
  render(){
    return(
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="username"  message= {_intl.get('public.required')}>
                <Input  style={{width:'90%'}} placeholder={_intl.get('bankcardlist.username')}/>
              </IceFormBinder>
              <IceFormError name="username" />
            </Col>
              <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="number"  message= {_intl.get('public.required')}>
                <Input  style={{width:'90%'}} placeholder={_intl.get('bankcardlist.number')}/>
              </IceFormBinder>
              <IceFormError name="number" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <IceFormBinder name="status"  message= {_intl.get('public.required')}>
              {/*<Input  style={{width:'90%'}} placeholder={_intl.get('public.status')}/>*/}
                <Select style={{width:'90%'}} placeholder={_intl.get('public.status')}>
                  <Select.Option value="0">{_intl.get('bankcardlist.0')}</Select.Option>
                  <Select.Option value="1">{_intl.get('usercard.1')}</Select.Option>
                  <Select.Option value="2">{_intl.get('usercard.2')}</Select.Option>
                </Select>
            </IceFormBinder>
            <IceFormError name="status" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <IceFormBinder name="bank"  message= {_intl.get('public.required')}>
              <Input  style={{width:'90%'}} placeholder={_intl.get('bankcardlist.bank')}/>
            </IceFormBinder>
            <IceFormError name="bank" />
            </Col>
            <Col xxs="24" s="20" l="8" style={styles.formItem} >
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.search')}
              </Button>
              <Button
                style={{marginLeft:'10px'}}
                size="large"
                type="normal"
                onClick={this.handleReset}
              >
                {_intl.get('public.reset')}
              </Button>
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

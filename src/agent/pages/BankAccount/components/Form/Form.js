import React, { Component } from 'react';
import { Button,Grid,Select ,Input} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import New from '../SimpleFormDialog';
const { Row, Col } = Grid;

export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        type: null,
        number:''
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
        type: null,
        number:''
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
              <IceFormBinder name="type" >
                <Select style={{width:'90%'}} placeholder={_intl.get('bank.type')}>
                  <Select.Option value="2">{_intl.get('bank.2')}</Select.Option>
                  <Select.Option value="3">{_intl.get('bank.3')}</Select.Option>
                  <Select.Option value="4">{_intl.get('bank.4')}</Select.Option>
                </Select>
              </IceFormBinder>
              <IceFormError name="type" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="number" >
                <Input  style={{width:'90%'}}  placeholder={_intl.get('bank.account')}/>
              </IceFormBinder>
              <IceFormError name="number" />
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
              <New onOk={this.props.onReset}/>
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

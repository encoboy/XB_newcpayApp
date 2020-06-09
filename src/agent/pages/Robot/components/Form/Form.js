import React, { Component } from 'react';
import { Button,Grid,Input } from '@icedesign/base';
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
        robotid: '',
        ip:''
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
        robotid: '',
        ip:''
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
              <IceFormBinder name="robotid" required message= {_intl.get('public.required')}>
               <Input style={{width:'90%'}} placeholder={_intl.get('public.id')}/>
              </IceFormBinder>
              <IceFormError name="robotid" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="ip" >
                <Input style={{width:'90%'}} placeholder={_intl.get('robot.ip')}/>
              </IceFormBinder>
              <IceFormError name="ip" />
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

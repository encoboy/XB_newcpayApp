import React, { Component } from 'react';
import { Button,Grid,Input,Dialog ,Checkbox } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Group: CheckboxGroup } = Checkbox;

export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        robotid: '',
        merchant:''
      },
      binding:0,
      status:0
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
    const {binding,status} = this.state;
    values['binding'] = binding;
    values['status'] = status;      
    this.props.onSubmit(values);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        robotid: '',
        merchant:''
      }
    },()=>{
      this.props.onReset()
    })
  };

  bindingClick=(value)=>{
    this.setState({
      binding:value?1:0
    })
  }

  statusClick=(value)=>{
    this.setState({
      status:value?1:0
    })
  }

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
              <IceFormBinder name="robotid" >
               <Input style={{width:'90%'}} placeholder={_intl.get('robot.searchid')}/>
              </IceFormBinder>
              <IceFormError name="robotid" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="merchant" >
                <Input style={{width:'90%'}} placeholder={_intl.get('robot.searchagent')}/>
              </IceFormBinder>
              <IceFormError name="merchant" />
            </Col>
            <Col xxs="20" s="1" l="3" style={{paddingTop:'5px'}}>
                <label style={{marginRight:'5px'}}>
                  <Checkbox id="binding" onChange={value=>this.bindingClick(value)}/>
                  <span className="next-checkbox-label">{_intl.get('public.bindingRobot')}</span>
                </label>
                <label>
                  <Checkbox id="status" onChange={value=>this.statusClick(value)}/>
                  <span className="next-checkbox-label">{_intl.get('public.statusRobot')}</span>
                </label>
            </Col>
            <Col xxs="24" s="16" l="12" style={styles.formItem} >
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
              <Button
              style={{marginLeft:'10px'}}
              size="large"
              type="primary"
              onClick={this.props.allRestart}
            >
              {_intl.get('robot.allRestart')}
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

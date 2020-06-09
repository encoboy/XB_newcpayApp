import React, { Component } from 'react';
import { Button,Grid,DatePicker ,moment,Field,Input } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class DateTime extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      type:''
    };
    this.field = new Field(this);
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
      const params = {name:this.state.name||undefined,type:this.state.type||undefined};
      this.props.onSubmit(params)
  };
  handleReset = () => {
    this.setState({
      name:'',
      type:''
    },()=>{
      this.props.onReset()
    })
  };
  onChangeName = (value) => {
    this.setState({name:value})
  }
  onChangeType = (value) => {
    this.setState({type:value})
  }
  render(){
    const {name,type} = this.state;
    return(
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="16" l="4" style={styles.formItem} >
              <Input style={{width:'90%'}} placeholder={_intl.get('myfinance.financename')} onChange={this.onChangeName} value={name}/>
            </Col>
            <Col xxs="24" s="16" l="4" style={styles.formItem} >
              <Input style={{width:'90%'}} placeholder={_intl.get('myfinance.financetype')} onChange={this.onChangeType} value={type}/>
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
            </Col>
          </Row>
        </div>
    )
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative'
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

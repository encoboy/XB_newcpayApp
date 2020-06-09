import React, { Component } from 'react';
import { Button,Grid ,Select,Input} from '@icedesign/base';
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
        searchtype:'6',
        searchid:''
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
      values.type='normal';
      this.props.onSubmit(values);
      this.props.hideTatalAmount();
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        searchtype:'6',
        searchid:''
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
              <IceFormBinder name="searchtype" >
                <Select  style={{width:'90%'}}>
                  <Select.Option value="0">{_intl.get('public.id')}</Select.Option>
                  <Select.Option value="1">{_intl.get('order.from_account')}</Select.Option>
                  <Select.Option value="2">{_intl.get('order.to_account')}</Select.Option>
                  {/*<Select.Option value="3">{_intl.get('order.from_bank')}</Select.Option>
                  <Select.Option value="4">{_intl.get('order.to_bank')}</Select.Option>*/}
                  <Select.Option value="5">{_intl.get('order.thirdpartyid')}</Select.Option>
                  <Select.Option value="6">{_intl.get('order.index')}</Select.Option>
                </Select>
              </IceFormBinder>
              <IceFormError name="searchtype" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="searchid" >
                <Input style={{width:'90%'}}/>
              </IceFormBinder>
              <IceFormError name="searchid" />
            </Col>
            <Col xxs="24" s="20" l="16" style={styles.formItem} >
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

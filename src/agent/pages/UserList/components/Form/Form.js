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
        keyword: ''
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
        keyword:''
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
              <IceFormBinder name="keyword"  message= {_intl.get('public.required')}>
                <Input  style={{width:'90%'}} placeholder={`${_intl.get('public.username')}/${_intl.get('public.phone')}`}/>
                {/*<Select style={{width:'90%'}} placeholder={_intl.get('transfer.status')}>*/}
                  {/*<Select.Option value="pending">pending</Select.Option>*/}
                  {/*<Select.Option value="reject">reject</Select.Option>*/}
                  {/*<Select.Option value="approve">approve</Select.Option>*/}
                  {/*<Select.Option value="processing">processing</Select.Option>*/}
                {/*</Select>*/}
              </IceFormBinder>
              <IceFormError name="keyword" />
            </Col>
            <Col xxs="24" s="20" l="20" style={styles.formItem} >
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

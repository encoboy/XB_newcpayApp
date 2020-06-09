import React, { Component } from 'react';
import { Button,Grid,Select,Input,DatePicker,moment } from '@icedesign/base';
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
        merchantmes: '',
        ordertype: null,
        dateone: new Date(),
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
     this.props.onSubmit({
       merchantmes:values.merchantmes?values.merchantmes:undefined,
       ordertype:values.ordertype?values.ordertype.join('|'):undefined,
       dateone:values.dateone?moment(values.dateone).format('YYYYMMDD'):undefined
     });
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        merchantmes: '',
        ordertype: null,
        dateone:new Date(),
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
            {/*<Col xxs="24" s="4" l="4" style={styles.formItem} >*/}
              {/*<IceFormBinder name="merchantmes">*/}
                {/*<Input style={{width:'90%'}} placeholder={_intl.get('OrderStatistics.merchant')}/>*/}
              {/*</IceFormBinder>*/}
              {/*<IceFormError name="merchantmes" />*/}
            {/*</Col>*/}
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="ordertype" >
                <Select style={{width:'90%'}} multiple placeholder={_intl.get('OrderStatistics.type')}>
                  <Select.Option value="1">{_intl.get('orderTypes.1')}</Select.Option>
                  <Select.Option value="2">{_intl.get('orderTypes.2')}</Select.Option>
                  <Select.Option value="3">{_intl.get('orderTypes.3')}</Select.Option>
                  <Select.Option value="4">{_intl.get('orderTypes.4')}</Select.Option>
                  <Select.Option value="5">{_intl.get('orderTypes.5')}</Select.Option>
                </Select>
              </IceFormBinder>
              <IceFormError name="ordertype" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="dateone" >
                <DatePicker  style={{width:'90%'}} placeholder={_intl.get('public.date')}/>
              </IceFormBinder>
              <IceFormError name="dateone" />
            </Col>
            <Col xxs="24" s="12" l="12" style={styles.formItem} >
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

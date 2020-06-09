import React, { Component } from 'react';
import { Button,Grid,Select,DatePicker,moment } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const today = new Date();
const nowToday = moment(today).format("YYYYMMDDHHmmss");
const nowDailyStart = moment(today).format('YYYY-MM-DD');
const nowDailyEnd = moment(today).format('YYYY-MM-DD');
export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        status: null,
        start:nowDailyStart,
        stop:nowDailyEnd,
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
      const params = {
        status: values.status?values.status:undefined,
        start:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYY-MM-DD'),
        stop:values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYY-MM-DD'),
      };
     this.props.onSubmit(params);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        status:null,
        start:nowDailyStart,
        stop:nowDailyEnd,
      }
    },()=>{
      this.props.onReset()
    })
  };
  // 只选择今天之前的时间
  disabledDate = (calendarDate) => {
    const { year, month, date } = calendarDate;
    const theDate = moment(`${year}-${month + 1}-${date}`, "YYYY-M-D");
    return theDate > new Date().getTime();
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
            {/*<Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="status">
                <Select style={{width:'90%'}} placeholder={_intl.get('transfer.status')}>
                  <Select.Option value="pending">{_intl.get('status.pending')}</Select.Option>
                  <Select.Option value="verified">{_intl.get('status.verified')}</Select.Option>
                  <Select.Option value="reject">{_intl.get('status.reject')}</Select.Option>
                  <Select.Option value="processing">{_intl.get('status.processing')}</Select.Option>
                  <Select.Option value="fail">{_intl.get('order.fail')}</Select.Option>
                </Select>
              </IceFormBinder>
              <IceFormError name="status" />
            </Col>*/}
          <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <IceFormBinder name="start"  >
              <DatePicker style={{width:'90%'}}  disabledDate={this.disabledDate} onChange={this.onChange1}/>
            </IceFormBinder>
            <IceFormError name="start" />
          </Col>
          <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <IceFormBinder name="stop" >
              <DatePicker style={{width:'90%'}}  disabledDate={this.disabledDate} onChange={this.onChange1}/>
            </IceFormBinder>
            <IceFormError name="stop" />
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

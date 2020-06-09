import React, { Component } from 'react';
import { Button,Grid,DatePicker,Select,Input,moment } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

const today = new Date();
const nowToday = moment(today).format("YYYYMMDDHHmmss");
const nowDailyStart = moment(today).format('YYYYMMDD000000');
const nowDailyEnd = moment(today).format('YYYYMMDD235959');
export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        start:nowDailyStart,
        stop:nowDailyEnd,
        op_name:'',
        from:'',
        event:'',
        params:''
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
     for( const i in values){
        if(!values[i]){
          delete values[i]
        }
     }
      const params = Object.assign({},{...values});
      if(params.start){
        params.start  = values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss')
      }
      if(params.stop){
        params.stop  = values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYYMMDDHHmmss')
      }
      this.props.onSubmit(params);
    // const params = {
    //   start:this.state.start,
    //   stop:this.state.stop,
    //   from:values.from,
    //   op_name:values.op_name
    // }
    // this.props.onSubmit(params);
    });
  };
  // onChange1 = (value) => {
  //   this.setState({
  //     start:moment(value).format('YYYY-MM-DD')
  //   })
  // }
  // onChange2 = (value) => {
  //   this.setState({
  //     stop:moment(value).format('YYYY-MM-DD')
  //   })
  // }
  handleReset = () => {
    this.setState({
      value:{
        start:nowDailyStart,
        stop:nowDailyEnd,
        op_name:'',
        from:'',
        event:'',
        params:''
      }
    },()=>{
      this.props.onReset()
    })
  };
  // 选择今天之前的时间
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
            <Col xxs="24" s="3" l="3" style={styles.formItem} >
              <IceFormBinder name="op_name" >
                <Input placeholder={_intl.get('operationLog.op_name')}   style={{width:'90%'}}/>
              </IceFormBinder>
              <IceFormError name="op_name" />
            </Col>
            <Col xxs="24" s="3" l="3" style={styles.formItem} >
              <IceFormBinder name="from" >
                <Select placeholder={_intl.get('operationLog.from')} style={{width:'90%'}}>
                  <Select.Option value=""   >{_intl.get('operation.all')}</Select.Option>
                  <Select.Option value="ncpayadmin">{_intl.get('event.ncpayadmin')}</Select.Option>
                  <Select.Option value="ncpayagent">{_intl.get('event.ncpayagent')}</Select.Option>
                  <Select.Option value="ncpaymerchant">{_intl.get('event.ncpaymerchant')}</Select.Option>
                </Select>
                {/*<Input placeholder={_intl.get('operationLog.op_name')}   style={{width:'90%'}}/>*/}
              </IceFormBinder>
              {/*<IceFormError name="from" />*/}
            </Col>
            {/*<Col xxs="24" s="3" l="3" style={styles.formItem} >*/}
              {/*<IceFormBinder name="event" >*/}
                {/*<Input placeholder={_intl.get('operationLog.event')}    style={{width:'90%'}}/>*/}
              {/*</IceFormBinder>*/}
              {/*<IceFormError name="event" />*/}
            {/*</Col>*/}
            {/*<Col xxs="24" s="3" l="3" style={styles.formItem} >*/}
              {/*<IceFormBinder name="params" >*/}
                {/*<Input placeholder={_intl.get('operationLog.params')}    style={{width:'90%'}}/>*/}
              {/*</IceFormBinder>*/}
              {/*<IceFormError name="params" />*/}
            {/*</Col>*/}
            <Col xxs="24" s="3" l="3" style={styles.formItem} >
            <IceFormBinder name="start" >
                <DatePicker onChange={this.onChange1}  showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}  disabledDate={this.disabledDate} locale={{datePlaceholder:_intl.get('public.start')}}  style={{width:'90%'}} />
            </IceFormBinder>
            <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="3" l="3" style={styles.formItem} >
              <IceFormBinder name="stop" >
                <DatePicker onChange={this.onChange1} showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }}  disabledDate={this.disabledDate} locale={{datePlaceholder:_intl.get('public.stop')}}  style={{width:'90%'}} />
                </IceFormBinder>
              <IceFormError name="stop" />
            </Col>
            <Col xxs="24" s="6" l="6" style={styles.formItem} >
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

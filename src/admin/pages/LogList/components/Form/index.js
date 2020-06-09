import React, { Component } from 'react';
import { Button,Grid ,Select,Input,DatePicker ,moment} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Combobox } = Select;
const today = new Date();
const nowToday = moment(today).format("YYYYMMDDHHmmss");
const nowDailyStart = moment(today).format('YYYYMMDD000000');
const nowDailyEnd = moment(today).format('YYYYMMDD235959');
export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        appname:null,
        clientip:'',
        service:'',
        action:'',
        output:'',
        params:'',
        start:nowDailyStart,
        end:nowDailyEnd,
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
      for(const i in values){
        if(!values[i]){
          delete values[i]
        }
      }
      const param = {
        appname:values.appname?values.appname:undefined,
        clientip:values.clientip?values.clientip:undefined,
        service:values.service?values.service:undefined,
        action:values.action?values.action:undefined,
        output:values.output?values.output:undefined,
        params:values.params?values.params:undefined,
        start:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss'),
        end:values.end===nowDailyEnd?nowDailyEnd:moment(values.end).format('YYYYMMDDHHmmss'),
      }
      this.props.onSubmit(param);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        appname:null,
        clientip:'',
        service:'',
        action:'',
        output:'',
        params:'',
        start:nowDailyStart,
        end:nowDailyEnd,
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
            <Col xxs="24" s="6" l="2" style={styles.formItem} >
              <IceFormBinder name="appname" >
                <Combobox  style={{width:'90%'}} placeholder={_intl.get('log.appname')} >
                  <Select.Option value="ncpayagent">ncpayagent</Select.Option>
                  <Select.Option value="ncpayadmin">ncpayadmin</Select.Option>
                  <Select.Option value="ncpaymerchant">ncpaymerchant</Select.Option>
                  <Select.Option value="ncpaycron">ncpaycron</Select.Option>
                  <Select.Option value="ncpayfront">ncpayfront</Select.Option>
                  <Select.Option value="ncpayapi">ncpayapi</Select.Option>
                </Combobox>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="2" style={styles.formItem} >
              <IceFormBinder name="clientip" >
                <Input style={{width:'90%'}} placeholder={_intl.get('log.clientip')} />
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="2" style={styles.formItem} >
              <IceFormBinder name="service"  >
                <Input style={{width:'90%'}} placeholder={_intl.get('log.service')}/>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="2" style={styles.formItem} >
              <IceFormBinder name="action" >
                <Input style={{width:'90%'}} placeholder={_intl.get('log.action')}/>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="2" style={styles.formItem} >
              <IceFormBinder name="output" >
                <Input style={{width:'90%'}} placeholder={_intl.get('log.output')}/>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="2" style={styles.formItem} >
              <IceFormBinder name="params" >
                <Input style={{width:'90%'}} placeholder={_intl.get('log.params')}/>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="3" style={styles.formItem} >
              <IceFormBinder name="start" >
              <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}  disabledDate={this.disabledDate}/>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="6" l="3" style={styles.formItem} >
              <IceFormBinder name="end" >
              <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }} disabledDate={this.disabledDate}/>
              </IceFormBinder>
            </Col>
            <Col xxs="24" s="24" l="6" style={styles.formItem} >
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

import React, { Component } from 'react';
import { Button,Grid,Select,DatePicker,moment,Input } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const today = new Date();
const nowDailyStart = moment(today).format('YYYYMMDD000000');
const nowDailyEnd = moment(today).format('YYYYMMDD235959');
export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        start:nowDailyStart,
        stop:nowDailyEnd,
        status:null
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
      const arr = [];
      if(values.status){
        let type = values.status;
        for(let i=0;i<type.length;i++){
          arr.push(type[i]);
        }
      }
      let typeParam = arr.join('|');
      const params = {
        start:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss'),
        stop:values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYYMMDDHHmmss'),
        type:typeParam?typeParam:undefined,
        orderid:values.orderid?values.orderid:undefined
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
    const dataSource = [
      {label:_intl.get('orderTypes.1'),value:1},
      {label:_intl.get('orderTypes.2'),value:2},
      {label:_intl.get('orderTypes.3'),value:3},
      {label:_intl.get('orderTypes.4'),value:4},
      {label:_intl.get('orderTypes.5'),value:5},
      {label:_intl.get('orderTypes.6'),value:6},
    ]
    return(
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="status" >
                <Select style={{width:'90%'}} dataSource={dataSource} multiple={true} placeholder={_intl.get('wallet.type')}>
              </Select>
              </IceFormBinder>
              <IceFormError name="status" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="orderid" >
                <Input style={{width:'90%'}}  placeholder={_intl.get('wallet.orderid')}/>
              </IceFormBinder>
              <IceFormError name="orderid" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="start"  >
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="stop" >
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="stop" />
            </Col>
              <Col xxs="24" s="20" l="8" style={styles.formItem} >
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

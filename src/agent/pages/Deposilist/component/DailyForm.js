import React, { Component } from 'react';
import { Button,Grid,DatePicker ,moment,Select} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { getStopRedDot } from '../../../redux/action';
const { Row, Col } = Grid;

const today = new Date();
const nowToday = moment(today).format("YYYYMMDDHHmmss");
const nowDailyStart = moment(today).format('YYYYMMDD000000');
const nowDailyEnd = moment(today).format('YYYYMMDD235959');
class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        start:nowDailyStart,
        stop:nowDailyEnd,
        status:null,
        name:null
      },
      userData:[]
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
        start:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss'),
        stop:values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYYMMDDHHmmss'),
        name:values.name?values.name:undefined,
        status:values.status?values.status:undefined
      };
      this.props.onSubmit(params);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        start:nowDailyStart,
        stop:nowDailyEnd,
        status:null,
        name:null
      }
    },()=>{
      this.props.onReset()
    })
  };
  onChange1 = () => {
    this.props.stopRedDot();
  }
  // 选择今天之前的时间
  disabledDate = (calendarDate) => {
    const { year, month, date } = calendarDate;
    const theDate = moment(`${year}-${month + 1}-${date}`, "YYYY-M-D");
    return theDate > new Date().getTime();
  };
  getUser = () => {
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'getusers'
      },
      success:(data)=>{
        console.log('getusers',data);
        this.setState({userData:data.users})
      }
    })
  };
  componentDidMount(){
    this.getUser();
  }
  render(){
    const {userData} = this.state;
    return(
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <div style={styles.formContent}>
          <Row wrap >
          <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <IceFormBinder name="name"  message= {_intl.get('public.required')}>
              <Select style={{width:'90%'}}  placeholder={_intl.get('withdraw.merchantname')}>
                {userData.map((item,index)=>{
                  return(
                    <Select.Option value={item.username} key={index}>{item.username.toUpperCase()}</Select.Option>
                  )
                })}
              </Select>
            </IceFormBinder>
            <IceFormError name="name" />
          </Col>
          <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <IceFormBinder name="status"   message= {_intl.get('public.required')}>
              <Select  style={{width:'90%'}}>
                <Select.Option value="pending">{_intl.get('order.pending')}</Select.Option>
                <Select.Option value="processing">{_intl.get('order.processing')}</Select.Option>
                <Select.Option value="cancel">{_intl.get('order.cancel')}</Select.Option>
                <Select.Option value="approve">{_intl.get('order.approve')}</Select.Option>
                <Select.Option value="verified">{_intl.get('order.verified')}</Select.Option>
                <Select.Option value="fail">{_intl.get('status.fail')}</Select.Option>
              </Select>
            </IceFormBinder>
            <IceFormError name="status" />
           </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="start" >
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="stop">
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="stop" />
            </Col>
            <Col xxs="24" s="16" l="8" style={styles.formItem} >
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
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}
const mapDispatchToProps = dispatch => {
  return {
    stopRedDot:()=>dispatch(getStopRedDot(false)),
  }
};
export default connect(mapStatToProp,mapDispatchToProps)(Form);

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

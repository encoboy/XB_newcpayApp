import React, { Component } from 'react';
import { Button,Grid ,Select,Input,DatePicker,moment} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { getStopRedDot } from '../../../../redux/action';
import AddRecharge from '../SimpleFormDialog/index';

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
        username:null,
        start:nowDailyStart,
        stop:nowDailyEnd
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
        name:values.username,
        start:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss'),
        stop:values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYYMMDDHHmmss')
      };
      this.props.onSubmit(params);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        username:null,
        start:nowDailyStart,
        stop:nowDailyEnd
      }
    },()=>{
      this.props.onReset()
    })
  };
  onChange1 = () => {
    this.props.stopRedDot();
  }
  // 只能选择今天之前的时间
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
    const {bank,status} = this.props;
    const {userData} = this.state;
    return(
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="8" l="3" style={styles.formItem} >
              <IceFormBinder name="username" >
                <Select style={{width:'90%'}}  placeholder={_intl.get('withdraw.merchantname')}>
                  {userData.map((item,index)=>{
                    return(
                      <Select.Option value={item.username} key={index}>{item.username.toUpperCase()}</Select.Option>
                    )
                  })}
                </Select>
              </IceFormBinder>
              <IceFormError name="username" />
            </Col>
            <Col xxs="24" s="8" l="4" style={styles.formItem} >
              <IceFormBinder name="start" >
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="8" l="4" style={styles.formItem} >
              <IceFormBinder name="stop" >
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="stop" />
            </Col>
            <Col xxs="24" s="8" l="13" style={styles.formItem} >
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.search')}
              </Button>
              <Button
                style={{margin:'0 10px'}}
                size="large"
                type="normal"
                onClick={this.handleReset}
              >
                {_intl.get('public.reset')}
              </Button>
              <AddRecharge getCards={this.props.getCards}/>
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

import React, { Component } from 'react';
import { Button,Grid,DatePicker ,moment} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { getStopRedDot } from '../../../../../../redux/action';
const { Row, Col } = Grid;

const today = new Date();
const nowToday = moment(today).format("YYYYMMDDHHmmss");
// 結束的時間
const toTime = moment(today).format('YYYYMMDD');
const nowDailyEnd = toTime + '235959';
// 開始的時間
const dailyTime = moment(today).format('YYYYMMDD-HHmmss');
const dailyArr = dailyTime.split('-');
const dailyStart = dailyArr[1];
const nowDailyStart = (nowToday - dailyStart).toString();

class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        start:nowDailyStart,
        stop:nowDailyEnd
      },
    };
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log(values);
      if (errors) {
        return;
      }
      const params = {
        start:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss'),
        stop:values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYYMMDDHHmmss')
      };
      this.props.onSubmit(params);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
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
  //只可以选择今天之前的时间
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
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="start" >
                <DatePicker style={{width:'90%'}}  showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="stop">
                <DatePicker style={{width:'90%'}} showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }} disabledDate={this.disabledDate} onChange={this.onChange1}/>
              </IceFormBinder>
              <IceFormError name="stop" />
            </Col>
            <Col xxs="24" s="16" l="16" style={styles.formItem} >
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
const mapStateToProps = (state) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
}
const mapDispatchToProps = dispatch => {
  return {
    stopRedDot:()=>dispatch(getStopRedDot(false)),
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Form);

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

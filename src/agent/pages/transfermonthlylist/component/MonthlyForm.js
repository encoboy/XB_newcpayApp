import React, { Component } from 'react';
import { Button,Grid,DatePicker,moment } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const {MonthPicker } = DatePicker;
const today = new Date();
const nowToday = moment(today).format("YYYYMM");
export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        start:nowToday,
        stop:nowToday
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
        start:values.start===nowToday?nowToday:moment(values.start).format('YYYYMM'),
        stop:values.stop===nowToday?nowToday:moment(values.stop).format('YYYYMM')
      };
      this.props.onSubmit(params);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        start:nowToday,
        stop:nowToday
      }
    },()=>{
      this.props.onReset()
    })
  };
  // 月份不可选
  disabledMonth = function(calendarDate) {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const selectYear = calendarDate.year;
    if(selectYear<year){
      return false;
    }
    if(selectYear>year){
      return true;
    }
    return calendarDate.month > month;
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
              <IceFormBinder name="start"  >
                <MonthPicker disabledMonth={this.disabledMonth} locale={{monthPlaceholder:_intl.get('public.start')}}   style={{width:'90%'}}/>
              </IceFormBinder>
              <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="stop">
                <MonthPicker disabledMonth={this.disabledMonth}  locale={{monthPlaceholder:_intl.get('public.stop')}}   style={{width:'90%'}}/>
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

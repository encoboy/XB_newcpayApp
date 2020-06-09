import React, { Component } from 'react';
import { Button,Grid,DatePicker ,moment} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const {RangePicker } = DatePicker;

export default class Form extends Component{
  constructor(props,context) {
    super(props,context);
    this.state = {
      value: {
        date: []
      },
      startValue:null,
      endValue:null,
      endOpen:false
    };
  }

  // 日期选择
  disabledStartDate(startValue) {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate(endValue) {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange(field, value) {
    this.setState({
      [field]: value
    });
  }

  onStartChange(value) {
    this.onChange("startValue", value);
  }

  onEndChange(value) {
    this.onChange("endValue", value);
  }

  handleStartOpenChange(open) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange(open) {
    this.setState({ endOpen: open });
  }
  // 

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  // validateAllFormField = () => {
  //   this.refs.form.validateAll((errors, values) => {
  //     if (errors) {
  //       return;
  //     }
  //     const params = {
  //       start:moment(values.date[0]).format('YYYY-MM-DD'),
  //       stop:moment(values.date[1]).format('YYYY-MM-DD')
  //     };
  //     this.props.onSubmit(params);
  //   });
  // };

  // 新改的日期选择器
  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      const params = {
        start:moment(values.start).format('YYYY-MM-DD'),
        stop:moment(values.stop).format('YYYY-MM-DD')
      };
      this.props.onSubmit(params);
    });
  };

  disabledDate = (calendarDate) => {
    const { year, month, date } = calendarDate;
    const theDate = moment(`${year}-${month + 1}-${date}`, "YYYY-M-D");
  
    return theDate > new Date().getTime();
  };

  handleReset = () => {
    this.setState({
      value:{
        date:[]
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
            <IceFormBinder name="start" required message= {_intl.get('public.required')}>
              <DatePicker locale={{monthPlaceholder:_intl.get('public.start')}}   style={{width:'90%'}} disabledDate={this.disabledDate}/>
            </IceFormBinder>
            <IceFormError name="start" />
            </Col>
            <Col xxs="24" s="4" l="4" style={styles.formItem} >
              <IceFormBinder name="stop" required message= {_intl.get('public.required')}>
                <DatePicker  locale={{monthPlaceholder:_intl.get('public.stop')}}   style={{width:'90%'}} disabledDate={this.disabledDate}/>
              </IceFormBinder>
              <IceFormError name="stop" />
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

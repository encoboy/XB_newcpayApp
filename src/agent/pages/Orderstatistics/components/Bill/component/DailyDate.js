import React, { Component } from 'react';
import { Button,Grid,DatePicker ,moment,Field } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;


export default class DateTime extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dateoneTime:null,
      searchDate1:'',
      searchDate2:'',
      is_today1:false,
      is_today2:false,
      start:'',
      stop:''
    };
    this.field = new Field(this);
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
      const params = {start:this.state.start,stop:this.state.stop}
      this.props.onSubmit(params)
  };
  handleReset = () => {
    this.setState({
      value:{
        
      },
      is_today1:false,
      is_today2:false
    },()=>{
      this.props.onReset()
    })
  };
  onChange1 = (value) => {
    const start = {
        start:value&&moment(value).format('YYYY-MM-DD'),
      };
    this.setState({start:moment(value).format('YYYY-MM-DD'),searchDate1:start,is_today1:true});
  }
  onChange2 = (value) => {
    const stop = {
        stop:value&&moment(value).format('YYYY-MM-DD'),
      };
    this.setState({stop:moment(value).format('YYYY-MM-DD'),searchDate2:stop,is_today2:true});
  }

  // 只能选择今天之前的时间
  disabledDate = (calendarDate) => {
    const { year, month, date } = calendarDate;
    const theDate = moment(`${year}-${month + 1}-${date}`, "YYYY-M-D");
    return theDate > new Date().getTime();
  };
  render(){
    const init = this.field.init;
    const {searchDate1,searchDate2,is_today1,is_today2} = this.state;
    return(
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="16" l="4" style={styles.formItem} >
                <DatePicker  style={{width:'90%'}} disabledDate={this.disabledDate} onChange={this.onChange1}/>
            </Col>
            <Col xxs="24" s="16" l="4" style={styles.formItem} >
                <DatePicker  style={{width:'90%'}} disabledDate={this.disabledDate} onChange={this.onChange2}/>
            </Col>
            <Col xxs="24" s="16" l="16" style={styles.formItem} >
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.search')}
              </Button>
              {/*<Button
                style={{marginLeft:'10px'}}
                size="large"
                type="normal"
                onClick={this.handleReset}
              >
                {_intl.get('public.reset')}
              </Button>*/}
            </Col>
          </Row>
        </div>
    )
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative'
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

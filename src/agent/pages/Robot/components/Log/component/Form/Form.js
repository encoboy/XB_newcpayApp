import React, { Component } from 'react';
import { Button,Grid,DatePicker } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment'

const { Row, Col } = Grid;

export default class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: {
        since: 0,
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
      values.since = moment(values.since).format('YYYY-MM-DD HH:mm:ss');
     this.props.onSubmit(values);
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        since: 0,
      }
    },()=>{
      this.props.onReset()
    })
  };

  disabledDate = function(calendarDate) {
    let current = moment()
      .year(calendarDate.year)
      .month(calendarDate.month)
      .date(calendarDate.date);
    return current.valueOf() > moment().valueOf();
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
              <IceFormBinder name="since" required message= {_intl.get('public.required')}>
                <DatePicker  showTime={true} locale={{datePlaceholder:_intl.get('public.start')}}  
                             style={{width:'90%'}} disabledDate={this.disabledDate}/>
              </IceFormBinder>
              <IceFormError name="since" />
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

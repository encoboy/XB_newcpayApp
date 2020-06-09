import React, { Component } from 'react';
import { Button,Grid ,Select,Input,DatePicker} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment'

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
        // banklist:undefined,
        // brandlist:undefined,
        // statuslist:undefined,
        // numberlist:undefined,
        // start:undefined,
        // stop:undefined,
        start:nowDailyStart,
        stop:nowDailyEnd,
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
        type:'advance',
        brandlist:values.brandlist&&values.brandlist.trim('|'),
        banklist:values.banklist&&values.banklist.join('|'),
        statuslist:values.statuslist&&values.statuslist.join('|'),
        numberlist:values.numberlist&&values.numberlist.trim(),
        datestart:values.start===nowDailyStart?nowDailyStart:moment(values.start).format('YYYYMMDDHHmmss'),
        datestop:values.stop===nowDailyEnd?nowDailyEnd:moment(values.stop).format('YYYYMMDDHHmmss'),
        merchantid:values.merchantid
        // start:this.state.start,
        // stop:this.state.stop
      };
      this.props.onSubmit(params);
      this.props.showTotalAmount();
    });
  };
  handleReset = () => {
    this.setState({
      value:{
        searchtype:'6',
        searchid:'',
        start:nowDailyStart,
        stop:nowDailyEnd,
      }
    },()=>{
      this.props.onReset()
    })
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({start:moment(value).format('YYYYMMDDHHmmss')})
  }
  onChange2 = (value) => {
    this.setState({stop:moment(value).format('YYYYMMDDHHmmss')})
  }
  // 选择今天之前的时间
  disabledDate = (calendarDate) => {
    const { year, month, date } = calendarDate;
    const theDate = moment(`${year}-${month + 1}-${date}`, "YYYY-M-D");

    return theDate > new Date().getTime();
  };
  render(){
    const {bank,status,agentData} = this.props;
    return(
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <div style={styles.formContent}>
          <Row wrap >
            <Col xxs="24" s="8" l="3" style={styles.formItem} >
              <IceFormBinder name="merchantid" >
                <Select  style={{width:'90%'}} placeholder={_intl.get('bill.agent')}>
                  {
                    agentData.map(function (item,index) {
                      return <Select.Option value={item.id} key={index}>{item.username}</Select.Option>
                    })
                  }
                </Select>
              </IceFormBinder>
              {/*<IceFormError name="searchtype" />*/}
            </Col>
            <Col xxs="24" s="8" l="3" style={styles.formItem} >
              <IceFormBinder name="banklist" >
                <Select  style={{width:'90%'}} multiple placeholder={_intl.get('order.bank')}>
                  {
                    bank.map(function (item,index) {
                     return <Select.Option value={item} key={index}>{item.toUpperCase()}</Select.Option>
                    })
                  }
                </Select>
              </IceFormBinder>
              {/*<IceFormError name="searchtype" />*/}
            </Col>
            <Col xxs="24" s="8" l="3" style={styles.formItem} >
              <IceFormBinder name="statuslist" >
                <Select  style={{width:'90%'}} multiple placeholder={_intl.get('order.status')}>
                  {
                    status.map(function (item,index) {
                      return <Select.Option value={item} key={index}>{_intl.get(`status.${item}`)}</Select.Option>
                    })
                  }
                </Select>
              </IceFormBinder>
              {/*<IceFormError name="searchtype" />*/}
            </Col>
            <Col xxs="24" s="8" l="3" style={styles.formItem} >
              <IceFormBinder name="numberlist" >
                <Input style={{width:'90%'}} placeholder={_intl.get('order.account')}/>
              </IceFormBinder>
              {/*<IceFormError name="searchtype" />*/}
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
            <Col xxs="24" s="24" l="4" style={styles.formItem} >
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

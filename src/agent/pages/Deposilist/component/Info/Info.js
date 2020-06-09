import React, { Component } from 'react';
import { Button,Dialog,Feedback,Input } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Updateinfo from './Updateinfo';
import './info.scss'

const Toast = Feedback.toast;

export default class Info extends Component {
  static displayName = 'Info';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      infodata:[]
    };
    show:null
  }
  componentDidMount(){
    // console.log(this.props.depositid)
    // console.log(this.props.detaildata)
    this.showDetails();
  }
  // 存款详情
  showDetails = () => {
    _fetch({
        url:'/Merchant/Userdeposit',
        data:{
            method:'depositdetail',
            depositid:this.props.depositid
        },
        success:(data)=>{
            console.log(data);
            this.setState({
              infodata:data.data
            })
        }
    })
  }


  render() {
    const {data,infodata} = this.state;
    const {goback,depositid} = this.props;
    return (
      <div className="userinfo">
       <IceContainer>
        <div style={{marginBottom:'20px'}}>
          <span>{_intl.get('myfinance.detial')}</span>
          <Button type='normal' shape='text' style={styles.floatRight}
            onClick={goback}>{_intl.get('myfinance.goback')}</Button>
        </div>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.amount')}</div>
              <div style={styles.detailBody}>{infodata.amount}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.status')}</div>
              <div style={styles.detailBody}>{infodata.status&&_intl.get(`order.${infodata.status}`)}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.thirdpartyid')}</div>
              <div style={styles.detailBody}>{infodata.thirdpartyid}</div>
           </li>
           <li style={styles.detailItem}>
           <div style={styles.detailTitle}>{_intl.get('order.to_account')}</div>
           <div style={styles.detailBody}>{infodata.to_account}</div>
            </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('order.to_bank')}</div>
            <div style={styles.detailBody}>{infodata.to_bank&&infodata.to_bank.toUpperCase()}</div>
             </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('order.to_holder')}</div>
            <div style={styles.detailBody}>{infodata.to_holder}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.userid')}</div>
              <div style={styles.detailBody}>{infodata.userid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.rightMove}>
                <Updateinfo depositid={depositid} showDetails={this.showDetails}/>
              </div>
            </li>
            </ul>
        </IceContainer>
      </div>
    );
  }
}


const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
    wordBreak: 'break-all'
  },
  statusProcessing: {
    color: '#64D874',
  },
  btnRight:{
    marginLeft:'15px'
  },
  floatRight:{
    float:'right'
  },
  rightMove:{
    marginLeft:'65px'
  },
};

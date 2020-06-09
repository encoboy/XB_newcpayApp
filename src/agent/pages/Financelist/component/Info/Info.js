import React, { Component } from 'react';
import { Button,Dialog,Feedback } from '@icedesign/base';
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
  }
  componentDidMount(){
    this.showDetails();
  }

  showDetails = () => {
    _fetch({
        url:'/Merchant/Agentaccount',
        data:{
            method:'accountdetail',
            ledgerid:this.props.detaildata.id
        },
        success:(data)=>{
            console.log('accountdetail',data);
            this.setState({
              infodata:data.data
            })
        }
    })
  }

  yesDel = () => {
    const {infodata} = this.state;
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
          _fetch({
            url:'/Merchant/Agentaccount',
            data:{
              method:'delaccount',
              accountid:infodata.id
            },
            success:(data)=>{
                console.log('delaccount',data);
                Toast.success(_intl.get('myfinance.delsuccess'));
                this.props.goback();
            }
          })

    
      }
    });
  }


  render() {
    const {data,infodata} = this.state;
    const {goback,detaildata} = this.props;
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
              <div style={styles.detailTitle}>{_intl.get('myfinance.id')}</div>
              <div style={styles.detailBody}>{infodata.id}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('myfinance.financename')}</div>
              <div style={styles.detailBody}>{infodata.name&&infodata.name.toUpperCase()}</div>
           </li>
           <li style={styles.detailItem}>
           <div style={styles.detailTitle}>{_intl.get('myfinance.type')}</div>
           <div style={styles.detailBody}>{infodata.type&&infodata.type.toUpperCase()}</div>
            </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('myfinance.balance')}</div>
            <div style={styles.detailBody}>{infodata.balance}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('myfinance.statu')}</div>
              <div style={styles.detailBody}>{infodata.status?_intl.get('myfinance.start'):_intl.get('myfinance.stop')}</div>
            </li>

            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('myfinance.financedes')}</div>
              <div style={styles.detailBody}>{infodata.description}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('myfinance.created')}</div>
              <div style={styles.detailBody}>{/*new Date(infodata.created*1000).toLocaleString('chinese',{hour12:false})*/}{infodata.created}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('myfinance.updated')}</div>
              <div style={styles.detailBody}>{/*new Date(infodata.updated*1000).toLocaleString('chinese',{hour12:false})*/}{infodata.updated}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.rightMove}>
                <Updateinfo infodata={infodata} detaildata={detaildata}  showDetails={this.showDetails}/>
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.rightMove}>
                <Button type="normal" shape="warning" onClick={this.yesDel}>
                  {_intl.get('public.delete')}
                </Button>
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

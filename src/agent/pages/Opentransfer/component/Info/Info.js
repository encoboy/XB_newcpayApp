import React, { Component } from 'react';
import { Button,Dialog,Feedback,Input,Field,Radio,Form } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Addfinancerunwater from './Addfinancerunwater';
import './info.scss';
import {connect} from 'react-redux'
import {hasAction} from '../../../../util';
import Approve from './Dialog/Approve';
import Decline from './Dialog/Decline';

const Toast = Feedback.toast;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

class Info extends Component {
  static displayName = 'Info';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      is_show:true,
      infodata:[],
      logo:null,
      imgname:null
    };
    this.field = new Field(this)
  }
  componentDidMount(){
    console.log(this.props);
    this.showDetails();
    if(!this.props.detaildata.pending_amount){
      this.setState({
        is_show:false
      })
    }
  }




  yesandno = (status) => {
    Dialog.confirm({

      content: _intl.get('public.sure'),
      onOk:() => {
        _fetch({
          url:'/Merchant/Usertransfer',
          data:{
            transferid:this.props.detailid,
            method:'updatetransfer',
            status:status
          },
          success:(data)=>{
            console.log(data);
            Toast.success(_intl.get('myfinance.actionsuccess'));
            this.props.goback();
          }
        });
    }
    });
  }

  showDetails = (id) => {
    console.log(id);
    _fetch({
        url:'/Merchant/Usertransfer',
        data:{
            method:'transferdetail',
            transferid:this.props.detailid?this.props.detailid:id
        },
        success:(data)=>{
            console.log(data);
            this.setState({
              infodata:data.data,
              is_show:data.data.pending_amount?true:false
            })
        }
    })
  }

  render() {
    const {data,infodata,is_show} = this.state;
    const {goback,detailid,showDetails,type,detaildata,btn} = this.props;
    const init = this.field.init;
    return (
      <div className="userinfo">
       <IceContainer>
        <div style={{marginBottom:'20px'}}>
          <span>{_intl.get('myfinance.detial')}</span>&nbsp;&nbsp;&nbsp;
          <Button type='normal' shape='text' style={styles.floatRight}
            onClick={goback}>{_intl.get('myfinance.goback')}</Button>
        </div>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('waitetransfer.userid')}</div>
              <div style={styles.detailBody}>{infodata.userid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('waitetransfer.amount')}</div>
              <div style={styles.detailBody}>{infodata.amount}</div>
           </li>
           <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('transfer.extra')}</div>
            <div style={styles.detailBody}>{detaildata.extra}</div>
           </li>
           <li style={styles.detailItem}>
           <div style={styles.detailTitle}>{_intl.get('waitetransfer.bank')}</div>
           <div style={styles.detailBody}>{detaildata.to_bank&&detaildata.to_bank.toUpperCase()}</div>
            </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('waitetransfer.thirdpartyid')}</div>
            <div style={styles.detailBody}>{infodata.thirdpartyid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('waitetransfer.status')}</div>
              <div style={styles.detailBody}>{infodata.status&&infodata.status.toUpperCase()}</div>
            </li>

            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('waitetransfer.account')}</div>
              <div style={styles.detailBody}>{infodata.to_account}</div>
            </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>
              <span style={{color:'red'}}>{_intl.get('waitetransfer.pending_amount')}</span>
            </div>
            <div style={styles.detailBody}><span style={{color:'red'}}>{infodata.pending_amount}</span></div>
            </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}><span style={{color:'red'}}>{_intl.get('waitetransfer.processed_amount')}</span></div>
            <div style={styles.detailBody}><span style={{color:'red'}}>{infodata.processed_amount}</span></div>
            </li>
                 
            {is_show&&<li style={styles.detailItem}>
              <div style={styles.rightMove}>
                <Addfinancerunwater 
                  detaildata={detaildata} 
                  showDetails={this.showDetails} 
                  detailid={detailid}
                  type={type}
                  history={this.props.history}/>
              </div>
              </li>}

            <li style={styles.detailItem}>
              <div style={styles.rightMove}>
              {/*hasAction(btn,'Amend_transferok')&&<Button type="primary"  onClick={()=>{this.yesandno('verified')}}>{_intl.get('waitetransfer.ok')}</Button>*/}
              {hasAction(btn,'Approve_Transfer')&&<Approve detailid={detailid} goback={goback}/>}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/*hasAction(btn,'Amend_transferno')&&<Button type="secondary" onClick={()=>{this.yesandno('reject')}}>{_intl.get('waitetransfer.no')}</Button>*/}
              {hasAction(btn,'Reject_Transfer')&&<Decline detailid={detailid} goback={goback}/>}
              </div>
            </li>
            </ul>
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStateToProp)(Info);


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
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  inlineBlock:{
    display:'inline',
  },
  rightMove:{
    marginLeft:'65px'
  },
};

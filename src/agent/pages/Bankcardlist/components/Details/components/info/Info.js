import React, { Component } from 'react';
import { Button,Dialog,Feedback,Input } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import UpdateInfo from './components/SimpleFormDialog'
import sha1 from 'sha1'
import './info.scss'

const Toast = Feedback.toast;

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
  }
  componentDidMount(){
    this.getInfo();
  }
  getInfo = () => {
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'userdetail',
        userid:this.props.id
      },
      success:(data)=>{
        this.setState({
          data:data.data
        })
      }
    })
  };

  resetTranpass = () => {
    Dialog.confirm({
      title:_intl.get('public.tranpass'),
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/Merchant/User',
          data:{
            method:'resettranpass',
            userid:this.props.id
          },
          success:()=>{
            Toast.success(_intl.get('public.success'))
          }
        })
      }
    });

  };
  render() {
    const {data} = this.state;
    const {id,username} = this.props;
    return (
      <div className="userinfo">
        <IceContainer title={_intl.get('profile.basic')}>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.nickname')}：</div>
              <div style={styles.detailBody}>{data.nickname&&data.nickname.toUpperCase()}</div>
            </li>
            {/*<li style={styles.detailItem}>*/}
              {/*<div style={styles.detailTitle}>{_intl.get('profile.country')}：</div>*/}
              {/*<div style={styles.detailBody}>{data.country}</div>*/}
            {/*</li>*/}
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.tel')}：</div>
              <div style={styles.detailBody}>{data.tel}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.lang')}：</div>
              <div style={styles.detailBody}>{data.lang==='zh-CN'?'中文':'English'}</div>
            </li>
          </ul>
        </IceContainer>
        <IceContainer title={_intl.get('profile.safe')}>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.email')}：</div>
              <div style={styles.detailBody}>{data.email}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.mobile')}：</div>
              <div style={styles.detailBody}>{data.mobile}</div>
            </li>
          </ul>
        </IceContainer>
        <IceContainer title={_intl.get('profile.api')}>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.pg_redirect_url')}：</div>
              <div style={styles.detailBody}>{data.pg_redirect_url}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.pg_callback_url')}：</div>
              <div style={styles.detailBody}>{data.pg_callback_url}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.apiKey')}：</div>
              <div style={styles.detailBody}>{data.api_key}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('profile.apiSecret')}：</div>
              <div style={styles.detailBody}>{data.api_secret}</div>
            </li>
          </ul>
        </IceContainer>
        <IceContainer title={_intl.get('public.action')}>
            <UpdateInfo userid={id}  username={username} />
            {/*<Button type='primary' style={{marginRight:'5px'}}  onClick={this.updatePassword}>{_intl.get('merchantlist.password')}</Button>*/}
            <Button type='primary' shape='warning' onClick={this.resetTranpass}>{_intl.get('public.tranpass')}</Button>
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
  }
};

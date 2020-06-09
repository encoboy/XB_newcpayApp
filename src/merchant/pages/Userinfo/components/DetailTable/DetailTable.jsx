import React, { Component } from 'react';
import { Card } from '@icedesign/base';
import UpdateInfo from '../SimpleFormDialog'
import { connect } from 'react-redux'
import {hasAction} from '../../../../util';

 class DetailTable extends Component {
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
      url:'/User/Profile',
      data:{
        method:'userinfo'
      },
      success:(data)=>{
        this.setState({
          data:data.data
        })
      }
    })
  };
  render() {
    const {data} = this.state;
    const {btn} = this.props;
    return (
      <div className="userinfo">
        <Card
          titleBottomLine={false}
          style={{ width: '100%' }}
          bodyHeight='auto'
          title={_intl.get('profile.basic')}
          subTitle={
            hasAction(btn,'Updateinfo_base')&&
            <UpdateInfo
              type='base'
              data={{
                nickname:data.nickname,
                country:data.country,
                tel:data.tel,
                lang:data.lang
              }
              }
              onOk={this.getInfo}
            />
          }
        >
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
              <div style={styles.detailBody}>{data.lang?data.lang==='zh-CN'?'中文':'English':''}</div>
            </li>
          </ul>
        </Card>
        <Card
          titleBottomLine={false}
          style={{ width: '100%' }}
          bodyHeight='auto'
          title={_intl.get('profile.safe')}
          subTitle={
            hasAction(btn,'UPdateinfo_secure')&&
            <UpdateInfo
              type='secure'
              data={{
                email:data.email,
                mobile:data.mobile,
              }
              }
              onOk={this.getInfo}
            />
          }
        >
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
        </Card>
        <Card
          titleBottomLine={false}
          style={{ width: '100%' }}
          bodyHeight='auto'
          title={_intl.get('profile.api')}
          subTitle={
            hasAction(btn,'UPdateinfo_api')&&
            <UpdateInfo
              type='api'
              data={{
                pg_redirect_url:data.pg_redirect_url,
                pg_callback_url:data.pg_callback_url,
                secret:false
              }
              }
              onOk={this.getInfo}
            />
          }
        >
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
        </Card>
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

function mapStateToProps(state){
  return {
    btn: state.operation.btn,
    language:state.language,
  }
}

export default connect(mapStateToProps)(DetailTable)

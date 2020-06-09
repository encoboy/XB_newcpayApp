import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {Button,Feedback} from '@icedesign/base';
import {hasAction} from '../../../../util';
import {connect} from 'react-redux';

const Toast = Feedback.toast;

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
    this.getData()
  }
  getData = () => {
    const {id} = this.props;
    _fetch({
      url:'/Merchant/Robot',
      data:{
        method:'getrobotdetail',
        id
      },
      success:(data)=>{
        this.setState({
          data:data.data,
        })
      }
    })
  };
  doRobot = (opera) => {
    const {id} = this.props;
    _fetch({
      url:'/Merchant/Robot',
      data:{
        method:'operabot',
        opera,
        robotid:id
      },
      success:()=>{
        Toast.success(_intl.get('public.success'));
        this.getData()
      }
    })
  };
  render() {
    const {data} = this.state;
    const {btn} = this.props;
    return (
      <div className="detail-table">
        <IceContainer >
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.id')}：</div>
              <div style={styles.detailBody}>{data.id}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.type')}：</div>
              <div style={styles.detailBody}>{_intl.get(`robot.${data.type}`)}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.serverid')}：</div>
              <div style={styles.detailBody}>{data.serverid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.name')}：</div>
              <div style={styles.detailBody}>{data.name}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.accountid')}：</div>
              <div style={styles.detailBody}>{data.accountid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.status')}：</div>
              <div style={styles.detailBody}>{data.status}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.taskcount')}：</div>
              <div style={styles.detailBody}>{data.taskcount}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.ip')}：</div>
              <div style={styles.detailBody}>{data.ip}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.port')}：</div>
              <div style={styles.detailBody}>{data.port}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.publicip')}：</div>
              <div style={styles.detailBody}>{data.publicip}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.publicport')}：</div>
              <div style={styles.detailBody}>{data.publicport}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('robot.extend')}：</div>
              <div style={styles.detailBody}>{data.extend}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.created')}：</div>
              <div style={styles.detailBody}>{/*new Date(data.created*1000).toLocaleString('chinese',{hour12:false})*/}
                {data.created}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.updated')}：</div>
              <div style={styles.detailBody}>{/*new Date(data.updated*1000).toLocaleString('chinese',{hour12:false})*/}
              {data.updated}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.action')}：</div>
              <div style={styles.detailBody}>
                {hasAction(btn,'Robot_operabot_restart')&&<Button type="primary" onClick={()=>this.doRobot('restart')}>{_intl.get('robot.restart')}</Button>} &nbsp;&nbsp;
                {hasAction(btn,'Robot_operabot_start')&&<Button type="secondary" onClick={()=>this.doRobot('start')}>{_intl.get('robot.start')}</Button> }&nbsp;&nbsp;
                {hasAction(btn,'Robot_operabot_stop')&&<Button type="normal" shape="warning" onClick={()=>this.doRobot('stop')}>{_intl.get('robot.stop')}</Button>}
              </div>
            </li>
          </ul>
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
}

export default connect(mapStateToProps)(DetailTable);

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
};

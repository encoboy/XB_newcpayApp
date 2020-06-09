import React, { Component } from 'react';
import { Card ,Button,Feedback,Dialog,Switch} from "@icedesign/base";
import EditDiaLog from '../EditDialog/EditDialog'
import RobotLog from '../RobotLog/RobotLog'

const Toast = Feedback.toast;

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      provider_date:null,
      provider:null
    };
  }
  componentDidMount(){
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/Manager/BankAccount',
      data:{
        method:'getaccountinfo',
        accountid :this.props.id
      },
      success:(data)=>{
        this.setState({
          data:data.data,
          provider_date:data.data.access.provider_date,
          provider:data.data.access.provider
        })
      }
    })
  };
  deleteAccount=()=>{
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/Manager/BankAccount',
          data:{
            method:'deleteaccount',
            accountid :this.props.id,
            merchantid:this.state.data.merchantid
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
           this.props.goBack()
          }
        })
      }
    });
  };
  doRobot = (action ) => {
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/Manager/BankAccount',
          data:{
            method:'operatebot',
            accountid :this.props.id,
            merchantid:this.state.data.merchantid,
            action
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
            this.getData();
          }
        })
      }
    });
  };
  updateAccount = (field,value) => {
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/Manager/BankAccount',
          data:{
            method:'updateaccount',
            accountid :this.props.id,
            merchantid:this.state.data.merchantid,
            field,
            value
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
            this.getData();
          }
        })
      }
    });

  };
  render() {
    const {data,provider_date,provider} = this.state;
    return (
      <div className="detail-table">
        <Card title={_intl.get('public.detail')} titlePrefixLine={false} titleBottomLine={false} bodyHeight='auto'  style={{ width: '100%',boxShadow:'none' }} extra={ <Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.id')}：</div>
              <div style={styles.detailBody}>{data.id}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.type')}：</div>
              <div style={styles.detailBody}>
                {_intl.get(`bank.${data.type}`)}
                <EditDiaLog
                  field='type'
                  record={{ accountid :this.props.id,type:data.type}}
                  merchantid={data.merchantid}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.account')}：</div>
              <div style={styles.detailBody}>{data.bank&&data.bank.toUpperCase()} {data.number}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.otp')}：</div>
              <div style={styles.detailBody}>
                {data.otptype===1?_intl.get('bank.token'):_intl.get('bank.sms')}
                <EditDiaLog
                  field='otptype'
                  merchantid={data.merchantid}
                  record={{ accountid :this.props.id,otptype:data.otptype}}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.robotid')}：</div>
              <div style={styles.detailBody}>
                {data.robotid?data.robotid:''}
                {!!data.robotid&&<RobotLog id={data.robotid}/>}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.accessid')}：</div>
              <div style={styles.detailBody}>
                {data.access&&data.access.id}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.username')}：</div>
              <div style={styles.detailBody}>
                {data.access&&data.access.name}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.phone')}：</div>
              <div style={styles.detailBody}>
                {data.access&&data.access.phone}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.current_balance')}：</div>
              <div style={styles.detailBody}>
                {data.current_balance}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.available_balance')}：</div>
              <div style={styles.detailBody}>
                {data.available_balance}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.genre')}：</div>
              <div style={styles.detailBody}>
                {_intl.get(`bank.${data.genre}`)}
                <EditDiaLog
                  field='genre'
                  merchantid={data.merchantid}
                  record={{ accountid :this.props.id,genre:data.genre}}
                  onOk={this.getData}
                />
              </div>
            </li>
            {/*<li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.config')}：</div>
              <div style={styles.detailBody}>
                {data.task_config}
                <EditDiaLog
                  field='task_config'
                  merchantid={data.merchantid}
                  record={{ accountid :this.props.id,task_config:data.task_config}}
                  onOk={this.getData}
                />
              </div>
    </li>*/}
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.hastime')}：</div>
              <div style={styles.detailBody}>
                {data.hastime}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.limit_transfer')}：</div>
              <div style={styles.detailBody}>
                {data.limit_transfer}
                <EditDiaLog
                  field='limit_transfer'
                  merchantid={data.merchantid}
                  record={{ accountid :this.props.id,limit_transfer:data.limit_transfer}}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.limit_times')}：</div>
              <div style={styles.detailBody}>
                {data.limit_times}
                <EditDiaLog
                  field='limit_times'
                  merchantid={data.merchantid}
                  record={{ accountid :this.props.id,limit_times:data.limit_times}}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.cur_transfer')}：</div>
              <div style={styles.detailBody}>
                {data.cur_transfer}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.cur_times')}：</div>
              <div style={styles.detailBody}>
                {data.cur_times}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.status')}：</div>
              <div style={styles.detailBody}>
                <Switch checked={data.status===1} onChange={()=>this.updateAccount('status',data.status===1?'suspend':'active')}/>
                {/*{data.status}*/}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.task_status')}：</div>
              <div style={styles.detailBody}>
                <Switch checked={data.task_status===1} onChange={()=>this.updateAccount('task_status',data.task_status===1?'suspend':'active')}/>
                {/*{data.task_status}*/}
              </div>
            </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('bank.provider')}：</div>
            <div style={styles.detailBody}>
              {provider}
            </div>
           </li>
            <li style={styles.detailItem}>
            <div style={styles.detailTitle}>{_intl.get('bank.provider_date')}：</div>
            <div style={styles.detailBody}>
              {new Date(provider_date*1000).toLocaleString('chinese',{hour12:false})}
            </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.created')}：</div>
              <div style={styles.amount}>
                {new Date(data.created*1000).toLocaleString('chinese',{hour12:false})}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.updated')}：</div>
              <div style={styles.amount}>
                {new Date(data.updated*1000).toLocaleString('chinese',{hour12:false})}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.action')}：</div>
              <div style={styles.amount}>
                <Button type='primary' onClick={()=>this.doRobot('restart')}>{_intl.get('robot.restart')}</Button>
                <Button type='secondary' style={{margin:'0 5px'}} onClick={()=>this.doRobot('bind')}>{_intl.get('robot.bind')}</Button>
                <Button type='normal' shape='warning' onClick={()=>this.doRobot('unbind')}>{_intl.get('robot.unbind')}</Button>
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.action')}：</div>
              <div style={styles.amount}>
                  <Button type='normal' shape='warning' onClick={this.deleteAccount}>{_intl.get('public.delete')}</Button>
              </div>
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
};

import React, { Component } from 'react';
import { Card,Button } from "@icedesign/base";
import ChangeStatus from './components/ChangeStatus'
import DoWithdraw from './components/DoWithdraw'

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {data:{}};
  }
  componentDidMount(){
    console.log(this.props.history);
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/merchant/Userwithdraw',
      data:{
        method:'getwithdrawdetail',
        withdrawid:this.props.id
      },
      success:(data)=>{
        this.setState({
          data:data.data,
        })
      }
    })
  };

  render() {
    const {data} = this.state;
    const status = ['pending','processing'];
    return (
      <div className="detail-table">
        <Card
          style={{ width: '100%',boxShadow:'none' }}
          title={_intl.get('public.detail')}
          extra={<Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}
          bodyHeight='auto'
          titleBottomLine={false}
          // language="en-us"
        >
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.id')}：</div>
              <div style={styles.detailBody}>{data.id}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.type')}：</div>
              <div style={styles.detailBody}>{data.type}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.status')}：</div>
              <div style={styles.detailBody}>
                {data.status}
                {
                  status.indexOf(data.status)!==-1&&
                  <ChangeStatus data={{id:data.id,status:data.status}} onOk={this.getData}/>
                }

              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.walletid')}：</div>
              <div style={styles.detailBody}>{data.walletid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.wallettrxid')}：</div>
              <div style={styles.detailBody}>{data.wallettrxid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.holder')}：</div>
              <div style={styles.detailBody}>{data.holder}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.account')}：</div>
              <div style={styles.detailBody}>{data.bank} {data.account}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.amount')}：</div>
              <div style={styles.detailBody}>{data.amount}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.rejected')}：</div>
              <div style={styles.detailBody}>{data.rejected}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.rejectby')}：</div>
              <div style={styles.detailBody}>{data.rejectby}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.approved')}：</div>
              <div style={styles.detailBody}>{data.approved}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.approveby')}：</div>
              <div style={styles.detailBody}>{data.approveby}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('withdraw.comment')}：</div>
              <div style={styles.detailBody}>{data.comment}</div>
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
            {
              data.status === 'pending'&&
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>{_intl.get('public.action')}：</div>
                <div style={styles.detailBody}>
                  <DoWithdraw id={data.id} onOk={this.getData}/>
                </div>
              </li>
            }
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
  },
  statusProcessing: {
    color: '#64D874',
  },
};

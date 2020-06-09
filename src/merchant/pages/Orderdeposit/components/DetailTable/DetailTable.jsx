import React, { Component } from 'react';
import { Card ,Button,Feedback,Dialog} from "@icedesign/base";

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
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/User/Order',
      data:{
        method:'orderdetail',
        orderid:this.props.id
      },
      success:(data)=>{
        this.setState({
          data:data.data,
        })
      }
    })
  };
  callBack=(orderid)=>{
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/User/Order',
          data:{
            method:'merchantcallback',
            orderid
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
            this.getData()
          }
        })
      }
    });

  };
  setStatus = (type='normal',status,orderid)=>{
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/User/Order',
          data:{
            method:'setstatus',
            type,status,orderid
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
            this.getData()
          }
        })
      }
    });
  };
  render() {
    const {data} = this.state;
    return (
      <div className="detail-table">
        <Card title={_intl.get('public.detail')} titlePrefixLine={false} titleBottomLine={false} bodyHeight='auto'  style={{ width: '100%',boxShadow:'none' }} extra={ <Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.id')}：</div>
              <div style={styles.detailBody}>{data.id}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.thirdpartyid')}：</div>
              <div style={styles.detailBody}>{data.thirdpartyid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.robotid')}：</div>
              <div style={styles.detailBody}>{data.robotid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.type')}：</div>
              <div style={styles.detailBody}>{_intl.get(`order.${data.type}`)}</div>
            </li>
            {/*<li style={styles.detailItem}>*/}
              {/*<div style={styles.detailTitle}>{_intl.get('order.brand')}：</div>*/}
              {/*<div style={styles.detailBody}>*/}
                {/*{data.brand}*/}
              {/*</div>*/}
            {/*</li>*/}
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.code')}：</div>
              <div style={styles.detailBody}>
                {data.code} {_intl.get(`code.${data.code}`)}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.status')}：</div>
              <div style={styles.detailBody}>
                {_intl.get(`status.${data.status}`)}
                {/*{*/}
                  {/*data.status==='pendingverified'&&*/}
                  {/*<Button style={{marginLeft:'5px'}} type='primary' onClick={()=>this.setStatus('normal','verified',data.id)}>{_intl.get('order.setVerified')}</Button>*/}
                {/*}*/}
                {/*{*/}
                  {/*data.status==='verified'&&*/}
                  {/*<Button style={{marginLeft:'5px'}} type='primary' onClick={()=>this.setStatus('normal','done',data.id)}>{_intl.get('order.setDone')}</Button>*/}
                {/*}*/}
                {/*{*/}
                  {/*data.status==='pending'&&*/}
                  {/*<Button style={{marginLeft:'5px'}} type='normal' shape='warning' onClick={()=>this.setStatus('normal','fail',data.id)}>{_intl.get('order.setFail')}</Button>*/}
                {/*}*/}
                {/*{*/}
                  {/*data.status==='error'&&*/}
                    {/*<span>*/}
                       {/*<Button style={{marginLeft:'5px'}}  type='normal' shape='warning' onClick={()=>this.setStatus('normal','fail',data.id)}>{_intl.get('order.setFail')}</Button>*/}
                       {/*<Button style={{marginLeft:'5px'}} type='primary' onClick={()=>this.setStatus('normal','verified',data.id)}>{_intl.get('order.setVerified')}</Button>*/}
                    {/*</span>*/}
                {/*}*/}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.index')}：</div>
              <div style={styles.detailBody}>
                {data.index}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.amount')}：</div>
              <div style={styles.amount}>
                {data.amount}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.from_account')}：</div>
              <div style={styles.amount}>
                {data.from_bank&&data.from_bank.toUpperCase()} {data.from_account}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.to_account')}：</div>
              <div style={styles.amount}>
                {data.to_bank&&data.to_bank.toUpperCase()} {data.to_account}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.to_holder')}：</div>
              <div style={styles.amount}>
                {data.to_holder}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('order.check_holder')}：</div>
              <div style={styles.amount}>
                {data.check_holder}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.created')}：</div>
              <div style={styles.amount}>
                {data.created}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.updated')}：</div>
              <div style={styles.amount}>
                {data.updated}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.action')}：</div>
              <div style={styles.amount}>
                  <Button type='primary' onClick={()=>this.callBack(data.id)}>{_intl.get('order.callback')}</Button>
                {/*{*/}
                  {/*data.status==='fail'&&*/}
                  {/*<Button style={{marginLeft:'5px'}} type='primary' onClick={()=>this.setStatus('force','verified',data.id)}>{_intl.get('order.forcesetVerified')}</Button>*/}
                {/*}*/}
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
  },
  statusProcessing: {
    color: '#64D874',
  },
};

import React, { Component } from 'react';
import { Card ,Button,Feedback,Dialog,Icon} from "@icedesign/base";
import EditDialog from '../EditDialog/EditDialog'

const Toast = Feedback.toast;

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      saq:[]
    };
  }
  componentDidMount(){
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/Manager/Bankaccess',
      data:{
        method:'getaccess',
        accessid:this.props.id
      },
      success:(data)=>{
        this.setState({
          data:data.data,
          saq:data.data.answer?JSON.parse(data.data.answer):[]
        })
      }
    })
  };
  deleteAccess=()=>{
    Dialog.confirm({
      content: _intl.get('public.sure'),
      onOk:()=>{
        _fetch({
          url:'/Manager/Bankaccess',
          data:{
            method:'deleteaccess',
            accessid:this.props.id,
            merchantid:this.state.data.merchantid,
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
            this.props.goBack();
          }
        })
      }
    });

  };

  render() {
    const {data,saq} = this.state;
    return (
      <div className="detail-table">
        <Card title={_intl.get('public.detail')} titlePrefixLine={false} titleBottomLine={false} bodyHeight='auto'  style={{ width: '100%',boxShadow:'none' }} extra={ <Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}>
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.accessid')}：</div>
              <div style={styles.detailBody}>{data.id}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.bank')}：</div>
              <div style={styles.detailBody}>{data.bank&&data.bank.toUpperCase()}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.companyid')}：</div>
              <div style={styles.detailBody}>
                {data.companyid}
                <EditDialog
                  field='companyid'
                  record={{
                    accessid:data.id,
                    companyid:data.companyid
                  }}
                  merchantid={data.merchantid}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.password')}：</div>
              <div style={styles.detailBody}>
                {data.password}
                <EditDialog
                  field='password'
                  record={{
                    accessid:data.id,
                    password:data.password,
                  }}
                  merchantid={data.merchantid}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.status')}：</div>
              <div style={styles.detailBody}>
                {data.status}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.username')}：</div>
              <div style={styles.detailBody}>
                {data.name}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                {_intl.get('bank.phone')}：</div>
              <div style={styles.detailBody}>
                {data.phone}
                <EditDialog
                  field='phone'
                  record={{
                    accessid:data.id,
                    phone:data.phone,
                  }}
                  merchantid={data.merchantid}
                  onOk={this.getData}
                />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('bank.saq')}：</div>
              <div style={styles.detailBody}>
                {
                  saq.map(function (item,index) {
                    return (
                      <div key={index}>
                        <p>
                          <Icon type="help" />
                          {_intl.get('bank.question')}{index+1}：
                          {item.question}
                        </p>
                        <p>
                          {_intl.get('bank.answer')}：
                          {item.answer}
                        </p>
                      </div>
                    )
                  })
                }
                <div>
                  <EditDialog
                    field='saq'
                    record={{
                      accessid:data.id,
                      saq:saq
                    }}
                    merchantid={data.merchantid}
                    onOk={this.getData}
                  />
                </div>
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.created')}：</div>
              <div style={styles.amount}>
                {/*new Date(data.created*1000).toLocaleString('chinese',{hour12:false})*/}
                {data.created}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.updated')}：</div>
              <div style={styles.amount}>
                {/*new Date(data.updated*1000).toLocaleString('chinese',{hour12:false})*/}
                {data.updated}
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>{_intl.get('public.action')}：</div>
              <div style={styles.amount}>
                  <Button type='normal' shape='warning' onClick={()=>this.deleteAccess()}>{_intl.get('public.delete')}</Button>
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

import React, { Component } from 'react';
import { Card,Grid } from '@icedesign/base';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    ;
  }
  componentDidMount(){
   this.getInfo();
  }
  getInfo = () => {
    _fetch({
      url:'/User/Userreport',
      data:{
        method:'getreport',
        type:'today',
      },
      success:(data)=>{
        this.setState({
          data: data.data
        })
      }
    })
  };
  render() {
    const {data} = this.state;
    return (
      <div className="detail-table">
        <IceContainer>
          <Row gutter="20" wrap style={styles.containerContent}>
            {
              data.length>0?
                data.map(function (item,index) {
                  return(
                    <Col xxs="24" s={data.length>1?12:24} key={index}>
                      <IceContainer title={item.reportdate}>
                        <ul style={styles.detailTable}>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.order_deposit_all')}：</div>
                            <div style={styles.detailBody}>{item.order_deposit_all}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.order_deposit_all_times')}：</div>
                            <div style={styles.detailBody}>{item.order_deposit_all_times}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.order_withdraw_all')}：</div>
                            <div style={styles.detailBody}>{item.order_withdraw_all}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.order_withdraw_all_times')}：</div>
                            <div style={styles.detailBody}>{item.order_withdraw_all_times}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.wallet_deposit_amt')}：</div>
                            <div style={styles.detailBody}>{item.wallet_deposit_amt}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.wallet_deposit_fee')}：</div>
                            <div style={styles.detailBody}>{item.wallet_deposit_fee}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.wallet_transfer_all')}：</div>
                            <div style={styles.detailBody}>{item.wallet_transfer_all}</div>
                          </li>
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('bill.wallet_transfer_fee')}：</div>
                            <div style={styles.detailBody}>{item.wallet_transfer_fee}</div>
                          </li>
                          {/*<li style={styles.detailItem}>*/}
                            {/*<div style={styles.detailTitle}>{_intl.get('public.created')}：</div>*/}
                            {/*<div style={styles.detailBody}>{ new Date(item.created*1000).toLocaleString('chinese',{hour12:false})}</div>*/}
                          {/*</li>*/}
                          <li style={styles.detailItem}>
                            <div style={styles.detailTitle}>{_intl.get('public.updated')}：</div>
                            <div style={styles.detailBody}>{ item.updated}</div>
                          </li>
                        </ul>
                      </IceContainer>
                    </Col>
                  )
                }):
                <Col>
                  <Card titleBottomLine={false}  style={{ width: '100%',boxShadow:'none' }} bodyHeight='auto'>
                    <div style={styles.textCenter}>{_intl.get('public.null')}</div>
                  </Card>
                </Col>

            }
          </Row>
        </IceContainer>

      </div>
    );
  }
}


const styles = {
  containerContent: {
    width: '100%',
    margin:0
  },
  textCenter:{
    textAlign:'center',
    color:'#999'
  },
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

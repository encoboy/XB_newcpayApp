import React, { Component } from 'react';
import { Table ,Pagination} from '@icedesign/base';
import Details from '../../../../Order/components/DetailTable';
import {connect} from 'react-redux';
import {hasAction} from '../../../../../util';

class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      id:'',
      show:false,
      pagination:{
        current:1,
        pageSize:20,
        total:0
      }
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/MerchantWalletTrx',
      data:{
        method:'getwallettrx',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          pagination
        })
      }
    })
  };
  handleChange = (current) =>{
    const {pagination} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      this.getCards()
    })
  };
  showDetails = (id) => {
    this.setState({
      id,
      show:true
    })
  };
  goBack = () => {
    this.setState({
      show:false
    })
  };
  render() {
    const {dataSource,pagination,id,show  } = this.state;
    const {btn} = this.props;
    // console.log(hasAction(btn,'Order_orderdetail'));
    return(
      <div>
        {
          !show&&
            <div>
              <Table dataSource={dataSource} hasBorder={false} >
                <Table.Column
                  key='id'
                  dataIndex='id'
                  width={100}
                  title={_intl.get('public.id')}
                />
                {/*<Table.Column*/}
                  {/*key='orderid'*/}
                  {/*dataIndex='orderid'*/}
                  {/*width={100}*/}
                  {/*title={_intl.get('wallet.orderid')}*/}
                {/*/>*/}
                <Table.Column
                  key='type'
                  dataIndex='type'
                  width={100}
                  title={_intl.get('wallet.type')}
                  cell={(text)=>_intl.get(`orderTypes.${text}`)}
                />
                <Table.Column
                  key='openbal'
                  dataIndex='openbal'
                  width={100}
                  title={_intl.get('wallet.openbal')}
                />
                <Table.Column
                  key='total'
                  dataIndex='total'
                  width={100}
                  title={_intl.get('wallet.total')}
                />
                <Table.Column
                  key='fee'
                  dataIndex='fee'
                  width={100}
                  title={_intl.get('wallet.fee')}
                />
                <Table.Column
                  key='amt'
                  dataIndex='amt'
                  width={100}
                  title={_intl.get('wallet.amt')}
                />
                <Table.Column
                  key='balance'
                  dataIndex='balance'
                  width={100}
                  title={_intl.get('wallet.balance')}
                />
                {/*<Table.Column*/}
                  {/*title={_intl.get('wallet.status')}*/}
                  {/*dataIndex='status'*/}
                  {/*width={100}*/}
                  {/*cell={(text)=>{*/}
                    {/*if(text){*/}
                      {/*return typeof(text)==='number'?text:_intl.get(`status.${text}`)*/}
                    {/*}*/}
                  {/*}}*/}
                {/*/>*/}
                <Table.Column
                  key='created'
                  dataIndex='created'
                  title={_intl.get('public.created')}
                  width={150}
                  // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
                />
                <Table.Column
                  key='updated'
                  dataIndex='updated'
                  title={_intl.get('public.updated')}
                  width={150}
                  // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
                />
                {/*<Table.Column*/}
                  {/*key='action'*/}
                  {/*title={_intl.get('public.action')}*/}
                  {/*width={200}*/}
                  {/*cell={(text,index,record)=>{*/}
                    {/*return(*/}
                      {/*record.orderid>0&&hasAction(btn,'Order_orderdetail')&&*/}
                      {/*<Button  type="normal" shape="text" onClick={()=>this.showDetails(record.orderid)}>{intl.get('wallet.order')}</Button>*/}
                    {/*)*/}
                  {/*}}*/}
                {/*/>*/}
              </Table>
              <div style={{marginTop:'15px',textAlign:'right'}}>
                <Pagination {...pagination} hideOnlyOnePage onChange={this.handleChange}/>
              </div>
            </div>
        }
        {
          show&&
          <Details id={id} goBack={this.goBack}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
}

export default connect(mapStateToProps)(CustomTable);



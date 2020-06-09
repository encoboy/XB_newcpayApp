import React, { Component } from 'react';
import { Table ,Button,Switch,Radio} from '@icedesign/base';

const { Group: RadioGroup } = Radio;

export default class BankCard extends Component{
  state = {
    method:'merchantreportdaily',
    dataSource : []
  };
  componentDidMount(){
    this.getCards()
  }
  // componentDidMount(){

  // }
  getCards = () => {
    _fetch({
      url:'/Manager/Report',
      data:{
        method:this.state.method,
        merchantid :this.props.id
        // userid:this.props.id,
        // type:this.state.type
      },
      success:(data)=>{
          this.setState({dataSource:data.data})
      }
    })
  };
  onChange = (method)=>{
    this.setState({
      method
    },()=>{
      this.getCards()
    });
  };
  render(){
    const {dataSource,method} = this.state;
    const list = [
      {
        value: 'merchantreportdaily',
        label:_intl.get('bill.daily')
      },
      {
        value: "merchantreportmonthly",
        label: _intl.get('bill.monthly')
      }
    ];
    return(
      <div>
        <RadioGroup
          shape="button"
          dataSource={list}
          value={method}
          onChange={this.onChange}
        />
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='reportdate'
            dataIndex='reportdate'
            width={100}
            title={_intl.get('bill.reportdate')}
          />
          <Table.Column
            key='order_deposit_all'
            dataIndex='order_deposit_all'
            width={100}
            title={_intl.get('bill.order_deposit_all')}
          />
          <Table.Column
            key='order_deposit_all_times'
            dataIndex='order_deposit_all_times'
            width={100}
            title={_intl.get('bill.order_deposit_all_times')}
          />
          <Table.Column
            key='order_withdraw_all'
            dataIndex='order_withdraw_all'
            width={100}
            title={_intl.get('bill.order_withdraw_all')}
          />
          <Table.Column
            key='order_withdraw_all_times'
            dataIndex='order_withdraw_all_times'
            width={100}
            title={_intl.get('bill.order_withdraw_all_times')}
          />
          <Table.Column
            key='wallet_deposit_amt'
            dataIndex='wallet_deposit_amt'
            width={100}
            title={_intl.get('bill.wallet_deposit_amt')}
          />
          <Table.Column
            key='wallet_deposit_fee'
            dataIndex='wallet_deposit_fee'
            width={100}
            title={_intl.get('bill.wallet_deposit_fee')}
          />
          <Table.Column
            key='wallet_transfer_all'
            dataIndex='wallet_transfer_all'
            width={100}
            title={_intl.get('bill.wallet_transfer_all')}
          />
          <Table.Column
            key='wallet_transfer_fee'
            dataIndex='wallet_transfer_fee'
            width={100}
            title={_intl.get('bill.wallet_transfer_fee')}
          />
          <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={100}
            cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          <Table.Column
            key='updated'
            dataIndex='updated'
            title={_intl.get('public.updated')}
            width={100}
            cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
        </Table>
      </div>
    )
  }
}

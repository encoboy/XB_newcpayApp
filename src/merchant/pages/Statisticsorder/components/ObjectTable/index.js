import React,{Component} from 'react'
import {Table} from '@icedesign/base'

export default class ObjectTable extends Component{
  render(){
    const data = [];
    const bank  = this.props.data;
    for(const i in bank){
      const item = {};
      item.account = i;
      item.amount = bank[i].amount;
      item.count = bank[i].count;
      item.balance = bank[i].balance;
      data.push(item)
    }
    return(
      <Table dataSource={data} >
        <Table.Column
          width={50}
          key='account'
          dataIndex='account'
          title={_intl.get('OrderStatistics.account')}
        />
        <Table.Column
          width={50}
          key='amount'
          dataIndex='amount'
          title={_intl.get('OrderStatistics.amount')}
        />
        <Table.Column
          width={50}
          key='count'
          dataIndex='count'
          title={_intl.get('OrderStatistics.count')}
        />
        <Table.Column
          width={50}
          key='balance'
          dataIndex='balance'
          title={_intl.get('OrderStatistics.balance')}
        />
      </Table>
    )
  }
}

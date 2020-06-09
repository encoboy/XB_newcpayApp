import React, { Component } from 'react';
import { Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';


export default class Bank extends Component{
    render(){
        const data = [];
        const bank  = this.props.data;
        let totalTransfee = 0;//银行手续费总金额
        let totalWithdrewfee = 0;//交易费用总金额
        let totalAmount = 0;//总金额
        let totalCount = 0;//总数量
        for(const i in bank){
            const item = {};
            item.account = i;
            item.amount = bank[i].amount;
            item.count = bank[i].count;
            item.transfee = bank[i].transfee;
            item.withdrewfee = bank[i].withdrewfee;
            totalAmount += Number(bank[i].amount);
            totalCount += Number(bank[i].count);
            totalTransfee += Number(bank[i].transfee);
            totalWithdrewfee += Number(bank[i].withdrewfee);
            data.push(item);
        }
        data.push({
            account:_intl.get('bankstatistics.summary'),
            amount:totalAmount.toFixed(2),
            count:totalCount,
            transfee:totalTransfee.toFixed(2),
            withdrewfee:totalWithdrewfee.toFixed(2)
        });
        return (
            <div className="complex-tab-table">
              <IceContainer>
                <div>
                  <Table dataSource={data} hasBorder={false} >
                  <Table.Column
                  key='account'
                  dataIndex='account'
                  width={100}
                  title={_intl.get('bankstatistics.account')}
                  />
                  <Table.Column
                    key='amount'
                    dataIndex='amount'
                    width={100}
                    title={_intl.get('bankstatistics.amount')}
                    />
       
                    <Table.Column
                      key='withdrewfee'
                      dataIndex='withdrewfee'
                      width={100}
                      title={_intl.get('bankstatistics.withdrewfee')}
                    />
                    <Table.Column
                      key='transfee'
                      dataIndex='transfee'
                      width={100}
                      title={_intl.get('bankstatistics.transfee')}
                    />
                    <Table.Column
                        key='count'
                        dataIndex='count'
                        width={100}
                        title={_intl.get('bankstatistics.count')}
                    />
                  </Table>
                </div>
              </IceContainer>
            </div>
          );
    }
}
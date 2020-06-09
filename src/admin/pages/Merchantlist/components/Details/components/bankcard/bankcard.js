import React, { Component } from 'react';
import { Table ,Button,Switch} from '@icedesign/base';

export default class BankCard extends Component{
  state = {
    dataSource : []
  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    // const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/merchant/Usercards',
      data:{
        method:'usercards',
        userid:this.props.id,
        // page:current,
        // size:pageSize
      },
      success:(data)=>{
        // const {pagination} = this.state;
        // pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          // pagination
        })
      }
    })
  };
  updateStatus = (cardid,status)=>{
    _fetch({
      url:'/merchant/Usercards',
      data:{
        method:'updatestatus',
        cardid,
        status
      },
      success:()=>{
       this.getCards()
      }
    })
  };
  render(){
    const {dataSource} = this.state;
    return(
      <div>
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='bank'
            dataIndex='bank'
            width={100}
            title={_intl.get('bankcard.bank')}
          />
          <Table.Column
            key='number'
            dataIndex='number'
            width={100}
            title={_intl.get('bankcard.number')}
          />
          <Table.Column
            key='holder'
            dataIndex='holder'
            width={100}
            title={_intl.get('bankcard.holder')}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
            cell={(text,index,record)=>{
              if(text===0||text===3){
                return <span style={{color:'#999'}}>{_intl.get(`bankcard.${text}`)}</span>
              }else {
                return <Switch checked={text===1} onChange={()=>this.updateStatus(record.id,text===1?2:1)}/>
              }

            }}
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
          <Table.Column
            key='action'
            dataIndex='action'
            title={_intl.get('public.action')}
            width={100}
            cell={(text,index,record)=>{
              if(!record.status){
                return <Button type='primary' size='small' onClick={()=>this.updateStatus(record.id,1)}>{_intl.get('merchantlist.pass')}</Button>
              }
            }}
          />
        </Table>
      </div>
    )
  }
}

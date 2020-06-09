import React, { Component } from 'react';
import DeleteBalloon from '../components/DeleteBalloon';
import { Table ,Switch} from '@icedesign/base';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    _fetch({
      url:'/Manager/MerchantPG',
      data:{
        method:'allpgs',
      },
      success:(data)=>{
        this.setState({
          dataSource:data.data
        })
      }
    })
  };
  updateStatus = (id,status) => {
    _fetch({
      url:'/Manager/MerchantPG',
      data:{
        method:'setpgstatus',
        id,
        status
      },
      success:()=>{
       this.getCards()
      }
    })
  };


  handleRemove = (id) => {
    _fetch({
      url:'/Manager/MerchantPG',
      data:{
        method:'deletepg',
        id
      },
      success:()=>{
        this.getCards()
      }
    })
  };
  render() {
    const {dataSource } = this.state;
    return(
      <Table dataSource={dataSource} hasBorder={false} >
        <Table.Column
          key='id'
          dataIndex='id'
          width={100}
          title={_intl.get('public.id')}
        />
        <Table.Column
          key='holdername'
          dataIndex='holdername'
          width={100}
          title={_intl.get('pg.toname')}
        />
        <Table.Column
          key='bank'
          dataIndex='bank'
          width={100}
          title={_intl.get('pg.tobank')}
          cell={text=>text.toUpperCase()}
        />
        <Table.Column
          key='account'
          dataIndex='account'
          width={100}
          title={_intl.get('pg.toaccount')}
        />
        {/*<Table.Column*/}
          {/*key='status'*/}
          {/*dataIndex='status'*/}
          {/*width={100}*/}
          {/*title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}*/}
          {/*cell={(text,index,record)=>{*/}
            {/*// if(!text){*/}
            {/*//   return <span style={styles.noChecked}>{_intl.get('usercard.0')}</span>*/}
            {/*// }*/}
            {/*return <Switch checked={text===1} onChange={()=>this.updateStatus(record.id,text===1?9:1)}/>*/}
          {/*}}*/}
        {/*/>*/}
        <Table.Column
          key='created'
          dataIndex='created'
          title={_intl.get('public.created')}
          width={150}
          cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
        />
        <Table.Column
          key='updated'
          dataIndex='updated'
          title={_intl.get('public.updated')}
          width={150}
          cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
        />
        {/*<Table.Column*/}
          {/*key='action'*/}
          {/*title={_intl.get('public.action')}*/}
          {/*width={100}*/}
          {/*cell={(text,index,record)=>{*/}
            {/*return(*/}
              {/*<DeleteBalloon*/}
                {/*handleRemove={() => this.handleRemove(record.id)}*/}
              {/*/>*/}
            {/*)*/}
          {/*}}*/}
        {/*/>*/}
      </Table>
    );
  }
}



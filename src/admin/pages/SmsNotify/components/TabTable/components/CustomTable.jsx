import React, { Component } from 'react';
import { Table} from '@icedesign/base';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
    };
  }
  componentDidMount(){
    this.getCards();
  }
  getCards = () => {
    _fetch({
      url:'/Manager/Bank',
      data:{
        method:'banksmsnotifylist',
      },
      success:(data)=>{
        this.setState({
          dataSource:data.data
        })
      },
    })
  };
  render() {
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
            key='account'
            dataIndex='account'
            width={100}
            title={_intl.get('notify.account')}
            cell={(text,index,record)=><div>{record.bank.toUpperCase()} {record.account}</div>}
          />
          <Table.Column
            key='phone'
            dataIndex='phone'
            width={100}
            title={_intl.get('notify.phone')}
          />
          <Table.Column
            key='type'
            dataIndex='type'
            width={100}
            title={_intl.get('notify.type')}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('notify.status')}
            cell={(text)=><div style={styles[`status${text}`]}>{_intl.get(`notify.${text}`)}</div>}
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
            key='expire'
            dataIndex='expire'
            title={_intl.get('notify.expire')}
            width={100}
            cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
        </Table>
      </div>
    );
  }
}

const styles = {
  status0:{
    color:'rgb(46, 204, 113)'
  },
  status1:{
    color:'rgb(84, 133, 247)'
  },
  status2:{
    color:'rgb(255, 118, 117)'
  }
};

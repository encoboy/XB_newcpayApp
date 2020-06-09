import React, { Component } from 'react';
import { Table } from '@icedesign/base';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    _fetch({
      url:'/Manager/Bank',
      data:{
        method:'gettokenlist',
      },
      success:(data)=>{
        this.setState({
          dataSource:data.data,
        })
      }
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
            key='username'
            dataIndex='username'
            width={100}
            title={_intl.get('public.username')}
          />
          <Table.Column
            key='account'
            dataIndex='account'
            width={100}
            title={_intl.get('token.account')}
            cell={(text,index,record)=>
              <span>{record.bank.toUpperCase()} {text}</span>
            }
          />
          <Table.Column
            key='genre'
            dataIndex='genre'
            width={100}
            title={_intl.get('token.genre')}
          />
          <Table.Column
            key='token'
            dataIndex='token'
            width={100}
            title={_intl.get('token.token')}
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
    );
  }
}

const styles = {
  approve:{
    color:'rgb(46, 204, 113)'
  },
  processing:{
    color:'rgb(84, 133, 247)'
  },
  reject:{
    color:'rgb(255, 118, 117)'
  },
  pending:{
    color:'rgb(253, 203, 110)'
  }
};

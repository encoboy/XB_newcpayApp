import React, { Component } from 'react';
import { Table,Pagination ,Button,Switch} from '@icedesign/base';
import Form from '../Form'

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
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
      url:'/Manager/merchant',
      data:{
        method:'allmerchants',
        status:9,
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
      this.getCards();
    })
  };
  updateStatus=(merchantid ,status)=>{
    _fetch({
      url:'/Manager/merchant',
      data:{
        method:'updatemerchant',
        merchantid ,
        status
      },
      success:()=>{
        this.getCards();
      }
    })
  };
  render() {
    const {dataSource,pagination} = this.state;
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
            key='nickname'
            dataIndex='nickname'
            width={100}
            title={_intl.get('merchantlist.nickname')}
          />
          <Table.Column
            key='mobile'
            dataIndex='mobile'
            width={100}
            title={_intl.get('merchantlist.phone')}
          />
          <Table.Column
            key='email'
            dataIndex='email'
            width={100}
            title={_intl.get('merchantlist.email')}
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
            cell={(text,index,record)=>(
              <div>
                <Button size='small' style={{marginRight:'5px'}} type='primary'  onClick={()=>this.updateStatus(record.id,1)}>{_intl.get('merchantlist.pass')}</Button>
              </div>
            )}
          />
        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
          <Pagination {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}



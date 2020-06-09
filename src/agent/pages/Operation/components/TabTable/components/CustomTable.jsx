import React, { Component } from 'react';
import { Table,Pagination } from '@icedesign/base';
import Form from '../../Form'



export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      count:''
    };
  }
  componentDidMount(){
    this.getData()
  }
  getData = (values) => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Operaterecord ',
      data:{
        method:'searchrecords',
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total = data.count||0;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination,
          count:data.count
        })
      }
    })
  };
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      this.getData(cacheParams);
    })
  };
  handleSubmit=(values)=>{
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>{
      this.getData(values)
    });
  };

  handleReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>{
      this.getData()
    })
  };
  render() {
    const {dataSource,pagination,count } = this.state;
    return(
      <div>
        <Form  onSubmit={this.handleSubmit} onReset={this.handleReset}/>
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='op_name'
            dataIndex='op_name'
            width={100}
            title={_intl.get('operationLog.op_name')}
            cell={text=>{
              let str = text;
              str=str.toLowerCase().split(" ");
              for(var i=0;i<str.length;i++){
                var char=str[i].charAt(0);
                str[i]=str[i].replace(char,function(s){return s.toUpperCase();});
              }
              str=str.join(" ");
              return str;
            }}
          />
          <Table.Column
            key='from'
            dataIndex='from'
            width={100}
            title={_intl.get('operationLog.from')}
            cell={text => _intl.get(`event.${text}`)?_intl.get(`event.${text}`):text}
          />
          <Table.Column
            key='event'
            dataIndex='event'
            width={100}
            title={_intl.get('operationLog.event')}
            cell={text => _intl.get(`event.${text}`)?_intl.get(`event.${text}`):text}
          />
          {/*<Table.Column*/}
            {/*key='params'*/}
            {/*dataIndex='params'*/}
            {/*width={100}*/}
            {/*title={_intl.get('operationLog.params')}*/}
          {/*/>*/}

          <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={100}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />

        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
        <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
        {_intl.get('public.paginationData')} </span>
        {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
        </div>
      </div>
    );
  }
}



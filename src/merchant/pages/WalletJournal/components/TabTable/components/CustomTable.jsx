import React, { Component } from 'react';
import { Table ,Pagination,Button} from '@icedesign/base';
import Details from '../../../../../components/DetailTable';
import { connect } from 'react-redux'
import {hasAction,isEmptyObject} from '../../../../../util'
import Form from './Form/index';

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      cacheParams:{},
      id:'',
      show:false,
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      count:'',
      allsum:'',
      pagesum:'',
      order:undefined
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = (order) => {
    const {pagination:{current,pageSize}} = this.state;
    const ascending = 2;
    const descending = 1;
    let orderby;
    if(order === 'asc'){
      orderby = ascending;
    }else if(order === 'desc'){
      orderby = descending;
    }else{
      orderby = undefined;
    }
    _fetch({
      url:'/User/Userwalletrx',
      data:{
        method:'getwallettrx',
        orderby:orderby,
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log('getwallettrx',data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          pagination,
          count:data.count,
          allsum:data.allsum,
          pagesum:data.pagesum
        })
      }
    })
  };
  searchTransfer = (values,order) => {
    const {pagination} = this.state;
    const ascending = 2;
    const descending = 1;
    let orderby;
    if(order === 'asc'){
      orderby = ascending;
    }else if(order === 'desc'){
      orderby = descending;
    }else{
      orderby = undefined;
    }
    _fetch({
      url:'/User/Userwalletrx',
      data:{
        method:'searchwallettrx',
        orderby:orderby,
        page:pagination.current,
        size:pagination.pageSize,
        ...values
      },
      success:(data)=>{
        console.log('searchwallettrx',data)
        const {pagination} = this.state;
        pagination.total=data.count
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination,
          count:data.count,
          allsum:data.allsum,
          pagesum:data.pagesum
        })
      }
    })
  };
  handleChange = (current) =>{
    const {pagination,cacheParams,order} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards(order)
      }else {
        this.searchTransfer(cacheParams,order)
      }

    })
  };
  showDetails = (id) => {
    this.setState({
      id,
      show:true
    })
  };
  goBack = () => {
    const {order} = this.state;
    this.setState({
      show:false
    },()=>{
      this.getCards(order)
    })
  };
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
    this.searchTransfer(values)
    });
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      pagination,
      cacheParams:{}
    },()=>{
      this.getCards()
    })
  };
    // 按编号排序
  // 按编号排序
  onSort (dataIndex, order)  {
    const {pagination,cacheParams} = this.state;
    this.setState({
      pagination,
      order
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards(order);
        return;
      }
      this.searchTransfer(cacheParams,order)
    })
  }
  render() {
    const {dataSource,pagination,id,show,count,allsum,pagesum } = this.state;
    const {btn} = this.props;
    return(
      <div>
        {
          !show&&
            <div>
              <Form onSubmit={this.handleSubmit} onReset={this.handleReset} />
              <Table dataSource={dataSource} hasBorder={false} onSort={this.onSort.bind(this)}>
                <Table.Column
                  key='id'
                  dataIndex='id'
                  width={60}
                  title={_intl.get('public.id')}
                  sortable
                />
                <Table.Column
                  key='orderid'
                  dataIndex='orderid'
                  width={60}
                  title={_intl.get('wallet.orderid')}
                />
                <Table.Column
                key='type'
                dataIndex='type'
                width={80}
                title={_intl.get('wallet.type')}
                cell={(text)=>{
                  if(text){
                    return text==='3'?_intl.get(`orderTypes.${text}`):_intl.get(`orderTypes.${text}`)
                  }
                }}
                />
                <Table.Column
                key='typeid'
                dataIndex='typeid'
                width={60}
                title={_intl.get('wallet.typeid')}
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
                  width={80}
                  title={_intl.get('wallet.total')}
                />
                <Table.Column
                  key='fee'
                  dataIndex='fee'
                  width={90}
                  title={_intl.get('wallet.fee')}
                />
                <Table.Column
                  key='extra'
                  dataIndex='extra'
                  width={70}
                  title={_intl.get('wallet.extrafee')}
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
                  width={120}
                  title={_intl.get('wallet.balance')}
                />
                <Table.Column
                  key='created'
                  dataIndex='created'
                  title={_intl.get('public.created')}
                  width={100}
                  // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
                />
                <Table.Column
                  key='updated'
                  dataIndex='updated'
                  title={_intl.get('public.updated')}
                  width={100}
                  // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
                />
                <Table.Column
                  key='action'
                  title={_intl.get('public.action')}
                  width={70}
                  cell={(text,index,record)=>{
                  return(
                    record.orderid>0&&hasAction(btn,'Order_orderdetail')&&
                    <Button  type="normal" shape="text" onClick={()=>this.showDetails(record.orderid)}>{_intl.get('wallet.order')}</Button>
                  )
                  }}
                />
              </Table>
              <div style={styles.tatalamount}>
                <div>{_intl.get('wallet.pageAll')}：{_intl.get('wallet.total')}：{pagesum.total}，{_intl.get('wallet.fee')}：{pagesum.fee}，{_intl.get('wallet.amt')}：{pagesum.amt}，{_intl.get('wallet.extrafee')}：{pagesum.extra}</div>
                <div style={{marginTop:'10px'}}>{_intl.get('wallet.allsum')}：{_intl.get('wallet.total')}：{allsum.total}，{_intl.get('wallet.fee')}：{allsum.fee}，{_intl.get('wallet.amt')}：{allsum.amt}，{_intl.get('wallet.extrafee')}：{allsum.extra}</div>
              </div>

              <div style={{marginTop:'15px',textAlign:'right'}}>
              <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
              {_intl.get('public.paginationData')} </span>
              {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
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

function mapStateToProps(state){
  return {
    btn: state.operation.btn,
    language:state.language,
  }
}

export default connect(mapStateToProps)(CustomTable)

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
  },
  tatalamount:{
    textAlign: 'right',
    paddingTop: '26px',
    color:'red',
    marginRight:'60px'
  }
};


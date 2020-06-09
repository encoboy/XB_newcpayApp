import React, { Component } from 'react';
import { Table,Pagination,Button} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import {getActiveRedDot} from '../../redux/action';
import {isEmptyObject} from '../../util';

class Warninglist extends Component {
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
    this.getCards();
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/BankWarning',
      data:{
        method:'warninglist',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log('warninglist',data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          pagination,
          dataSource:data.data,
          count:data.count
        })
      },
      error:(error)=>{
       
      }
    })
  };
  // 分页
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards();
        return;
      }
      this.searchwithdraw(cacheParams)
    })
  };
  // 标记已读
  readwarnding = (waringid) => {
    _fetch({
      url:'/Merchant/BankWarning',
      data:{
        method:'readwarning',
        id:waringid
      },
      success:(data)=>{
        console.log('readwarning',data);
        this.getCards();
      }
    })
  }
  render() {
    const {dataSource,pagination,count} = this.state;
    return(
      <div>
      <CustomBreadcrumb/>
      <IceContainer>
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='level'
            dataIndex='level'
            width={100}
            title={_intl.get('waring.level')}
            cell={(text,index,record)=><div>{text.toUpperCase()}</div>}
          />
          <Table.Column
            key='title'
            dataIndex='title'
            width={100}
            title={_intl.get('waring.title')}
          />
          <Table.Column
            key='content'
            dataIndex='content'
            width={100}
            title={_intl.get('waring.content')}
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
          dataIndex='action'
          title={_intl.get('public.action')}
          width={100}
          cell={(text,index,record)=>(
            <Button type="normal" shape='text' onClick={()=>this.readwarnding(record.id)}>{_intl.get('waring.tagread')}</Button>
          )}
        />
        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
        <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
        {_intl.get('public.paginationData')} </span>
        {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
        </div>
        </IceContainer>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    activeRedDot:()=>dispatch(getActiveRedDot(true)),
  }
};
export default connect(null,mapDispatchToProps)(Warninglist);
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

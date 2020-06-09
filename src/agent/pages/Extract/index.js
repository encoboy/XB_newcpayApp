import React, { Component } from 'react';
import { Table ,Radio,Button,Dialog,Pagination } from '@icedesign/base';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import Info from './component/Info/Info';
import Addrunwater from './component/Addrunwater/Addrunwater';
import Lookrunwater from './component/Lookrunwater/Lookrunwater';
import {isEmptyObject} from '../../util'
import {connect} from 'react-redux';
import { getActiveRedDot } from '../../redux/action';

const { Group: RadioGroup } = Radio;

 class Extractlist extends Component{
  state = {
    dataSource : [],
    cacheParams:{},
    pagination:{
      current:1,
      pageSize:20,
      total:0
    },
    show:false,
    type:null,
    detaildata:[],
    moneydata:[],
    lookrunwaterdata:[],
    detailid:null,
    count:''
  };
  componentDidMount(){
    this.getCards()
  }
  // 获取待处理提现列表
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Userwithdraw',
      data:{
        method:'getwithdrawlist',
        type:'manual',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          pagination,
          dataSource:data.data,
          count:data.count
        })
      }
    })
  };
//   提现详情页面
  showDetails = (ledgerid,type) => {
    this.props.activeRedDot();
      _fetch({
          url:'/Merchant/Userwithdraw',
          data:{
              method:'getwithdrawdetail',
              withdrawid:ledgerid
          },
          success:(data)=>{
              console.log(data);
              this.setState({
                show:!this.state.show,
                type:type,
                detaildata:data.data,
                detailid:ledgerid
              })
          }
      })
  }
//   查看添加流水页面
  showaddrunwater = (ledgerid,type) => {
    _fetch({
        url:'/Merchant/Agentaccount',
        data:{
            method:'accountdetail',
            ledgerid:ledgerid
        },
        success:(data)=>{
            console.log(data);
            this.setState({
              moneydata:data.data,
              show:!this.state.show,
              type:type
            })
        }
    })
  }

  
//   查看流水页面
    showlookrunwater = (ledgerid,type) => {
        _fetch({
          url:'/Merchant/Agentaccount',
          data:{
              method:'accountdetail',
              ledgerid:ledgerid
          },
          success:(data)=>{
              console.log(data);
              this.setState({
                lookrunwaterdata:data.data,
                show:!this.state.show,
                type:type
              })
          }
      })
    }


//   goback账目列表
  goback = () => {
      this.setState({
          show:!this.state.show
      },()=>{
        this.getCards();
      })
  }
  onChange = (type)=>{
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      type,
      pagination,
      cacheParams:{}
    },()=>{
      this.getCards()
    });
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


  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchwithdraw(values)
    });
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>{
      this.getCards()
    })
  };
  render(){
    const {dataSource,type,show,detaildata,
          moneydata,lookrunwaterdata,detailid,pagination,count} = this.state;
    return(
      <div>

        <CustomBreadcrumb/>
        {
        !show&&<div>
        <IceContainer>
          <Table dataSource={dataSource} hasBorder={false} >
            <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('waitetransfer.id')}
            />
            <Table.Column
            key='holder'
            dataIndex='holder'
            width={100}
            title={_intl.get('waitetransfer.to_holder')}
            />
            <Table.Column
            key='bank'
            dataIndex='bank'
            width={100}
            title={_intl.get('waitetransfer.bank')}
            cell={(text)=>text&&text.toUpperCase()}
            />
            <Table.Column
            key='account'
            dataIndex='account'
            width={100}
            title={_intl.get('waitetransfer.account')}
            />
          <Table.Column
              key='amount'
              dataIndex='amount'
              width={100}
              title={_intl.get('waitetransfer.amount')}
            />
            <Table.Column
              key='status'
              dataIndex='status'
              width={100}
              title={_intl.get('public.status')}
              cell={text=>_intl.get(`status.${text}`)}
            />
            <Table.Column
            key='action'
            dataIndex='action'
            title={_intl.get('public.action')}
            width={100}
            cell={(text,index,record)=>{
                return (
                    <span>
                        <Button type='normal' shape='text' 
                        onClick={()=>this.showDetails(record.id,'detail')}>{_intl.get('public.detail')}</Button>
                    </span>
                    
                )
            }}
          />
          </Table>
          <div style={{marginTop:'15px',textAlign:'right'}}>
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
          {_intl.get('public.paginationData')} </span>
          {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
          </div>
        </IceContainer>
        </div>
        }
        

        {
            show&&type==='detail'&&<Info 
                                      history={this.props.history} 
                                      goback={this.goback} 
                                      detaildata={detaildata} 
                                      type={type}
                                      detailid={detailid}
                                      showDetails={this.showDetails}/>
        }
        {
            show&&type==='add'&&<Addrunwater goback={this.goback} moneydata={moneydata}/>
        }
        {
            show&&type==='look'&&<Lookrunwater goback={this.goback} lookrunwaterdata={lookrunwaterdata}/>
        }
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    activeRedDot:()=>dispatch(getActiveRedDot(true)),
  }
};
export default connect(null,mapDispatchToProps)(Extractlist);

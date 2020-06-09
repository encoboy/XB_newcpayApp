import React, { Component } from 'react';
import { Table ,Radio,Button,Grid} from '@icedesign/base';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import Info from './component/Info/Info';
import Addrunwater from './component/Addrunwater/Addrunwater';
import Lookrunwater from './component/Lookrunwater/Lookrunwater';
import {connect} from 'react-redux'
// import Form from './component/Form/Advanced';
import Form from './component/Form/DailyDate';
// import { hasAction } from './../../util/index';
// const { Group: RadioGroup } = Radio;
// const Toast = Feedback.toast;
const { Row, Col } = Grid;
 class Financelist extends Component{
  state = {
    dataSource : [],
    cacheParams:{},
    footer:()=>null,
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
    financelistname:null,
    allCount:'',
    allTotal:''
  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Agentaccount',
      data:{
        method:'getaccounts',
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          footer:()=>null,
          pagination,
          dataSource:data.data,
          allCount:data.count,
          allTotal:data.total
        })
      }
    })
  };

  //   添加流水页面
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
  showlookrunwater = (ledgerid,type,name) => {
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
            type:type,
            financelistname:name
          })
      }
  })
}
//   查看账目详情
  showDetails = (ledgerid,type) => {
      console.log(type)
      _fetch({
          url:'/Merchant/Agentaccount',
          data:{
              method:'accountdetail',
              ledgerid:ledgerid
          },
          success:(data)=>{
              console.log(data);
              this.setState({
                show:!this.state.show,
                type:type,
                detaildata:data.data,

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
  // 分页，这里没有用到
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

  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchwithdraw(values)
    });
  };
  // 重置
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

  // 搜索账目名
  onSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>{this.searchOrder(values)})
  };
  // 搜索
  searchOrder = (values) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
      _fetch({
        url:'/Merchant/Agentaccount',
        data:{
          method:'searchaccount',
          ...values
        },
        success:(data)=>{
          console.log(data);
          const {pagination} = this.state;
          pagination.total=data.count;
          this.setState({
            dataSource:data.data,
            pagination,
            allCount:data.count,
            allTotal:data.total
          })
        }
      })

  };
  // 重置
  onReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>this.getCards())
  };
  render(){
    const {btn} = this.props;
    const {dataSource,
            type,
            show,
            detaildata,
            moneydata,
            lookrunwaterdata,
            financelistname,allCount,allTotal} = this.state;

    // const allTotalLength = allTotal.length;
    // let displayLength;
    // let colWidth;
    // let numberLength = parseInt(allTotalLength)
    // if(numberLength>19&&numberLength<35){
    //   colWidth = '20';
    //   displayLength = (<div>{allTotal}</div>)
    // }else if(numberLength>=35&&numberLength<50){
    //   colWidth = '19';
    //   displayLength = (<div>{allTotal}</div>)
    // }else if(numberLength>=50&&numberLength<=70){
    //   colWidth = '16';
    //   displayLength = (<div>{allTotal}</div>)
    // }else if(numberLength>70){
    //   colWidth = '15';
    //   displayLength = (<div>{allTotal}</div>)
    // }else if(numberLength<=19){
    //   colWidth = '21';
    //   displayLength = allTotal;
    // }
    
    return(
      <div>

        <CustomBreadcrumb/>
        {
        !show&&<div>
        <IceContainer>
          <div>
          <Row>
            <Col xxs="24" s="4" l='21'>
                <Form onSubmit={this.onSubmit} onReset={this.onReset}/>
            </Col>
            <Col xxs="24" s="4" l="3">
                <div style={{color:'red',marginBottom:'5px'}}>{_intl.get('myfinance.allcount')}：{allCount}</div>
                <div style={{color:'red',wordBreak:'break-all'}}>{_intl.get('myfinance.alltotal')}：{allTotal}</div>
            </Col>
          </Row>
          
          <Table dataSource={dataSource} hasBorder={false}>
            <Table.Column
            key='name'
            dataIndex='name'
            width={100}
            title={_intl.get('myfinance.financename')}
            cell={(text)=>text&&text.toUpperCase()}
            />
            <Table.Column
              key='balance'
              dataIndex='balance'
              width={100}
              title={_intl.get('myfinance.balance')}
            />
            <Table.Column
              key='type'
              dataIndex='type'
              width={100}
              title={_intl.get('myfinance.type')}
              cell={(text)=>text&&text.toUpperCase()}
            />
            <Table.Column
            key='description'
            dataIndex='description'
            width={100}
            title={_intl.get('myfinance.description')}
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
            cell={(text,index,record)=>{

                return (
                    <span>
                        {<Button type='normal' shape='text' 
                        onClick={()=>this.showaddrunwater(record.id,'add')}>{_intl.get('myfinance.addrunwater')}</Button>}
                        &nbsp;&nbsp;&nbsp;
                        <Button type='normal' shape='text' 
                        onClick={()=>this.showlookrunwater(record.id,'look',record.name)}>{_intl.get('myfinance.lookrunwater')}</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type='normal' shape='text' 
                        onClick={()=>this.showDetails(record.id,'detail')}>{_intl.get('public.detail')}</Button>
                    </span>
                    
                )


            }}
          />
          </Table>
          </div>
        </IceContainer>
        </div>
        }
        {
            show&&type==='detail'&&<Info goback={this.goback} detaildata={detaildata}/>
        }
        {
            show&&type==='add'&&<Addrunwater goback={this.goback} moneydata={moneydata} history={this.props.history}/>
        }
        {
            show&&type==='look'&&<Lookrunwater goback={this.goback} lookrunwaterdata={lookrunwaterdata} financelistname={financelistname}/>
        }
      </div>
    )
  }
}
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}

export default connect(mapStatToProp)(Financelist)

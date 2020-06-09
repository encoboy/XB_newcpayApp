import React, { Component } from 'react';
import { Button,Dialog,Feedback,Input,Grid,Tab} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './Todaycount.scss';

import Form from '../Form/index';
import DateFormat from './../../../../components/DateFormat/DateFormat';

import DisplayTodayHaveTitle from '../comTable/DisplayTodayHaveTitle';
import NotTitleAnd_isYesterdayTable from '../comTable/NotTitleAnd_isYesterdayTable';
import DisplayShearchBeforeAnyDay from '../comTable/DisplayShearchBeforeAnyDay';

const Toast = Feedback.toast;
const {Row,Col} = Grid;
const TabPane = Tab.TabPane;
// 今天的日期格式
let nowDate = DateFormat(null,'today');
// 昨天的日期格式
var yesterdayDate =DateFormat(null,'yesterday');

export default class Deposit extends Component {
  static displayName = 'Deposit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'transfer',
      showDeatils:false,
      dataSource:[],

  
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      todayDate:'',
      yesterday:'',
      is_searchDate:false,
      not_search:true,
      searchDate:'',
      is_searchToday:false,
      notdata:false
    }
  }
  componentDidMount(){
    this.getTodayData();
  }
    // 得到今日和昨天的统计列表数据
    getTodayData = () => {
      const {pagination:{current,pageSize},activeKey} = this.state;

      _fetch({
        url:'/Merchant/Order',
        data:{
            method:'statisticsorder',
            dateone:nowDate
        },
        success:(data)=>{
          console.log(data)
          const {pagination} = this.state;
          if(data.data.length === 0){
            this.setState({notdata:true});
          }else{
            this.setState({
              dataSource:data.data,
              pagination,
              todayDate:nowDate,
              yesterday:yesterdayDate,
              is_searchDate:false,
              not_search:true,
              notdata:false
            })
          }
        }
      })
    };
  onSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>{this.searchOrder(values)})
  };
  //搜索
  searchOrder = (values) => {
    console.log(values)
      if(values['dateone']===nowDate){
        this.setState({
          is_searchToday:true
        })
      }else{
        this.setState({
          is_searchToday:false
        })
      }
      _fetch({
        url:'/Merchant/Order',
        data:{
          method:'statisticsorder',
          ...values
        },
        success:(data)=>{
          console.log(data);
          const {pagination} = this.state;
          pagination.total=data.count;
          if(data.data.length === 0){
            this.setState({notdata:true});
          }else{
            this.setState({
              dataSource:data.data,
              pagination,
              is_searchDate:true,
              not_search:false,
              searchDate:values['dateone'],
              notdata:false
            })
          }
        }
      })

  };
  onReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>this.getTodayData())
  };

  // 日期搜索
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchOrder(values)
    });
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>{
      this.getTodayData()
    })
  };

  // 重算
  recalculation = (type,date) => {
    let year = date.substring(0,4);
    let month = date.substring(4,6);
    let day = date.substring(6,8);
    let strDate = year+'-'+month+'-'+day;
    let chinaDate = new Date(strDate);
    // 明天的日期格式
    let tomorrowDate = DateFormat(chinaDate,'tomorrow');
    
    _fetch({
      url:'/Merchant/Recalculate',
      data:{
        method:'orderrpt',
        type:type,
        report:'lastday',
        date:tomorrowDate
      },
      success:(data)=>{
        console.log('recalculation',data);
        let value = {dateone:date}
        if(date==nowDate||date==yesterdayDate){
          this.getTodayData();
        }else{
          this.searchOrder(value);
        }
      }
    })
  }

  render() {
    const {dataSource,todayDate,yesterday,is_searchDate,not_search,notdata,is_searchToday} = this.state;
    // 存款
    let deposit = 4;

    return (
      <div className="userinfo">
       <IceContainer>
        <div>
          <Form onSubmit={this.handleSubmit} onReset={this.handleReset}/>
          {!notdata&&<div>
          {(is_searchToday||not_search)&&<Row className="demo-row" align="top" >
          {
            dataSource.map((item,index)=>{
              if(item.ordertype===deposit&&item.querydate===todayDate){
                return(
                  <DisplayTodayHaveTitle item={item} recalculation={this.recalculation}/>
                )
              }
              if(item.ordertype===deposit&&item.querydate===yesterday){
                return(
                  <NotTitleAnd_isYesterdayTable item={item} recalculation={this.recalculation}/>
                )
              }
            })
          }
        </Row>}

        {(is_searchDate&&!is_searchToday)&&<Row className="demo-row2" align="top" >
        {
          dataSource.map((item,index)=>{
            
            if(item.ordertype===deposit){
              return(
                <DisplayShearchBeforeAnyDay item={item} recalculation={this.recalculation}/>
              
              )
            }
          })
        }
        </Row>}
        </div>}
        {notdata&&<div style={styles.notData}>{_intl.get('bankstatistics.nodata')}</div>}
        </div>
        </IceContainer>
      </div>
    );
  }
}


const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
    wordBreak: 'break-all'
  },
  statusProcessing: {
    color: '#64D874',
  },
  btnRight:{
    marginLeft:'15px'
  },
  floatRight:{
    float:'right'
  },
  rightMove:{
    marginLeft:'65px'
  },
  fontCenter:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  notData:{
    textAlign:'center',
    margin:'20px 0px'
  },
  recalculation:{
    float:'right',
    marginTop:'25px',
    marginRight:'40px'
  }
};

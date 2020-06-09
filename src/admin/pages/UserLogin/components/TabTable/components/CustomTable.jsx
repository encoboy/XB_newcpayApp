import React, { Component } from 'react';
import DeleteBalloon from '../components/DeleteBalloon';
import RevisePwd from '../components/RevisePwd';
import { Table,Feedback ,Switch,Button} from '@icedesign/base';
import Permission from '../../Permission'
import sha1 from 'sha1';
import {hasAction} from '../../../../../util';
import { connect } from 'react-redux';
import {getStopRedDot} from '../../../../../redux/action';
import Form from '../../Form/index';

const Toast = Feedback.toast;

class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      username:'',
      id:'',
      showPer:false,
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
    _fetch({
      url:'/Manager/Managerlogin',
      data:{
        method:'sublist',
      },
      success:(data)=>{
        console.log(data);
        this.setState({
          dataSource:data.data
        })
      }
    })
  };
  updateSub = (obj) => {
    _fetch({
      url:'/Manager/Managerlogin',
      data:{
        method:'updatesub',
        ...obj
      },
      success:()=>{
        if(obj.type==='psw'||obj.type==='ope'){
          Toast.success(_intl.get('sub.tip'));
          return;
        }
       this.getCards()
      }
    })
  };
  updatePwd = (obj) => {
    return (psaaword)=>{
      obj.value = sha1(obj.username+psaaword);
      this.updateSub(obj)
    };
  };

  handleRemove = (id) => {
    _fetch({
      url:'/Manager/Managerlogin',
      data:{
        method:'delsub',
        id
      },
      success:()=>{
        this.getCards()
      }
    })
  };
  showPermission=(username,id)=>{
    this.props.stopRedDot();
    this.setState({
      username,
      id,
      showPer:true
    })
  };
  goBack=()=>{
    this.setState({
      showPer:false
    },()=>{
      this.getCards()
    })
  };
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
     this.searchwithdraw(values)
    });
  };
  searchwithdraw = (values)=>{
    console.log(values);
    _fetch({
      url:'/Manager/Managerlogin',
      data:{
        method:'searchsub',
        ...values
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        // pagination.total=data.count
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
        })

      }
    })
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
  render() {
    const {dataSource,username ,showPer,id} = this.state;
    const {btn} = this.props;
    return(
      <div>
        {!showPer&&
        <div>
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} />
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
            cell={text => text&&text.toUpperCase()}
          />
          <Table.Column
            key='ip'
            dataIndex='ip'
            width={150}
            title='IP'
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
            cell={(text,index,record)=>{
              if(!text){
                return(
                  <span style={styles.noChecked}>{_intl.get('usercard.0')}</span>
                )
              }
              return (
                <Switch checked={text===1} onChange={()=>this.updateSub({type:'sta',id:record.id,value:text===1?2:1})}/>
              )
            }}
          />
          <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={200}
            cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          <Table.Column
            key='updated'
            dataIndex='updated'
            title={_intl.get('public.updated')}
            width={200}
            cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          <Table.Column
            key='action'
            title={_intl.get('public.action')}
            width={200}
            cell={(text,index,record)=>{
              return(
                <span>
                <RevisePwd onOk={this.updatePwd({type:'psw',id:record.id,username:record.username.toLowerCase()})} />
                  <Button type='secondary' size='small' style={{marginRight:'5px'}} onClick={()=>this.showPermission(record.username.toLowerCase(),record.id)}>{_intl.get('sub.permission')}</Button>
                {/*<DeleteBalloon handleRemove={() => this.handleRemove(record.id)}/>*/}
              </span>
              )
            }}
          />
        </Table>
        </div>
        }
        {
          showPer&&
          <Permission username={username} id={id} updateSub={this.updateSub} goBack={this.goBack}/>
        }
      </div>

    );
  }
}
const mapStateToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}
const mapDispatchToProps = dispatch => {
  return {
    stopRedDot:()=>dispatch(getStopRedDot(false)),
  }
};

export default connect(mapStateToProp,mapDispatchToProps)(CustomTable);

const styles = {
  noChecked:{
    color:'#999'
  },
  statusOk:{
    color:'rgb(46, 204, 113)'
  },
  statusNo:{
    color:'rgb(255, 118, 117)'
  }
};

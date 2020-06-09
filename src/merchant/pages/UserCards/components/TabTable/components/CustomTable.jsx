import React, { Component } from 'react';
import DeleteBalloon from '../components/DeleteBalloon';
import { Table ,Switch} from '@icedesign/base';
import {connect} from 'react-redux'
import {hasAction} from '../../../../../util'

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    _fetch({
      url:'/User/Usercards',
      data:{
        method:'getusercards',
      },
      success:(data)=>{
        this.setState({
          dataSource:data.data
        })
      }
    })
  };
  updateStatus = (cardid,status) => {
    _fetch({
      url:'/User/Usercards',
      data:{
        method:'updateusercard',
        cardid,
        status
      },
      success:()=>{
       this.getCards()
      }
    })
  };


  handleRemove = (cardid) => {
    _fetch({
      url:'/User/Usercards',
      data:{
        method:'delusercard',
        cardid
      },
      success:()=>{
        this.getCards()
      }
    })
  };
  render() {
    const {dataSource } = this.state;
    const {btn} = this.props;
    return(
      <Table dataSource={dataSource} hasBorder={false} >
        <Table.Column
          key='id'
          dataIndex='id'
          width={100}
          title={_intl.get('public.id')}
        />
        <Table.Column
          key='bank'
          dataIndex='bank'
          width={100}
          title={_intl.get('usercard.bank')}
          cell={(text)=>text.toUpperCase()}
        />
        <Table.Column
          key='number'
          dataIndex='number'
          width={150}
          title={_intl.get('usercard.number')}
        />
        <Table.Column
          key='holder'
          dataIndex='holder'
          width={100}
          title={_intl.get('usercard.holder')}
        />
        <Table.Column
          key='status'
          dataIndex='status'
          width={100}
          title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
          cell={(text,index,record)=>{
            if(!text){
              return <span style={styles.noChecked}>{_intl.get('usercard.0')}</span>
            }
            return <Switch disabled={!hasAction(btn,'Usercards_updateusercard')}  checked={text===1} onChange={()=>this.updateStatus(record.id,text===1?2:1)}/>
          }}
        />
        <Table.Column
          key='created'
          dataIndex='created'
          title={_intl.get('public.created')}
          width={200}
          // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
        />
        <Table.Column
          key='updated'
          dataIndex='updated'
          title={_intl.get('public.updated')}
          width={200}
          // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
        />
        <Table.Column
          key='action'
          title={_intl.get('public.action')}
          width={200}
          cell={(text,index,record)=>{
            return(
             hasAction(btn,'Usercards_delusercard')&&
             <DeleteBalloon
               handleRemove={() => this.handleRemove(record.id)}
             />
            )
          }}
        />
      </Table>
    );
  }
}

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

function mapStateToProps(state){
  return {
    btn: state.operation.btn,
    language:state.language,
  }
}

export default connect(mapStateToProps)(CustomTable)

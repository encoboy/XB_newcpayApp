import React, { Component } from 'react';
import DeleteBalloon from '../components/DeleteBalloon';
import UserDialog from '../components/UserDialog';
import { Table ,Switch} from '@icedesign/base';
import { connect } from 'react-redux';
import { hasAction } from '../../../../../util';

class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      userData:[]
    };
  }
  componentDidMount(){
    this.getCards();
    this.getUser();
  }
  getCards = () => {
    _fetch({
      url:'/Merchant/PG',
      data:{
        method:'allpgs',
      },
      success:(data)=>{
        console.log('allpgs',data);
        this.setState({
          dataSource:data.data
        })
      }
    })
  };
  updateStatus = (id,status) => {
    _fetch({
      url:'/Merchant/PG',
      data:{
        method:'setpgstatus',
        id,
        status
      },
      success:()=>{
       this.getCards()
      }
    })
  };


  handleRemove = (id) => {
    _fetch({
      url:'/Merchant/PG',
      data:{
        method:'deletepg',
        id
      },
      success:()=>{
        this.getCards()
      }
    })
  };

  // 得到用户数据
  getUser = () => {
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'getusers'
      },
      success:(data)=>{
        console.log('getusers',data);
        this.setState({
          userData:data.users
        })
      }
    })
  }

  render() {
    const {dataSource,userData } = this.state;
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
          key='holdername'
          dataIndex='holdername'
          width={100}
          title={_intl.get('pg.toname')}
        />
        <Table.Column
          key='bank'
          dataIndex='bank'
          width={100}
          title={_intl.get('pg.tobank')}
          cell={text=>text.toUpperCase()}
        />
        <Table.Column
          key='account'
          dataIndex='account'
          width={100}
          title={_intl.get('pg.toaccount')}
        />
        {hasAction(btn,'Modify_Bank_PG')&&<Table.Column
          key='status'
          dataIndex='status'
          width={100}
          title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
          cell={(text,index,record)=>{
            if(!text){
               return (<span style={styles.noChecked}>{_intl.get('usercard.0')}</span>)
            }
            return (<Switch checked={text===1} onChange={()=>this.updateStatus(record.id,text===1?9:1)}/>)
          }}
        />}
        <Table.Column
          key='created'
          dataIndex='created'
          title={_intl.get('public.created')}
          width={150}
          // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
        />
        <Table.Column
          key='updated'
          dataIndex='updated'
          title={_intl.get('public.updated')}
          width={150}
          // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
        />
        
        {hasAction(btn,'Delete_Bank_PG')&&<Table.Column
          key='action'
          title={_intl.get('public.action')}
          width={150}
          cell={(text,index,record)=>{
            return(
              <span>
                {/*<UserDialog userData={userData} id={record.id} getCards={this.getCards}/>*/}
                <DeleteBalloon
                  handleRemove={() => this.handleRemove(record.id)}
                />
              </span>  

            )
          }}
        />}
      </Table>
    );
  }
}
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStatToProp)(CustomTable)


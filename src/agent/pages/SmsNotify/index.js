import React, { Component } from 'react';
import { Table} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import EditDialog from './components/EditDialog/EditDialog';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { connect } from 'react-redux';
import {getActiveRedDot} from '../../redux/action';

class TabTable extends Component {
static displayName = 'TabTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      cacheParams:{},
    };
  }
  componentDidMount(){
    this.getCards();
    this.time = setInterval(()=>{
      this.getCards()
    },8000);
  }
  componentWillUnmount(){
    clearInterval(this.time)
  }
  getCards = () => {
    _fetch({
      url:'/Merchant/Banksms',
      data:{
        method:'banksmsnotifylist',
      },
      success:(data)=>{
        this.setState({
          dataSource:data.data
        })
      },
      error:(error)=>{
        clearInterval(this.time)
      }
    })
  };
  getFormValues = (values) => {
    _fetch({
      url:'/Merchant/Banksms',
      data:{
        method:'addbanksms',
        ...values
      },
      success:()=>{
        this.getCards();
        this.time = setInterval(()=>{
            this.getCards()
          },8000)
      }
    })
  };
  render() {
    const {dataSource} = this.state;
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
            key='account'
            dataIndex='account'
            width={100}
            title={_intl.get('notify.account')}
            cell={(text,index,record)=><div>{record.bank.toUpperCase()} {record.account}</div>}
          />
          <Table.Column
            key='phone'
            dataIndex='phone'
            width={100}
            title={_intl.get('notify.phone')}
          />
          <Table.Column
            key='type'
            dataIndex='type'
            width={100}
            title={_intl.get('notify.type')}
          />
          <Table.Column
          key='amount'
          dataIndex='amount'
          width={100}
          title={_intl.get('order.amount')}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('notify.status')}
            cell={(text)=><div style={styles[`status${text}`]}>{_intl.get(`notify.${text}`)}</div>}
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
            key='expire'
            dataIndex='expire'
            title={_intl.get('notify.expire')}
            width={100}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          <Table.Column
            key='action'
            dataIndex='action'
            title={_intl.get('public.action')}
            width={100}
            cell={(text,index,record)=>(
              <EditDialog
                record={record}
                onOpen={()=>{
                  this.props.activeRedDot();
                  clearInterval(this.time)
                }}
                onClose={()=>{
                  this.time = setInterval(()=>{
                    this.getCards()
                  },8000)
                }}
                getFormValues={this.getFormValues}
              />
            )}
          />
        </Table>
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
export default connect(null,mapDispatchToProps)(TabTable);
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

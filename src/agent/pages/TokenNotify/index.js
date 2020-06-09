import React, { Component } from 'react';
import { Table,Pagination} from '@icedesign/base';
import EditDialog from './components/EditDialog/EditDialog';
import IceContainer from '@icedesign/container';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { connect } from 'react-redux';
import {getActiveRedDot} from '../../redux/action';
// import Img from './components/Img/Img';

class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
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
      url:'/Merchant/Banktoken',
      data:{
        method:'banktokennotifylist',
      },
      success:(data)=>{
        this.setState({
          dataSource:data.data
        })
      },
      error:()=>{
        clearInterval(this.time)
      }
    })
  };
  getFormValues = (values) => {
    _fetch({
      url:'/Merchant/Banktoken',
      data:{
        method:'addbanktoken',
        ...values
      },
      success:()=>{
        this.getCards();
        this.time = setInterval(()=>{
            this.getCards()
          },8000);
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
            key='username'
            dataIndex='username'
            width={100}
            title={_intl.get('public.username')}
          />
          <Table.Column
            key='account'
            dataIndex='account'
            width={100}
            title={_intl.get('notify.account')}
            cell={(text,index,record)=><div>{record.bank.toUpperCase()} {record.account}</div>}
          />
          <Table.Column
            key='genre'
            dataIndex='genre'
            width={100}
            title={_intl.get('notify.type')}
            cell={(text)=>_intl.get(`bank.${text}`)}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('notify.status')}
            cell={(text)=><div style={styles[`status${text}`]}>{_intl.get(`notify.${text}`)}</div>}
          />
          {/*<Table.Column
            key='url'
            dataIndex='url'
            width={100}
            title='URL'
            cell={(text)=>{
                  return (text&&<Img text={text}/>)
            }}
          />*/}
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
export default connect(null,mapDispatchToProps)(CustomTable);

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

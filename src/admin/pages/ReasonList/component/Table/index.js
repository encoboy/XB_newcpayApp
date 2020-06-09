import React,{Component} from 'react'
import { Table, Pagination, Tab,Button,Switch } from '@icedesign/base';
import Form from '../SimpleFormDialog'
import Revise from '../Revise'

class ReasonTable extends Component{
  state = {
    data:[]
  };
  componentDidMount(){
      this.getData()
  }
  getData = () => {
    _fetch({
      url:'/Manager/Optional',
      data:{
        method:'optional',
      },
      success:(data)=>{
        this.setState({
          data:data.data
        })
      }
    })
  };
  update = (values) => {
    _fetch({
      url:'/Manager/Optional',
      data:{
        method:'updataoptional',
        ...values
      },
      success:()=>{
       this.getData()
      }
    })
  };
  deleteData = (id) => {
    _fetch({
      url:'/Manager/Optional',
      data:{
        method:'deloptional',
        id
      },
      success:()=>{
        this.getData()
      }
    })
  };
  render(){
    const {data} = this.state;
    return(
        <div>
          <Form onOk={this.getData} />
          <Table dataSource={data} hasBorder={false} >
            <Table.Column
              key='id'
              dataIndex='id'
              width={100}
              title={_intl.get('public.id')}
            />
            <Table.Column
              key='group'
              dataIndex='group'
              width={100}
              title={_intl.get('content.group')}
              cell={text=> text==='transfer'?_intl.get('orderTypes.5'):_intl.get('orderTypes.2')}
            />
            <Table.Column
              key='title_cn'
              dataIndex='title_cn'
              width={100}
              title={_intl.get('content.cnTitle')}
            />
            <Table.Column
              key='content_cn'
              dataIndex='content_cn'
              width={100}
              title={_intl.get('content.cnContent')}
            />
            <Table.Column
              key='title_en'
              dataIndex='title_en'
              width={100}
              title={_intl.get('content.enTitle')}
            />
            <Table.Column
              key='content_en'
              dataIndex='content_en'
              width={100}
              title={_intl.get('content.enContent')}
            />
            <Table.Column
              key='status'
              dataIndex='status'
              width={100}
              title={_intl.get('order.status')}
              cell={(text,index,record)=>(
                <Switch checked={text===1} onChange={()=>this.update({id:record.id,status:text===1?0:1})} />
              )}
            />

            <Table.Column
              key='created'
              dataIndex='created'
              title={_intl.get('public.created')}
              width={100}
              cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
            />
            <Table.Column
              key='updated'
              dataIndex='updated'
              title={_intl.get('public.updated')}
              width={100}
              cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
            />
            <Table.Column
              key='action'
              dataIndex='action'
              title={_intl.get('public.action')}
              width={100}
              cell={(text,index,record)=> (
                <div>
                  <Revise data={record}  onOk={this.getData}/>
                  <Button  type="normal" shape="text"  onClick={()=>this.deleteData(record.id)}>{_intl.get('public.delete')}</Button>
                </div>
              )}
            />
          </Table>
        </div>
    )
  }
}

export default ReasonTable

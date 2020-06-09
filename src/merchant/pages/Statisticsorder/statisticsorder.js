import React, { Component } from 'react';
import Form from './components/Form';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Container from '@icedesign/container';
import { Grid,Card ,moment} from '@icedesign/base';
import Item from './components/CardItem/CardItem'

const { Row, Col } = Grid;

export default class Order extends Component {
  static displayName = 'Order';

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }
  componentDidMount(){
    this.getData({dateone:moment(new Date()).format('YYYYMMDD')})
  };
  getData = (values)=>{
    _fetch({
      url:'/User/Order',
      data:{
        method:'statisticsorder',
        ...values
      },
      success:(data)=>{
        this.setState({
          data:data.data
        })
      }
    })
  };
  onReset=()=>{
    this.getData({dateone:moment(new Date()).format('YYYYMMDD')})
  };
  render() {
    const breadcrumb = [
      { text: '订单管理', link: '' },
      { text: '订单统计', link: '#/order/statisticsorder' },
    ];
    const {data} = this.state;
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Container>
          <Form onSubmit={this.getData} onReset={this.onReset}/>
          <div >
            <Row wrap>
              {
                data.map(function (item,index) {
                  return(
                    <Col key={index}  xxs="24" s={data.length>1?'12':'24'} style={{padding:'10px'}}>
                      <Card
                        style={{ width: '100%',boxShadow:'none',border:'1px solid #ececec',padding:'10px'}}
                        bodyHeight='auto'
                        title={_intl.get(`orderTypes.${item.ordertype}`)}
                        subTitle={`${item.querydate}，${_intl.get('OrderStatistics.update')} ${item.updated&& item.updated}`}
                        // titlePrefixLine={false}
                        // extra={<a href="#">Link &gt;</a>}
                      >
                        <Item data={item} />
                      </Card>
                    </Col>
                  )
                })
              }
              {
                !data.length&&
                <Col style={{textAlign:'center'}}>{_intl.get('OrderStatistics.emptyText')}</Col>
              }
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

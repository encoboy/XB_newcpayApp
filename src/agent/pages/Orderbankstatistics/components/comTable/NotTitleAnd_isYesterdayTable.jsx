import React, { Component } from 'react';
import { Button,Grid} from '@icedesign/base';
import './Todaycount.scss';
import Bank from './Bank';

const {Row,Col} = Grid;

// 页面显示的两种情况
// 因为初始化数据，和搜索今天的日期都会出现今天和昨天两天的数据的情况，
// 如果不是搜索今天的日期，而是搜索今天之前的日期只有一条数据。

// 是搜索，搜索的是今天的日期 或者 是初始化得到的数据  显示的是昨天的日期，
// 这个页面是没有title的。
// NotTitleAnd_isYesterdayTable
// 这个页面和DisplayTodayHaveTitle页面是一起显示的。

export default class Index extends Component {
  static displayName = 'Deposit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const {item} = this.props;
    return (
            
          <Col span='12'>
                <div
                className="demo-col-inset"
                style={{ height: "100%", lineHeight: "80px" }}
                >
                <Row>
                    <Col span='24' className="demo-col3">
                        <div>
                            {item.querydate}
                            <Button type="primary" style={styles.recalculation} 
                            onClick={()=>this.props.recalculation(item.ordertype,item.querydate)}>
                            {_intl.get('bankstatistics.recalculation')}
                        </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span='24' className="demo-col3">
                                {_intl.get("bankstatistics.init")}{item.init_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.pending")}{item.pending_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.processing")}{item.processing_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.cancel")}{item.cancel_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.fail")}{item.fail_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.error")}{item.error_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.success")}{item.success_count}&nbsp;&nbsp;
                                {_intl.get("bankstatistics.total")}{item.total_count}
                    </Col>
                </Row>
                <Row>
                    <Col span='24' className="demo-col3">
                                {_intl.get("bankstatistics.in")}{item.rate.in}%&nbsp;&nbsp;
                                {_intl.get("bankstatistics.success")}{item.rate.success}%&nbsp;&nbsp;
                                {_intl.get("bankstatistics.fail")}{item.rate.fail}%&nbsp;&nbsp;
                                {_intl.get("bankstatistics.error")}{item.rate.error}%
                    </Col>
                </Row>
                <Row>
                    <Col span='24' className="demo-col3">
                        <Bank data={item.data}/>
                    </Col>
                </Row>
                <Row>
                    <Col span='24' className="demo-col3">{item.success_amount}</Col>
                </Row>
                <Row>
                    <Col span='24' className="demo-col5">{item.updated&&item.updated}</Col>
                </Row>
            </div>
        </Col>
       
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

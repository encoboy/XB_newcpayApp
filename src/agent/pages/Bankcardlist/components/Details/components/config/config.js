import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import EditDialog from './components/EditDialog/EditDialog'
import Details from '../../../../../../components/Details/Details';

const {Item} = Details;
const { Row, Col } = Grid;

export default class RealTimeOverview extends Component {
  static displayName = 'RealTimeOverview';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
  }
  componentDidMount(){
   this.getConfig()
  }
  getConfig  = () => {
    _fetch({
      url:'/Merchant/Userconfig',
      data:{
        method:'userconfig',
        userid:this.props.id
      },
      success:(data)=>{
        console.log(data);
        data.data.limit_bank = data.data.limit_bank.map(item => item.toUpperCase());
        this.setState({
          data:data.data
        })
      }
    })
  };
  getFormValues = (values) => {
    _fetch({
      url:'/Merchant/Userconfig',
      data:{
        method:'updateuserconfig',
        userid:this.props.id,
        ...values
      },
      success:()=>{
        this.getConfig()
      }
    })
  };
  render() {
    const {data} = this.state;
    return (
      <IceContainer>
        <EditDialog
          record={data}
          getFormValues={this.getFormValues}
        />
        <IceContainer>
          <Details  dataSource={data}>
            {/*<Item
              title={_intl.get('walletinfo.transfer_check')}
              dataIndex='transfer_check'
            />*/}
            <Item
              title={_intl.get('walletinfo.allow_credit')}
              dataIndex='allow_credit'
            />
            <Item
              title={_intl.get('walletinfo.limit_bank')}
              dataIndex='limit_bank'
              render={(text)=>text&&text.toString().toUpperCase()}
            />
            <Item
              title={_intl.get('walletinfo.total_withdraw')}
              dataIndex='total_withdraw'
            />
            <Item
              title={_intl.get('walletinfo.deposit_limit')}
              dataIndex='deposit_limit'
              render={(text,record)=>(
                <span>{record.deposit_min}～{record.deposit_max}</span>
              )}
            />
            <Item
              title={_intl.get('walletinfo.deposit_rate')}
              dataIndex= 'deposit_rate'
              render={text=>`${text}%`}
            />
            <Item
              title={_intl.get('walletinfo.transfer_limit')}
              dataIndex='transfer_limit'
              render={(text,record)=>(
                <span>{record.transfer_min}～{record.transfer_max}</span>
              )}
            />
            <Item
              title={_intl.get('walletinfo.transfer_fee')}
              dataIndex='transfer_rate'
              render={text=>`${text}%`}
            />
            <Item
              title={_intl.get('walletinfo.limit_withdraw_times')}
              dataIndex='limit_withdraw_times'
            />
            <Item
              title={_intl.get('walletinfo.limit_withdraw_amount')}
              dataIndex='limit_withdraw_amount'
              render={(text,record)=>(
                <span>{record.limit_withdraw_min}～{record.limit_withdraw_max}</span>
              )}
            />
            <Item
              title={_intl.get('walletinfo.limit_subaccount')}
              dataIndex='limit_subaccount'
            />
            <Item
              title={_intl.get('walletinfo.limit_card')}
              dataIndex='limit_card'
            />
          </Details>
        </IceContainer>
      </IceContainer>
    );
  }
}

const styles = {
  dataItem: {
    display: 'flex',
    flexBasis: '50%',
    padding: '20px',
    alignItems: 'center',
  },
  dataItemImg: {
    width: '58px',
    height: '58px',
    marginRight: '30px',
  },
  dataItemUnit: {
    height: '72px',
    display: 'flex',
    flexBasis: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  unitTitle: {
    color: '#666',
    fontSize: '12px',
  },
  unitAmount: {
    color: '#333',
    fontSize: '24px',
    wordBreak:'break-all'
  },
  unitFooter: {
    color: '#999',
    fontSize: '12px',
  },
};

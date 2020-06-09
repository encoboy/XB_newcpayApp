import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import Details from '../../../../components/Details/Details';
import './Info.scss';

const {Item} = Details;

export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{}
    }
  }
  componentDidMount(){
    _fetch({
      url:'/Merchant/MerchantWallet',
      data:{
        method:'getwallet'
      },
      success:(data)=>{
        this.setState({
          data:data.data?data.data:{}
        })
      }
    })
  }
  render() {
    const { data } = this.state;
    return (
      <div className="info-display-table" >
        <IceContainer>
          <Details
            dataSource={data}
          >
            <Item
              title={_intl.get('walletinfo.status')}
              dataIndex='status'
              render={text => _intl.get(`walletinfo.${text}`)}
            />
            <Item
              title={_intl.get('walletinfo.balance')}
              dataIndex='balance'
            />
            <Item
              title={_intl.get('walletinfo.allow_credit')}
              dataIndex='allow_credit'
            />
            <Item
              title={_intl.get('walletinfo.total_withdraw')}
              dataIndex='total_withdraw'
            />
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.limit_bank')}*/}
              {/*dataIndex='limit_bank'*/}
              {/*render={(text,record)=>text&&text.toUpperCase()}*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.deposit_limit')}*/}
              {/*dataIndex='deposit_limit'*/}
              {/*render={(text,record)=>(*/}
                {/*<span>{record.deposit_min}～{record.deposit_max}</span>*/}
              {/*)}*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.deposit_rate')}*/}
              {/*dataIndex='deposit_rate'*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.transfer_limit')}*/}
              {/*dataIndex='transfer_limit'*/}
              {/*render={(text,record)=>(*/}
                {/*<span>{record.transfer_min}～{record.transfer_max}</span>*/}
              {/*)}*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.transfer_fee')}*/}
              {/*dataIndex='transfer_rate'*/}
            {/*/>*/}
            {/*<Item*/}
            {/*title={_intl.get('walletinfo.allow_credit')}*/}
            {/*dataIndex='allow_credit'*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.limit_withdraw_times')}*/}
              {/*dataIndex='limit_withdraw_times'*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.limit_withdraw_amount')}*/}
              {/*dataIndex='limit_withdraw_amount'*/}
              {/*render={(text,record)=>(*/}
                {/*<span>{record.limit_withdraw_min}～{record.limit_withdraw_max}</span>*/}
              {/*)}*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.limit_card')}*/}
              {/*dataIndex='limit_card'*/}
            {/*/>*/}
            {/*<Item*/}
              {/*title={_intl.get('walletinfo.limit_subaccount')}*/}
              {/*dataIndex='limit_subaccount'*/}
            {/*/>*/}
          </Details>
        </IceContainer>
      </div>
    );
  }
}



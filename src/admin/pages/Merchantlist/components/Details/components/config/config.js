import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import EditDialog from './components/EditDialog/EditDialog';
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
      url:'/Manager/Merchantconfig',
      data:{
        method:'merchantconfig',
        merchantid:this.props.id
      },
      success:(data)=>{
        console.log(data);
        this.setState({
          data:data.data
        })
      }
    })
  };
  getFormValues = (values) => {
    _fetch({
      url:'/Manager/Merchantconfig',
      data:{
        method:'updatemerchantconfig',
        merchantid:this.props.id,
        ...values
      },
      success:(data)=>{
        console.log('updatemerchantconfig',data)
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
            <Item
              title={_intl.get('walletinfo.deposit_rate')}
              dataIndex='deposit_rate'
              render={(text)=>`${text}%`}
            />
            <Item
              title={_intl.get('walletinfo.transfer_rate')}
              dataIndex='transfer_rate'
              render={(text)=>`${text}%`}
            />
            <Item
              title={_intl.get('walletinfo.withdraw_rate')}
              dataIndex='withdraw_rate'
              render={(text)=>`${text}%`}
            />
            <Item
              title={_intl.get('walletinfo.manual_handling')}
              dataIndex='transfer_manual'
              render={(text)=>text===0?_intl.get('walletinfo.no'):_intl.get('walletinfo.yes')}
            />
            <Item
              title={_intl.get('public.pgseverswitch')}
              dataIndex='pg_control'
              render={(text)=>text===1?_intl.get('walletinfo.open'):_intl.get('walletinfo.close')}
            />
            <Item
            title={_intl.get('public.agentApi')}
            dataIndex='api_url'
            render={(text)=>text}
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

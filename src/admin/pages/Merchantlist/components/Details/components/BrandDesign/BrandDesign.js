/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button,Field, Feedback ,Dialog,DatePicker,moment} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './BrandDesign.scss';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import Details from '../../../../../../components/Details/Details';
import EditDialog from './components/EditDialog';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
const {Item} = Details;


 class BrandDesign extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
    this.field = new Field(this);
  }

  componentDidMount(){
      this.getBrandData();
  }

  // 获取当前的品牌的数据
  getBrandData = () => {
    const {id} = this.props;
    _fetch({
      url:'/Manager/Merchantconfig',
      data:{
        method:'brandsetting',
        merchantid:id
      },
      success:(data)=>{
        console.log('brandsetting',data);
        this.setState({
          data:data.data
        })
      }
    })
  }

  // 更新品牌
  updateBrandData = (values) => {
    logo_fetch({
      url:'/Manager/Merchantconfig',
      data:{
        method:'updatebrandsetting',
        ...values
      },
      success:(data)=>{
        console.log('updatebrandsetting',data);
        Toast.success(_intl.get('usercard.tip'));
        this.getBrandData();
      }
    })
  }


  render() {
    const {btn} = this.props;
    const {data} = this.state;
    return (
      <div className="user-form">
        <EditDialog
          data={data}
          updateBrandData={this.updateBrandData}
        />
        <IceContainer>
          <Details  dataSource={data}>
            <Item
              title={_intl.get('BrandDesign.domain')}
              dataIndex='domain'
            />
            <Item
              title={_intl.get('BrandDesign.title')}
              dataIndex='title'
            />
            {/*<Item
              title={_intl.get('BrandDesign.description')}
              dataIndex='description'
            />
            <Item
              title={_intl.get('BrandDesign.keyWords')}
              dataIndex='keywords'
            />*/}
            <Item
              title={_intl.get('BrandDesign.favicon')}
              dataIndex='favicon'
              render={(text)=>{
                return(
                  <div>
                    <img src={text} style={{width:'100px',height:'50px'}}/>
                     <span style={{color:'red',marginLeft:'10px'}}>{_intl.get('error.error_size')}</span>
                  </div>
                )
              }}
            />
            <Item
              title={_intl.get('BrandDesign.logo')}
              dataIndex='logo'
              render={(text)=>{
                return(
                  <div>
                    <img src={text} style={{width:'100px',height:'50px'}}/>
                    <span style={{color:'red',marginLeft:'10px'}}>{_intl.get('BrandDesign.faviconImgSize')}</span>
                  </div>
                )
              }}
            />
            <Item
              title={_intl.get('BrandDesign.setBrand')}
              dataIndex='set_brand'
            />
          </Details>
        </IceContainer>
      </div>
    );
  }
}

const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStatToProp)(BrandDesign)

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 15,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  buttonfloat:{
    float:'right'
  },
  formwith:{
    width:'500px',
    marginLeft:'200px'
  },
  frontLogo:{
      width:'300px',
      height:'100px',
      margin:'0 0 20px 97px',
  },
  newImg:{
    height:'100px',
    width:'200px',
    marginRight:'50px'
  },
  notNewImg:{
    height:'100px',
    width:'200px',
    diplay:'none'
  },
  waringFont:{
    color:'red',
    marginLeft:'10px',
    fontSize:'10px'
  }
};
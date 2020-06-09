/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback,Field } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './Pgaddmerchant.scss';
import {hasAction} from '../../util';
import {connect} from 'react-redux';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
class Addmerchant extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
        merchantlist:[]
    };
    this.field = new Field(this);
  }

  componentDidMount(){
    this.getMerchant();
  }
  getMerchant = () => {
      _fetch({
          url:'/Merchant/PG',
          data:{
              method:'getpgbank'
          },
          success:(data)=>{
              console.log(data);
              this.setState({
                  merchantlist:data.data
              })
          },
          error:(error)=>{
              console.log(error);
          }
      })
  }

  render() {
    const {merchantlist} = this.state;
    const {btn} = this.props;
    const init = this.field.init;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
            <h2 style={styles.formTitle}>{_intl.get('sider.pg_addmerchant')}</h2>
            <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              {_intl.get('pg.selectmerchant')}：
            </Col>
            <Col xxs="16" s="12" l="10">
            <Select style={{width:'100%'}}>
                {
                    merchantlist.map(function (item,index) {
                    return(
                    <Select.Option key={index} value={item}>{item}</Select.Option>
                    )
                })
                }
            </Select>
              <IceFormError name="toname" />
            </Col>
          </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

export default class Pgaddmerchant extends Component {
    static displayName = 'CreatePG';
  
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      const breadcrumb = [
        { text: 'PG管理', link: '' },
        { text: '添加PG', link: '#/PG/create' },
      ];
      return (
        <div className="create-user-page">
          <CustomBreadcrumb dataSource={breadcrumb} />
          <Addmerchant  history={this.props.history} />
        </div>
      );
    }
  }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     btn: state.operation.btn,
//     language:state.language
//   }
// }
// export default connect(mapStateToProps)(Pgaddmerchant)

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
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
};
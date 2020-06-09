/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback,Select,Dialog,Icon } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux'
import './AddBtnOperation.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

 class BtnOperation extends Component {
  static displayName = 'BtnOperation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      btnoperate:{},
      visible: false,

    };
  }

  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };



  validateAllFormField = () => {
    this.setState({
      visible: false
    });
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      // 添加页面权限
      const operationArr = values.operations;
      _fetch({
        url:'/Manager/Operations',
        data:{
          method:"addoperategroup",
          name:values.name,
          operations:operationArr.join('|'),
        },
        success:(data)=>{
          console.log('addoperategroups添加页面权限',data);

          Toast.success(_intl.get('userJurisdiction.addRightSuccess'));
          this.props.getButtonOperationGroups();
        }
      })
    });
  };

  handleChange=(value)=> {
    console.log(value);
  }

  componentDidMount(){
  }

  render() {
 
    const {action,btnOperationArr,btnName,btnoperate} = this.props;
    // 构造选择的权限数组
    console.log(btnoperate);
    let dataSource = [];
    for(let key in btnoperate){
      dataSource.push({value:btnoperate[key],label:_intl.get(`operation.${btnoperate[key]}`)});
    }
    return (
      <span>
        <Button onClick={this.onOpen} style={{marginRight:'15px'}}>
          <Icon type="add" />{_intl.get('public.addgroups')}
        </Button>
        <Dialog
          visible={this.state.visible}
          onOk={this.validateAllFormField}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('userJurisdiction.editOperationRight')}
        >
        <IceContainer>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
  
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="5" style={styles.formLabel}>
            {_intl.get('sub.permission')}：
            </Col>
            <Col xxs="16" s="10" l="7">
              <IceFormBinder
                name="operations"
                rules={[
                  {required:true,message:_intl.get('public.required')}
                ]}
              >
              <Select multiple  onChange={this.handleChange} dataSource={dataSource} style={{width: 300}} />
              </IceFormBinder>
              <IceFormError name="operations" />
            </Col>
          </Row>
          <Row>
            <Col xxs="6" s="4" l="5" style={styles.formLabel}>
            {_intl.get('public.name')}：
            </Col>
            <Col xxs="16" s="10" l="7">
              <IceFormBinder
                name="name"
                rules={[
                  {required:true,message:_intl.get('public.required')},
                  {min:1,max:10,message:_intl.get('public.onetoten')}
                ]}
              >
              <Input   style={{width: 300}} placeholder={_intl.get('userJurisdiction.pleaseRightName')}/>
              </IceFormBinder>
              <IceFormError name="name" />
            </Col>
          </Row>
           
          </div>
          </IceFormBinderWrapper>
        </IceContainer>
        </Dialog>
      </span>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language:state.language,
    btn:state.operation.btn
  }
};

export default connect(mapStateToProps)(BtnOperation)

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

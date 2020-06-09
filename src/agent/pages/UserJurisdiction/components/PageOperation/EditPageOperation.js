/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Form,Field,Grid, Button, Feedback,Select,Dialog,Icon } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux'
import './EditPageOperation.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
const FormItem = Form.Item;

 class PageOperation extends Component {
  static displayName = 'PageOperation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pageoperate:{},
      visible: false,
      isMobile: false,
    };
    this.field = new Field(this);
  }

  onOpen = (data) => {
      console.log(data);
    this.field.setValues({ ...data });
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  showDialog = (data) => {
    this.field.setValues({ ...data });
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false
    },()=>{
      this.field.reset()
    });
  };



  validateAllFormField = () => {
    this.field.validate((error,values) => {
      if (error) {
        return;
      }
      // 添加/编辑页面权限
      console.log(values);
      const {id} = this.props;
      const operationArr = values.operations;
      _fetch({
        url:'/Merchant/Operations',
        data:{
          method:"updateoperationgroup",
          name:values.name,
          operations:operationArr.join('|'),
          id
        },
        success:(data)=>{
          console.log('addoperationgroups编辑页面权限',data);
          this.setState({
            visible: false
          });
          
          Toast.success(_intl.get('userJurisdiction.editRightSuccess'));
          this.props.getPageOprationGrops();
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
    const { isMobile } = this.state;
    const init = this.field.init;
    const {action,pageOperation,pageName,pageoperate} = this.props;
    // 构造选择的权限
    let dataSource = [];
    for(let key in pageoperate){
      dataSource.push({value:pageoperate[key],label:_intl.get(`sider.${pageoperate[key]}`)});
    }
    // 响应式处理
    if (isMobile) {
    simpleFormDialog.width = '300px';
    }
    const data = {
        name:pageName,
        operations:pageOperation
    }
    return (
     
      <span>
        <Button type="primary" shape="text" onClick={()=>this.onOpen(data)} >{_intl.get('public.compile')}</Button>
        <Dialog
          visible={this.state.visible}
          onOk={this.validateAllFormField}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('userJurisdiction.editPageRight')}
        >
        <Form direction="ver" field={this.field } labelAlign='top'>
          <div>
            <FormItem label={_intl.get('userJurisdiction.right')} >
              <Select multiple {...init('operations',{
                rules:[
                  {required:true,message:_intl.get('public.required') },
                ]})}  style={{width: 300}} dataSource={dataSource}/>
            </FormItem>
            <FormItem label={_intl.get('userJurisdiction.name')} >
              <Input {...init('name',{
                rules:[
                  {required:true,message:_intl.get('public.required') },
                ]})} style={{width: 300}} placeholder={_intl.get('userJurisdiction.pleaseRightName')}/>
            </FormItem>
          </div>
        </Form>
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

export default connect(mapStateToProps)(PageOperation)

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
  simpleFormDialog: { width: '640px' },
};

/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback,Select,Dialog,Icon } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {connect} from 'react-redux'
import './BindUserDialog.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

 class BindUserDialog extends Component {
  static displayName = 'BindUserDialog';

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
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      const {accountid} = this.props;
      console.log(values)
      _fetch({
        url:'/Merchant/Bankaccount',
        data:{
          method:"settomerchant",
          accountid,
          userid:values.userid
        },
        success:(data)=>{
          console.log('settomerchant',data);
          this.setState({
            visible: false
          });
          if(values.userid==0){
            Toast.success(_intl.get('pg.noBindSuccess'));
          }else{
            Toast.success(_intl.get('pg.bindSuccess'));
          }
        }
      })
    });
  };


  componentDidMount(){
  }

  render() {
 
    const {userData} = this.props;
    const dataSource =[{label:_intl.get('pg.noBind'),value:0}];
    for(let i =0;i<userData.length;i++){
        dataSource.push({label:userData[i].username,value:userData[i].id});
    }
    return (
      <span>
        <Button   onClick={this.onOpen}  style={{backgroundColor:'green',color:'white',marginRight:'5px'}}>
          {_intl.get('pg.username')}
        </Button>
        <Dialog
          visible={this.state.visible}
          onOk={this.validateAllFormField}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('pg.selectName')}
        >
        <IceContainer>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
  
          {/*<Row style={styles.formItem}>
            <Col xxs="6" s="4" l="6" style={styles.formLabel}>
            {_intl.get('pg.user')}：
            </Col>
            <Col xxs="16" s="15" l="6">
              <IceFormBinder
                name="userid"
                rules={[
                  {required:true,message:_intl.get('public.required')}
                ]}
              >
                <Select  onChange={this.handleChange} dataSource={dataSource} style={{width: 200}} />
              </IceFormBinder>
              <IceFormError name="userid" />
            </Col>
              </Row>*/}
              <div style={{marginBottom:'10px'}}>{_intl.get('pg.user')}:</div>
              <div>
                <IceFormBinder
                  name="userid"
                  rules={[
                    {required:true,message:_intl.get('public.required')}
                  ]}
                  >
                <Select  onChange={this.handleChange} dataSource={dataSource} style={{width: 300}} />
                </IceFormBinder>
                <IceFormError name="userid" />
              </div> 
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

export default connect(mapStateToProps)(BindUserDialog)

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

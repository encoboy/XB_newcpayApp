import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Feedback} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import sha1 from 'sha1'


const FormItem = Form.Item;
const Toast = Feedback.toast;


export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
      isMobile: false,
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
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

  onOk = () => {
    this.field.validate((error,values) => {
      if (error) {
        return;
      }
      this.hideDialog();
      const {merchantid,username} = this.props;
      _fetch({
        url:'/Manager/Merchant',
        data:{
          method:'updatepassword',
          merchantid,
          newpass:sha1(username+sha1(username+values.newpass))
        },
        success:()=>{
          Toast.success(_intl.get('public.success'))
        }
      })

    });
  };
  render() {

    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    const {data} = this.props;
    return (
      <span >
           <Dialog
             className="simple-form-dialog"
             style={styles.simpleFormDialog}
             autoFocus={false}
             footerAlign="center"
             title={_intl.get('sub.rpwd')}
             {...this.props}
             onOk={this.onOk}
             onCancel={this.hideDialog}
             onClose={this.hideDialog}
             // isFullScreen
             visible={this.state.visible}
           >
                 <Form direction="ver" field={this.field } labelAlign='top'>
                      <FormItem label={_intl.get('public.password')}>
                             <Input
                               htmlType='password'
                               {...init('newpass',{
                                 rules:[
                                   {required:true,min:5,max:15,message:_intl.get('profile.nmin')}
                                 ]
                               })}
                             />
                      </FormItem>
                 </Form>
            </Dialog>
            <Button  type='primary' onClick={()=>this.showDialog(data)}>
            {_intl.get('sub.rpwd')}
            </Button>
      </span>
    );
  }
}


const styles = {
  simpleFormDialog: { width: '640px',marginRight:'5px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};

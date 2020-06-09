import React, { Component } from 'react';
import { Dialog, Button,Form,Field ,Select} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;

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
      _fetch({
        url:'/Merchant/Userwithdraw',
        data:{
          method:'changestatus',
          withdrawid:this.props.data.id,
          ...values
        },
        success:()=>{
          this.props.onOk();
        }
      });

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
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title={_intl.get('public.revise')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          // isFullScreen
          visible={this.state.visible}
          // language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
            <FormItem label={_intl.get('withdraw.status')}>
              <Select style={{width:'100%'}}   {...init('status',{rules:{required:true,message:_intl.get('public.required')}})}>
                <Select.Option value="pending">{_intl.get('status.pending')}</Select.Option>
                <Select.Option value="processing">{_intl.get('status.processing')}</Select.Option>
              </Select>
            </FormItem>
            {/*<FormItem label={_intl.get('public.code')} >*/}
              {/*<Input   {...init("code",{rules:[{required:true,message:_intl.get('public.required')}]})}  />*/}
            {/*</FormItem>*/}
          </Form>
        </Dialog>
        <Button type="primary" onClick={()=>this.showDialog(data)}>
          {_intl.get('public.revise')}
        </Button>
      </span>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};

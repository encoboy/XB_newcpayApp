import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field ,Select,Feedback} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;
const Toast = Feedback.toast;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const {field ,onOk} = this.props;
      _fetch({
        url:'/Merchant/Bankaccount',
        data:{
          method:'updateaccount',
          field,
          value:values[field],
          accountid:values.accountid
        },
        success:()=>{
          Toast.success(_intl.get('public.success'));
          onOk();
        }
      });
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isMobile } = this.state;
    const init = this.field.init;
    const { record,field } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    // 响应式处理
    if (isMobile) {
      styles.editDialog.width = '300px';
    }
    return (
      <span >
        <Button
          size="small"
          type="primary"
          shape='text'
          style={{marginLeft:'5px'}}
          onClick={() => this.onOpen(record)}
        >
          {_intl.get('public.revise')}
        </Button>
        <Dialog
          style={{ width: styles.editDialog.width }}
          visible={this.state.visible}
          footerAlign="center"
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('public.revise')}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
            {
              field==='type'&&
              <FormItem label={_intl.get('bank.type')} {...formItemLayout}>
                <Select
                  {...init('type', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                  style={{width:'100%'}}
                >
                  <Select.Option value="2">{_intl.get('bank.2')}</Select.Option>
                  <Select.Option value="3">{_intl.get('bank.3')}</Select.Option>
                  <Select.Option value="4">{_intl.get('bank.4')}</Select.Option>
                </Select>
              </FormItem>
            }
            {
              field==='genre'&&
              <FormItem label={_intl.get('bank.genre')} {...formItemLayout}>
                <Select
                  {...init('genre', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                  style={{width:'100%'}}
                >
                  <Select.Option value="personal">{_intl.get('bank.personal')}</Select.Option>
                  <Select.Option value="enterprise">{_intl.get('bank.enterprise')}</Select.Option>
                  <Select.Option value="corporatelite">{_intl.get('bank.corporatelite')}</Select.Option>
                </Select>
              </FormItem>
            }
            {
              field==='task_config'&&
              <FormItem label={_intl.get('bank.config')} {...formItemLayout}>
                <Input
                  {...init('task_config', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                />
              </FormItem>
            }
            {
              field==='limit_transfer'&&
              <FormItem label={_intl.get('bank.limit_transfer')} {...formItemLayout}>
                <Input
                  {...init('limit_transfer', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                />
              </FormItem>
            }
            {
              field==='limit_times'&&
              <FormItem label={_intl.get('bank.limit_times')} {...formItemLayout}>
                <Input
                  {...init('limit_times', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                />
              </FormItem>
            }
            {
              field==='otptype'&&
              <FormItem label={_intl.get('bank.otp')} {...formItemLayout}>
                <Select
                  {...init('otptype', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                  style={{width:'100%'}}
                >
                  <Select.Option value="0">{_intl.get('bank.sms')}</Select.Option>
                  <Select.Option value="1">{_intl.get('bank.token')}</Select.Option>
                </Select>
              </FormItem>
            }
          </Form>
        </Dialog>
      </span>
    );
  }
}

const styles = {
  editDialog: {
    width:'640px',
    display: 'inline-block',
    marginRight: '5px',
  },
};

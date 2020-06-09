import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Icon,Grid ,Radio,Switch} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isMobile: false,
      pg_control:''
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
        console.log('Errors in form!!!sasa');
        return;
      }
      if(values.pg_control){
        values.pg_control = 1;
      }else{
        values.pg_control = 2;
      }
      this.props.getFormValues(values);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (record) => {
    if(record.pg_control==1){
      this.setState({pg_control:true});
    }else{
      this.setState({pg_control:false});
    }
    console.log(record);
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
    const { isMobile,pg_control } = this.state;
    const init = this.field.init;
    const { record } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
    // 响应式处理
    if (isMobile) {
      styles.editDialog.width = '300px';
    }
    return (
      <div style={styles.editDialog}>
        <Button
          type="primary"
          onClick={() => this.onOpen(record)}
        >
          <Icon type='edit'/>
          {_intl.get('public.compile')}
        </Button>
        <Dialog
          style={{ width: styles.editDialog.width }}
          visible={this.state.visible}
          footerAlign="center"
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('public.compile')}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
            <FormItem label={_intl.get('walletinfo.transfer_rate')} {...formItemLayout}>
              <Input
                addonAfter='%'
                {...init('transfer_rate', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.deposit_rate')} {...formItemLayout}>
              <Input
                addonAfter='%'
                {...init('deposit_rate', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.withdraw_rate')} {...formItemLayout}>
              <Input
                addonAfter='%'
                {...init('withdraw_rate', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.manual_handling')} {...formItemLayout}>
              <RadioGroup  {...init("transfer_manual",{rules:[{required:true,message:_intl.get('public.required')}]})}>
                <Radio value={1}>{_intl.get('walletinfo.yes')}</Radio>
                <Radio value={0}>{_intl.get('walletinfo.no')}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label={_intl.get('public.pgseverswitch')} {...formItemLayout}>
              <Switch defaultChecked={pg_control}
                {...init('pg_control', {
                  rules: [{ required: true, message: _intl.get('public.required')}],
                })}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    width:'640px',
    display: 'inline-block',
    marginLeft: '18px',
  },
};

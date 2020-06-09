import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {hasAction} from '../../../../util';
import {connect} from 'react-redux';

const FormItem = Form.Item;

class EditDialog extends Component {
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

      const { record } = this.props;
      this.props.getFormValues({...record,...values},()=>{
        this.setState({
          visible: false,
        });
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
    const {btn} = this.props;
    // console.log(btn)
    // console.log(hasAction(btn,'BankJournal_changejournal'));
    const { isMobile } = this.state;
    const init = this.field.init;
    const { record } = this.props;
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
      <div style={styles.editDialog}>
        {hasAction(btn,'BankJournal_changejournal')&&<Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(record)}
        >
          {_intl.get('public.compile')}
        </Button>}
        <Dialog
          style={{ width: styles.editDialog.width }}
          footerAlign="center"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('public.compile')}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
            <FormItem label={_intl.get('journal.sender_name')} {...formItemLayout}>
              <Input
                {...init('sender_name', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('journal.cheque_number')} {...formItemLayout}>
              <Input
                {...init('cheque_number', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('journal.other_payment_details')} {...formItemLayout}>
              <Input
                {...init('other_payment_details', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('journal.reference')} {...formItemLayout}>
              <Input
                {...init('reference', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('journal.description')} {...formItemLayout}>
              <Input
                {...init('description', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('journal.date')} {...formItemLayout}>
              <Input
                {...init('date', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
};

export default connect(mapStateToProps)(EditDialog);

const styles = {
  editDialog: {
    width:'640px',
    display: 'inline-block',
    marginRight: '5px',
  },
};
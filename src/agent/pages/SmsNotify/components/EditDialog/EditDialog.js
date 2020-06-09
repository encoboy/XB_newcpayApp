import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;

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

      const { record } = this.props;
      this.props.getFormValues({...record,...values});
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (record) => {
    this.props.onOpen();
    this.field.setValues({ ...record });
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    },()=>{
      this.props.onClose()
    });
  };

  render() {
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
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(record)}
        >
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
            <FormItem label={_intl.get('notify.tac')} {...formItemLayout}>
              <Input
                {...init('tac', {
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

const styles = {
  editDialog: {
    width:'640px',
    display: 'inline-block',
    marginRight: '5px',
  },
};

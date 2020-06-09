import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      merchant:[],
      visible: false,
      isMobile: false,
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
    // this.getMerchant();
  }
  getMerchant=()=>{
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'merchants',
      },
      success:(data)=>{
        this.setState({merchant:data.merchants});
      }
    });
  };
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
    // this.props.onOpen();
    this.getMerchant();
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
    const { isMobile,merchant } = this.state;
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
      <span>
        <Button
          size="small"
          type="normal"
          shape="text"
          style={{marginRight:'5px'}}
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
            <FormItem label={_intl.get('robot.merchant')} {...formItemLayout}>
              {/*<Input*/}
                {/*{...init('merchantid', {*/}
                  {/*rules: [{ required: true, message: _intl.get('public.required') }],*/}
                {/*})}*/}
              {/*/>*/}
              <Select  style={{width:'100%'}}
                       {...init('merchantid', {
                         rules: [{ required: true, message: _intl.get('public.required') }],
                       })}
              >
                {
                  merchant.map(function (item,index) {
                    return(
                      <Select.Option key={index} value={item.id}>{item.username.toUpperCase()}</Select.Option>
                    )
                  })
                }
              </Select>
            </FormItem>
            <FormItem label={_intl.get('robot.ip')} {...formItemLayout}>
              <Input
                {...init('ip', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('robot.port')} {...formItemLayout}>
              <Input
                {...init('port', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
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

import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Icon,Grid ,Radio,Checkbox} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isMobile: false,
      bank:[]
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
    this.getBank()
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };
  getBank = () => {
    _fetch({
      url:'/Merchant/Bank',
      data:{
        method:'getgrabbank',
      },
      success:(data)=>{
        this.setState({bank:data.data.map(item => item.toUpperCase() )})
      }
    })
  };
  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!sasa');
        return;
      }
      // values.deposit_rate += '%';
      // values.transfer_rate += '%';
      // const { record } = this.props;
      // console.log(values)
      values.limit_bank = values.limit_bank.join(',');
      this.props.getFormValues(values);
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
    const { isMobile,bank } = this.state;
    const init = this.field.init;
    const { record } = this.props;
    // console.log(record)
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
            <FormItem label={_intl.get('walletinfo.limit_bank')} {...formItemLayout}>
              {/*<Input*/}
                {/*{...init('limit_bank', {*/}
                  {/*rules: [{ required: true, message: _intl.get('public.required') }],*/}
                {/*})}*/}
              {/*/>*/}
              <CheckboxGroup
                dataSource={bank}
                {...init('limit_bank', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.deposit_limit')} {...formItemLayout}>
                <Row>
                  <Col span='11'>
                    <FormItem >
                      <Input
                        {...init('deposit_min', {
                          rules: [{ required: true, message: _intl.get('public.required') }],
                        })}
                      />
                    </FormItem>
                  </Col>
                  <Col span='2' style={{textAlign:'center'}}>～</Col>
                  <Col span='11'>
                    <FormItem>
                      <Input
                        {...init('deposit_max', {
                          rules: [{ required: true, message: _intl.get('public.required') }],
                        })}
                      />
                    </FormItem>
                  </Col>
                </Row>
            </FormItem>
            <FormItem label={_intl.get('walletinfo.deposit_rate')} {...formItemLayout}>
              <Input
                addonAfter='%'
                {...init('deposit_rate', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.transfer_limit')} {...formItemLayout}>
              <Row>
                <Col span='11'>
                  <FormItem >
                    <Input
                      {...init('transfer_min', {
                        rules: [{ required: true, message: _intl.get('public.required') }],
                      })}
                    />
                  </FormItem>
                </Col>
                <Col span='2' style={{textAlign:'center'}}>～</Col>
                <Col span='11'>
                  <FormItem>
                    <Input
                      {...init('transfer_max', {
                        rules: [{ required: true, message: _intl.get('public.required') }],
                      })}
                    />
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem label={_intl.get('walletinfo.transfer_fee')} {...formItemLayout}>
              <Input
                addonAfter='%'
                {...init('transfer_rate', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.allow_credit')} {...formItemLayout}>
              <Input
                {...init('allow_credit', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.limit_withdraw_times')} {...formItemLayout}>
              <Input
                {...init('limit_withdraw_times', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.limit_withdraw_amount')} {...formItemLayout}>
              <Row>
                <Col span='11'>
                  <FormItem >
                    <Input
                      {...init('limit_withdraw_min', {
                        rules: [{ required: true, message: _intl.get('public.required') }],
                      })}
                    />
                  </FormItem>
                </Col>
                <Col span='2' style={{textAlign:'center'}}>～</Col>
                <Col span='11'>
                  <FormItem>
                    <Input
                      {...init('limit_withdraw_max', {
                        rules: [{ required: true, message: _intl.get('public.required') }],
                      })}
                    />
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem label={_intl.get('walletinfo.limit_card')} {...formItemLayout}>
              <Input
                {...init('limit_card', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('walletinfo.limit_subaccount')} {...formItemLayout}>
              <Input
                {...init('limit_subaccount', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              />
            </FormItem>
            {/*<FormItem label={_intl.get('walletinfo.transfer_check')} {...formItemLayout}>
              <RadioGroup
                {...init('transfer_check', {
                  rules: [{ required: true, message: _intl.get('public.required') }],
                })}
              >
                <Radio  value={1}>
                  {_intl.get('public.yes')}
                </Radio>
                <Radio  value={2}>
                  {_intl.get('public.no')}
                </Radio>
              </RadioGroup>
              </FormItem>*/}
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

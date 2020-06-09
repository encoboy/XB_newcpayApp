import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Icon,Radio } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux';
const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;

class SimpleFormDialog extends Component {
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

  showDialog = () => {
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
        url:'/Merchant/Contact',
        data:{
          method:'addcontact',
          ...values
        },
        success:()=>{
          this.props.onOk();
        }
      });

    });
  };
  render() {
    const {btn} = this.props;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    return (
      <span>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title={_intl.get('bank.new')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          // isFullScreen
          visible={this.state.visible}
          language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
              <FormItem label={_intl.get('content.cnTitle')}>
               <Input
                 {...init('title_cn')}
               />
            </FormItem>
             <FormItem label={_intl.get('content.cnContent')}>
                <Input multiple   {...init('content_cn')} />
            </FormItem>
            <FormItem label={_intl.get('content.enTitle')}>
               <Input
                 {...init('title_en')}
               />
            </FormItem>
             <FormItem label={_intl.get('content.enContent')}>
                <Input multiple   {...init('content_en')} />
            </FormItem>
          </Form>
        </Dialog>
        {hasAction(btn,'Contact_addcontact')&&<Button type="primary" onClick={()=>this.showDialog()}>
            <Icon type="add" />
          {_intl.get('bank.new')}
        </Button>}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
}

export default connect(mapStateToProps)(SimpleFormDialog)

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};

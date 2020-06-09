import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field ,Icon,Feedback} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const FormItem = Form.Item;
const Toast = Feedback.toast;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      // key:[],
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


  onOpen = (record) => {
    this.setState({
      visible: true,
    });
    _fetch({
      url:'/Merchant/Robot',
      data:{
        method:'getrobotlog',
        robotid:this.props.id,
        since:0,
      },
      success:(data)=>{
        this.setState({data:data.log})
      }
    })
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isMobile ,data} = this.state;
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
          {_intl.get('robot.log')}
        </Button>
        <Dialog
          style={{ width: styles.editDialog.width }}
          visible={this.state.visible}
          footerAlign="center"
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('robot.log')}
        >
        <div dangerouslySetInnerHTML={{__html: data}} style={{whiteSpace:'pre-wrap',wordWrap:'break-word',lineHeight:'25px'}} />
        </Dialog>
      </span>
    );
  }
}

const styles = {
  editDialog: {
    width:'1000px',
    display: 'inline-block',
    marginRight: '5px',
  },
};

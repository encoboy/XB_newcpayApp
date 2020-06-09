import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field ,Icon,Feedback,Overlay } from '@icedesign/base';
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
    // this.enquireScreenRegister();
    this.onOpen();
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
    // this.field.setValues({ ...record });
    // this.setState({
    //   visible: true,

    // });
    _fetch({
      url:'/Manager/Robot',
      data:{
        method:'getrobotlog',
        robotid:this.props.id,
        // code:code,
        since:0,
        // ...values
      },
      success:(data)=>{
        this.setState({data:data.log})
      }
    })
  };

  // onClose = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // 弹层
  onClick() {
    this.setState({ visible: true });
  }
  onClose = reason => {
    console.log("onRequestClose emit!, reason: ", reason);
    this.setState({
      visible: false
    });
  };


  

  render() {

    const { isMobile ,data} = this.state;
    console.log(data)
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
      <span className="robotlog">
        {/*<Button
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
          onOk={this.onClose}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('robot.log')}
        >

        
        <div dangerouslySetInnerHTML={{__html: data}} style={{whiteSpace:'pre-wrap',wordWrap:'break-word',lineHeight:'25px'}} />
        </Dialog>*/}

        <Button
          size="small"
          type="primary"
          shape='text'
          style={{marginLeft:'5px'}}
          onClick={this.onClick.bind(this)} ref="target"
    
        >
          {_intl.get('robot.log')}
        </Button>
        <Overlay
        visible={this.state.visible}
        hasMask
        disableScroll
        align="cc cc"
        safeNode={() => this.refs.target}
        onRequestClose={this.onClose.bind(this)}
      >
      <div name="forml">
      <textarea name="content" id="content" readonly="readonly" cols="120" rows="50" value={data}></textarea>
      </div>
      
      </Overlay>

      </span>
    );
  }
}

const styles = {
  editDialog: {
    width:'1000px',
    // display: 'inline-block',
    marginRight: '5px',
  },
};

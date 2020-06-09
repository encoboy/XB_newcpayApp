import React, { Component } from 'react';
import { Dialog, Input, Radio, Button,Form,Field ,Feedback,Checkbox,Select,Overlay } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
// import './Addfinancerunwater.scss';
// import {connect} from 'react-redux';
// import {getUserInfo} from '../../../../util'

const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;
const Toast = Feedback.toast;

export default class Img extends Component {
  static displayName = 'img';
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
      isMobile: false,
      id:null,
      allname:[],
      shouldUpdatePosition:true
    };
    this.field = new Field(this);
  }
  componentDidMount() {

  }



 
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
    const { isMobile,allname } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    const {data,type} = this.props;
    return (
      <div style={styles.inlineBlock}>
      <Overlay
          visible={this.state.visible}
          hasMask
          disableScroll
          align="cc cc"
          safeNode={() => this.refs.target}
          onRequestClose={this.onClose.bind(this)}
        >
        <img id='imgbig' className='img' style={styles.img} src={this.props.text} ></img>
        </Overlay>
  <img style={{height:'32px'}}  src={this.props.text}  onClick={this.onClick.bind(this)}></img>
  </div>
    );
  }
}


const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  inlineBlock:{
    display:'inline',
  },
  img:{
    width:'1400px',
    height:'650px'
  }
};
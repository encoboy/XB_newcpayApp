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
      logo:'',
      favicon:'',
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
      console.log(values)
      const {logo,favicon} = this.state;
      let params = {
        ...values,
        logo,
        favicon
      }
      this.props.updateBrandData(params);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (data) => {
    console.log(data);
    this.field.setValues({ ...data });
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  // 得到logo图片数据
  getlogo = (e) => {
    let logo = e.target.files[0];
    let fr = new FileReader();
    fr.onload = function(){
      document.getElementById('logoimage').src=fr.result;
    }
    fr.readAsDataURL(logo);
    this.setState({
      logo:logo,
    })
  }

  // 得到favicon图片数据
  getfavicon = (e) => {
    let favicon = e.target.files[0];
    let fr = new FileReader();
    fr.onload = function(){
        document.getElementById('faviconimage').src=fr.result;
    }
    fr.readAsDataURL(favicon);
    this.setState({
      favicon:favicon,
    })
  }

  componentDidMount(){
  }

  render() {
    const { isMobile} = this.state;
    const init = this.field.init;
    const { data } = this.props;
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
          onClick={() => this.onOpen(data)}
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
            <FormItem label={_intl.get('BrandDesign.title')} {...formItemLayout}>
              <Input
                {...init('title', {
                  rules: [{}],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('BrandDesign.domain')} {...formItemLayout}>
              <Input
                {...init('domain', {
                  // rules: [{pattern:/(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/,message:"填写正确的域名"}],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('BrandDesign.description')} {...formItemLayout}>
              <Input
                {...init('description', {
                  rules: [{}],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('BrandDesign.keyWords')} {...formItemLayout}>
              <Input
                {...init('keywords', {
                  rules: [{}],
                })}
              />
            </FormItem>
            <FormItem label={_intl.get('BrandDesign.favicon')} {...formItemLayout}>
              <div style={{marginBottom:'10px'}}>
                <img  id="faviconimage" src={data.favicon}  alt="" style={{height:'60px',width:'100px'}}/>
              </div>
              
              <a href="#" className="file">
                <label for="file">Favicon</label>
                <input
                  onChange={(e)=>{this.getfavicon(e)}}
                  name="file" 
                  type="file" 
                  className='upload'
                  id="faviconfile"
                />
              </a>
            </FormItem>
            <FormItem label={_intl.get('BrandDesign.logo')} {...formItemLayout}>
              <div style={{marginBottom:'10px'}}>
                <img  id="logoimage" src={data.logo}  alt="" style={{height:'60px',width:'100px'}}/>
              </div>
              
              <a href="#" className="file">
                <label for="file">Logo</label>
                <input
                  onChange={(e)=>{this.getlogo(e)}}
                  name="file" 
                  type="file" 
                  className='upload'
                  id="logofile"
                />
              </a>
              <span style={{color:'red',marginLeft:'10px'}}>{_intl.get('error.error_size')}：</span>
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

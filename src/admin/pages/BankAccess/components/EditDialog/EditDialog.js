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
      key:[],
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
      // console.log(values)
      const {field ,onOk} = this.props;
      if(field==='saq'){
        const {key} = this.state;
        const saqs = [];
        key.forEach(function (item) {
          const saq = {};
          saq.question = values[`question${item}`];
          saq.answer = values[`answer${item}`];
          saqs.push(saq);
          delete values[`question${item}`];
          delete values[`answer${item}`];
        });
        values.saq = saqs;
      }
      _fetch({
        url:'/Manager/Bankaccess',
        data:{
          method:'updateaccess',
          merchantid:this.props.merchantid,
          ...values
        },
        success:()=>{
          Toast.success(_intl.get('public.success'));
          onOk();
        }
      });
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (record) => {
    const key = [];
    if(record.saq){
      record.saq.forEach(function (item,index) {
        key.push(index);
        record[`question${index}`] = item.question;
        record[`answer${index}`] = item.answer;
      });
      delete  record.saq
    }
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      key
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  add = ()=>{
    const {key} = this.state;
    key.push(key[key.length-1]+1);
    this.setState({key:key})
    // console.log(key.slice(-1,1))
  };
  remove = (item) => {
    const { key} = this.state;
    key.splice(key.indexOf(item),1);
    // const values = value;
    // delete value.question[index];
    // delete value.answer[index];
    // const a = `question${index}`;
    // const b = `answer${index}`;
    //  this.field.setValues({
    //    a:undefined,
    //    b:undefined,
    //  });
    this.field.remove(`question${item}`);
    this.field.remove(`answer${item}`);
    this.setState({key});
    // console.log(this.field.getValues())
  };
  render() {
    const { isMobile ,key} = this.state;
    const init = this.field.init;
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
          {_intl.get('public.revise')}
        </Button>
        <Dialog
          style={{ width: styles.editDialog.width }}
          visible={this.state.visible}
          footerAlign="center"
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('public.revise')}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
            {
              field==='phone'&&
              <FormItem label={_intl.get('bank.phone')} {...formItemLayout}>
                <Input
                  {...init('phone', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                />
              </FormItem>
            }
            {
              field==='companyid'&&
              <FormItem label={_intl.get('bank.companyid')} {...formItemLayout}>
                <Input
                  {...init('companyid', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                />
              </FormItem>
            }
            {
              field==='password'&&
              <FormItem label={_intl.get('public.password')} {...formItemLayout}>
                <Input
                  htmlType='password'
                  {...init('password', {
                    rules: [{ required: true, message: _intl.get('public.required') }],
                  })}
                />
              </FormItem>
            }
            {
              field==='saq'&&
             <FormItem>
               {
                 key.map( (item,index) => {
                  return(
                    <div>
                      <FormItem
                        label={
                          <span>
                            <span>{_intl.get('bank.question')}{index+1}</span>
                            {index>0&&<span  style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.remove(item)}><Icon type="ashbin" style={{color:'#FA7070'}} /></span>}
                          </span>
                        }
                        {...formItemLayout}
                      >
                        <Input
                          {...init(`question${item}`, {
                            rules: [{ required: true, message: _intl.get('public.required') }],
                          })}
                        />
                      </FormItem>
                      <FormItem label={_intl.get('bank.answer')} {...formItemLayout} style={{margin:'5px 0'}}>
                        <Input
                          {...init(`answer${item}`, {
                            rules: [{ required: true, message: _intl.get('public.required') }],
                          })}
                        />
                      </FormItem>
                    </div>
                  )
                 })
               }
               <Button type="normal" onClick={this.add}>＋{_intl.get('bank.add')}</Button>
             </FormItem>
            }
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

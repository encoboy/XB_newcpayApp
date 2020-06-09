import React, { Component } from 'react';
import { Dialog, Input, Button,Form,Field ,Icon,Radio,Select } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import {getUserInfo} from '../../../../util'

const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;

export default class SimpleFormDialog extends Component {
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

  showDialog = (data) => {
    if(data.currencyid.length>1&&typeof(data.currencyid)==='string'){
      data.currencyid = data.currencyid.split('|');
    }
    this.field.setValues({...data});
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
  isArray=(o)=>{
    return Object.prototype.toString.call(o)=='[object Array]';
  }
  onOk = () => {
    this.field.validate((error,values) => {
      if (error) {
        return;
      }
      this.hideDialog();
      if(this.isArray(values.currencyid)){
        values.currencyid = values.currencyid.join('|');
      }
      _fetch({
        url:'/Manager/Notice',
        data:{
          method:'updatenotice',
          ...values
        },
        success:()=>{
          this.props.onOk();
        }
      });

    });
  };
  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    const {data} = this.props;
    return (
      <span style={{marginRight:'5px'}}>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title={_intl.get('public.compile')}
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          // isFullScreen
          visible={this.state.visible}
          language={getUserInfo().lang}
        >
          <Form direction="ver" field={this.field } labelAlign='top'>
              {/*<FormItem label={_intl.get('content.group')}>*/}
               {/*<RadioGroup {...init("group",{rules:[{required:true,message:_intl.get('public.required')}]})}>*/}
                {/*<Radio value="transfer">{_intl.get('orderTypes.5')}</Radio>*/}
                {/*<Radio value="withdraw">{_intl.get('orderTypes.2')}</Radio>*/}
              {/*</RadioGroup>*/}
              {/*</FormItem>*/}
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
            <FormItem label={_intl.get('content.vndTitle')}>
              <Input
                {...init('title_vnd')}
              />
            </FormItem>
            <FormItem label={_intl.get('content.vndContent')}>
              <Input multiple   {...init('content_vnd')} />
            </FormItem>
            <FormItem label={_intl.get('merchantlist.currency')}>
            <Select  placeholder={_intl.get('merchantlist.currency')} multiple={true} style={{width:'216px'}}
              {...init("currencyid")} >
              <Select.Option value={0} >{_intl.get('public.notSelect')}</Select.Option>
              <Select.Option value={1} >MYR</Select.Option>
              <Select.Option value={2} >VND</Select.Option>
            </Select>
          </FormItem>
          </Form>
        </Dialog>
        <Button type="normal" shape='text' onClick={()=>this.showDialog(data)}>
          {_intl.get('public.compile')}
        </Button>
      </span>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};

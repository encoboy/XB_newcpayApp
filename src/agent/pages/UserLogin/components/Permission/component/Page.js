import React,{Component} from 'react'
import { Form, Button, Checkbox, Field ,Feedback} from "@icedesign/base";
import {isEmptyObject} from '../../../../../util'

const FormItem = Form.Item;
const Toast = Feedback.toast;

class Page extends Component{
  state = {
    btn:[],
    checkedAll:false
  };
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }
  checkOnChange = (value) => {
    console.log(value);
  }
  componentWillReceiveProps(nextProps){
    if(!isEmptyObject(nextProps.pageoperate)){
      const {pageoperate} = nextProps;
      const btn = [];
      for(const i in pageoperate){
        const item = {
          name:i,
          value:pageoperate[i]
        };
        btn.push(item)
      }
      this.setState({
        btn
      },()=>{
        this.field.setValues({...pageoperate});
      })
    }
  }
  handleSubmit = ( e ) => {
    e.preventDefault();
    this.field.validate((error,values) => {
      console.log(values);
      if (!error) {
        const arr = [];
        for(const i in values){
          if(values[i]){
            arr.push(i)
          }
        }
        console.log(arr)
        _fetch({
          url:'/Merchant/Merchantlogin',
          data:{
            method:'updatesub',
            username:this.props.username,
            id:this.props.id,
            type:'ope',
            value:arr.join('|')
          },
          success:()=>{
            Toast.success(_intl.get('public.success'));
            this.props.onOk()
          }
        })
      }
    })
  };
  handleChange=(checked)=>{
    const {btn} = this.state;
    this.setState({checkedAll:checked});
    if(checked){
      btn.forEach((item)=>{
        this.field.setValue(item.name,true);
      })
    }else {
      btn.forEach((item)=>{
        this.field.setValue(item.name,false);
      })
    }
  };
  handleReset = () => {
    this.setState({checkedAll:false});
    this.field.reset()
  };

  render(){
    const init = this.field.init;
    const {btn,checkedAll} = this.state;
    return(
      <div>
        <h3>{_intl.get('operation.page')}：</h3>
        <Form direction="ver" field={this.field} onSubmit={this.handleSubmit}>
          <div style={{padding:'10px 0'}}>
            <Button type='primary' htmlType='submit' style={{marginRight:'8px'}}>{_intl.get('operation.sure')}</Button>
            <Button type='normal' shape="warning" onClick={this.handleReset}>{_intl.get('public.reset')}</Button>
          </div>
          <FormItem>
            <Checkbox checked={checkedAll} onChange={this.handleChange}>{_intl.get('operation.all')}</Checkbox>
          </FormItem>
          {
            btn.map(function (item,index) {
              const is_true = item.value;
              return(
                <FormItem key={index}>
                  <Checkbox {...init(item.name,{valueName: "checked"})}>{_intl.get(`sider.${item.name}`)||item.name}</Checkbox>
                </FormItem>
              )
            })
          }
        </Form>
      </div>
    )
  }
}

export default Page

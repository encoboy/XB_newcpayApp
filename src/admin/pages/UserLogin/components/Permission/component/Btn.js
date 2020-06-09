import React,{Component} from 'react'
import { Form, Button, Checkbox, Field,Feedback } from "@icedesign/base";
import {isEmptyObject} from '../../../../../util'

const FormItem = Form.Item;
const Toast = Feedback.toast

class Btn extends Component{
  state = {
    btn:[],
    checkedAll:false
  };
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }
  componentWillReceiveProps(nextProps){
    if(!isEmptyObject(nextProps.buttonoperate)){
      const {buttonoperate} = nextProps;
      const btn = [];
      for(const i in buttonoperate){
        const item = {
          name:i,
          value:buttonoperate[i]
        };
        btn.push(item)
      }
      this.setState({
        btn
      },()=>{
        this.field.setValues({...buttonoperate});
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
        _fetch({
          url:'/Manager/Managerlogin',
          data:{
            method:'updatesub',
            username:this.props.username,
            id:this.props.id,
            type:'operate',
            value:arr.join('|')
          },
          success:(data)=>{
            console.log('udatesub',data);
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
    this.field.reset();
    this.props.onOk()
  };
  render(){
    const init = this.field.init;
    const {btn,checkedAll} = this.state;
    return(
      <div>
        <h3>{_intl.get('public.action')}：</h3>
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
              return(
                <FormItem key={index}>
                  <Checkbox {...init(item.name,{valueName: "checked"})}>{_intl.get(`operation.${item.name}`)||item.name}</Checkbox>
                </FormItem>
              )
            })
          }
        </Form>
      </div>
    )
  }
}

export default Btn

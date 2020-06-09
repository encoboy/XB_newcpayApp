import React,{Component} from 'react'
import { Form, Button, Checkbox, Field,Feedback,Dialog,Input } from "@icedesign/base";


const FormItem = Form.Item;
const Toast = Feedback.toast;

class Btn extends Component{
  state = {
    btn:[],
  };
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  componentDidMount(){
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/Merchant/Operations',
      data:{
        method:'getoperates',
      },
      success:(data)=>{
       this.setState({
         btn:data.data
       })
      }
    })
  };
  handleSubmit = ( e ) => {
    e.preventDefault();
    this.field.validate((error,values) => {
      if (!error) {
        const arr = [];
        for(const i in values){
          if(values[i]){
            arr.push(i)
          }
        }
      this.update(arr)
      }
    })
  };

  update = (arr) => {
    _fetch({
      url:'/Merchant/Operations',
      data:{
        method:'updateoperate',
        operates:arr.join('|')
      },
      success:()=>{
        Toast.success(_intl.get('public.success'));
        this.getData()
      }
    })
  };
  add = () => {
    let item = '' ;
    Dialog.confirm({
      title:'添加权限',
      content:<Input onChange={e=>item=e}  />,
      onOk:()=>{
        const {btn} = this.state;
        const arr = btn.map((item)=>item);
        arr.push(item);
        this.update(arr)
      }
    })
  };
  render(){
    const init = this.field.init;
    const {btn} = this.state;
    return(
      <div>
        <h3>{_intl.get('public.action')}：</h3>
        <Form direction="ver" field={this.field} onSubmit={this.handleSubmit}>
          <div style={{padding:'10px 0'}}>
            <Button type='primary' htmlType='submit' style={{marginRight:'8px'}}>{_intl.get('operation.sure')}</Button>
            <Button type='normal' shape="warning" onClick={this.add}>添加</Button>
          </div>

          {
            btn.map(function (item,index) {
              return(
                <FormItem key={index}>
                  <Checkbox {...init(item,{initValue:true,valueName: "checked"})}>{item}</Checkbox>
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

import React,{Component} from 'react'
import { Form, Button, Checkbox, Field ,Feedback,Dialog,Input} from "@icedesign/base";

const FormItem = Form.Item;
const Toast = Feedback.toast;

class Page extends Component{
  state = {
    page:[]
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
      url:'/Manager/Operations',
      data:{
        method:'getoperations',
      },
      success:(data)=>{
        this.setState({
          page:data.data
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
      url:'/Manager/Operations',
      data:{
        method:'updateoperation',
        operations:arr.join('|')
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
        const {page} = this.state;
        const arr = page.map((item)=>item);
        arr.push(item);
        this.update(arr)
      }
    })
  };
  handleReset = () => {
    this.field.reset()
  };
  render(){
    const init = this.field.init;
    const {page} = this.state;
    return(
      <div>
        <h3>{_intl.get('operation.page')}：</h3>
        <Form direction="ver" field={this.field} onSubmit={this.handleSubmit}>
          <div style={{padding:'10px 0'}}>
            <Button type='primary' htmlType='submit' style={{marginRight:'8px'}}>{_intl.get('operation.sure')}</Button>
            <Button type='normal' shape="warning" onClick={this.add}>添加</Button>
          </div>
          {
            page.map(function (item,index) {
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

export default Page

import React, { Component } from 'react';
import Form from './component/Form'

export default class Log extends Component{
  state = {
    data:''
  };
  componentDidMount(){
    this.getLog();
  }
  getLog = (values) => {
    _fetch({
      url:'/Merchant/Robot',
      data:{
        method:'getrobotlog',
        robotid:this.props.id,
        // code:code,
        since:0,
        ...values
      },
      success:(data)=>{
       this.setState({data:data.log})
      }
    })
  };
  onSubmit = (values) => {
    this.getLog(values)
  };
  render(){
    const {data} = this.state;
    return(
      <div>
        <Form onSubmit={this.onSubmit} onReset={this.getLog}/>
        <div dangerouslySetInnerHTML={{__html: data}} style={{whiteSpace:'pre-wrap',wordWrap:'break-word',lineHeight:'25px'}} />
      </div>
    )
  }
}

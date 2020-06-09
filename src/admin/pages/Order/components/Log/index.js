import React, { Component } from 'react';
import Form from './component/Form';
import { Button} from '@icedesign/base';

export default class Log extends Component{
  state = {
    data:''
  };
  componentDidMount(){
    this.getLog();
  }
  getLog = (values) => {
    _fetch({
      url:'/Manager/Order',
      data:{
        method:'getlog',
        orderid:this.props.id,
      },
      success:(data)=>{
       console.log('orderGetLogdata',data);
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
        {/*<Form onSubmit={this.onSubmit} onReset={this.getLog}/>*/}

        <div dangerouslySetInnerHTML={{__html: data}} style={{whiteSpace:'pre-wrap',wordWrap:'break-word',lineHeight:'25px'}} />
        <div>
          <Button
                size="large"
                type="primary"
                onClick={this.getLog}
                style={styles.refresh}
              >
                {_intl.get('public.refresh')}
              </Button>
        </div>
      </div>
    )
  }
}

const styles = {
  refresh: {
    margin:'20px ',
    float:'right'
  },
};

import React,{Component} from 'react'
import {Icon} from '@icedesign/base'

export default class EyePassword extends Component{
  state = {
    show:false
  };
  showPassword = ()=>{
    this.setState({show:!this.state.show})
  };

  render(){
    const {text} = this.props;
    const {show} = this.state;
    return(
      <div>
        <span>{show?text:'******'}</span>
        <span style={{padding:'0 5px',cursor:'pointer'}} onClick={this.showPassword}  ><Icon type='browse'/></span>
      </div>
    )
  }
}

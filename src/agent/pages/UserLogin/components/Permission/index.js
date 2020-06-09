import React,{Component} from 'react';
import { Card ,Button} from "@icedesign/base";
import { Grid } from '@icedesign/base';
import Btn from './component/Btn'
import Page from './component/Page'
import {connect} from 'react-redux';
import { hasAction } from '../../../../util';
const { Row, Col } = Grid;

class Permission extends Component{
  state = {
    buttonoperate:{},
    pageoperate:{}
  };
  componentDidMount(){
    this.getData()
  }
  getData=()=>{
    _fetch({
      url:'/Merchant/Merchantlogin',
      data:{
        method:'suboperation',
        username:this.props.username
      },
      success:(data)=>{
        console.log(data);
        this.setState({
          buttonoperate:data.buttonoperate,
          pageoperate:data.pageoperate
        })
      }
    })
  };

  render() {
    const {buttonoperate,pageoperate} = this.state;
    const {btn} = this.props;
    return (
      <Card
        style={{ width: '100%',boxShadow:'none' }}
        bodyHeight='atuo'
        title={`${this.props.username.toUpperCase()}—${_intl.get('sub.permission')}`}
        extra={<Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}
        // language="en-us"
      >
        <Row wrap>
          <Col xxs={24} s={12}>
            {hasAction(btn,'Modify_Sub_Operate')&&<Page onOk={this.getData}  pageoperate={pageoperate} username={this.props.username} id={this.props.id}/>}
          </Col>
          <Col xxs={24} s={12}>
            {hasAction(btn,'Modify_Sub_Ope')&&<Btn onOk={this.getData} buttonoperate={buttonoperate} username={this.props.username} id={this.props.id}/>}
          </Col>
        </Row>

      </Card>

    );
  }
}
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStatToProp)(Permission)
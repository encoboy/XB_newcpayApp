import React,{Component} from 'react';
import { Card ,Button} from "@icedesign/base";
import { Grid } from '@icedesign/base';
import Btn from './component/Btn'
import Page from './component/Page';
import {hasAction} from '../../../../util';
import {connect} from 'react-redux';

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
      url:'/Manager/Managerlogin',
      data:{
        method:'suboperation',
        username:this.props.username
      },
      success:(data)=>{
        console.log('suboperation',data);
        this.setState({
          buttonoperate:data.buttonoperate,
          pageoperate:data.pageoperate
        })
      }
    })
  };

  render() {
    const {buttonoperate,pageoperate} = this.state;
    console.log(pageoperate);
    const {btn} = this.props;
    return (
      <Card
        style={{ width: '100%',boxShadow:'none' }}
        bodyHeight='atuo'
        title={`${this.props.username.toUpperCase()}—${_intl.get('sub.permission')}`}
        extra={<Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}
      >
        <Row wrap>
          <Col xxs={24} s={12}>
            {hasAction(btn,'Modify_Sub_Operate')&&<Page onOk={this.getData}  pageoperate={pageoperate} username={this.props.username} id={this.props.id}/>}
          </Col>
          <Col xxs={24} s={12}>
            {hasAction(btn,'Modify_Sub_Ope')&&<Btn onOk={this.getData} buttonoperate={buttonoperate}  username={this.props.username} id={this.props.id}/>}
          </Col>
        </Row>

      </Card>

    );
  }
}
const mapStateToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStateToProp)(Permission);
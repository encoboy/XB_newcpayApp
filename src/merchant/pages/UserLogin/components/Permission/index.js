import React,{Component} from 'react';
import { Card ,Button} from "@icedesign/base";
import { Grid } from '@icedesign/base';
import Btn from './component/Btn'
import Page from './component/Page'

const { Row, Col } = Grid;

export default class Permission extends Component{
  state = {
    buttonoperate:{},
    pageoperate:{}
  };
  componentDidMount(){
    this.getData()
  }
  getData=()=>{
    _fetch({
      url:'/User/Userlogin',
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
    console.log(buttonoperate,pageoperate);
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
            <Page onOk={this.getData}  pageoperate={pageoperate} username={this.props.username} id={this.props.id}/>
          </Col>
          <Col xxs={24} s={12}>
            <Btn onOk={this.getData} buttonoperate={buttonoperate}  username={this.props.username} id={this.props.id}/>
          </Col>
        </Row>

      </Card>

    );
  }
}

import React,{Component} from 'react';
import { Card ,Button} from "@icedesign/base";
import { Grid } from '@icedesign/base';
import Btn from './component/Btn'
import Page from './component/Page'

const { Row, Col } = Grid;

export default class Permission extends Component{
  render() {
    return (
      <Card
        style={{ width: '100%',boxShadow:'none' }}
        bodyHeight='atuo'
        title='系统权限'
        // extra={<Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>}
        // language="en-us"
      >
        <Row wrap>
          <Col xxs={24} s={12}>
            <Page/>
          </Col>
          <Col xxs={24} s={12}>
            <Btn/>
          </Col>
        </Row>

      </Card>

    );
  }
}

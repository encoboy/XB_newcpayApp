import React, { Component } from 'react';
import { Button,Grid,Select } from '@icedesign/base';
import Account from './components/Account'
import KeyWord from './components/KeyWord'

const { Row, Col } = Grid;

export default class Form extends Component{
  constructor(props) {
    super(props);
  }
  onSubmit = (values) => {
    const {type} = this.state
  };
  render(){
    const {type} = this.props;
    return(
      <div style={styles.formContent}>
        <Row wrap >
          <Col xxs="24" s="4" l="4" style={styles.formItem} >
            <Select style={{width:'90%'}} value={type} onChange={this.props.onChange}>
              <Select.Option value="account">{_intl.get('journal.account')}</Select.Option>
              <Select.Option value="keyword">{_intl.get('journal.keyword')}</Select.Option>
              
            </Select>
          </Col>
          <Col xxs="24" s="20" l="20" style={styles.formItem} >
            {
              type ==='account'?
                <Account onSubmit={this.props.onSubmit} onReset={this.props.onReset}/>:
                <KeyWord onSubmit={this.props.onSubmit} onReset={this.props.onReset}/>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};

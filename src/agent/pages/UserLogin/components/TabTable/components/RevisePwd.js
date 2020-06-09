import React, { Component } from 'react';
import { Dialog,Input,Grid ,Button} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {connect} from 'react-redux'
import {getUserInfo,hasAction} from '../../../../../util/index'


const { Row, Col } = Grid;

class RevisePwd extends Component{
  state = {
    visible:false
  };
  onOpen = () => {
    this.setState({
      visible: true
    });
  };
  onOk = () => {
    this.refs.form.validateAll((errors, values) => {
      if(!errors){
        this.props.onOk(values.password);
        this.setState({
          visible: false
        });
      }
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });

  };
  render(){
    const {btn} = this.props;
    return(
      <div style={{display:'inline-block',marginRight:'5px'}}>
        <Button size="small" type="primary"  onClick={this.onOpen}>{_intl.get('sub.rpwd')}</Button>
        <Dialog
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onClose}
          onClose={this.onClose}
          title={_intl.get('sub.rpwd')}
          language={getUserInfo().lang}
        >
          <div>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder
                      name="password"
                      rules={[
                        {required:true,message:_intl.get('public.required')},
                        {min:5,max:15,message:_intl.get('profile.nmin')}
                      ]}
                    >
                      <Input htmlType='password'  placeholder={_intl.get('sub.new')} />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="password" />
                  </Col>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </Dialog>
      </div>
    )
  }
}
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStatToProp)(RevisePwd)
const styles = {
  formItem: {
    position: 'relative',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  }
};

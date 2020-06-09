import React, { Component } from 'react';
import { Button, Balloon,Feedback } from '@icedesign/base';
import PropTypes from 'prop-types';
const Toast = Feedback.toast;

export default class DeleteBalloon extends Component {
  static propTypes = {
    handleRemove: PropTypes.func,
  };

  static defaultProps = {
    handleRemove: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleHide = (visible, code) => {
    const {id} = this.props;
    if (code === 1) {
      _fetch({
        url:'/Manager/Operations',
        data:{
            method:"deloperationgroup",
            id
        },
        success:(data)=>{
            console.log('deloperationgroup',data);
            this.props.getPageOprationGrops();
            Toast.success(_intl.get('userJurisdiction.delectRightSuccess'));
        }
      })
    }
    this.setState({
      visible: false,
    });
  };

  handleVisible = (visible) => {
    this.setState({ visible });
  };

  render() {
    const visibleTrigger = (
      <Button size="small" type="normal"  shape="text" style={{color:'red'}}>
        {_intl.get('public.delete')}
      </Button>
    );

    const content = (
      <div>
        <div style={styles.contentText}>{_intl.get('public.sure')}</div>
        <Button
          id="confirmBtn"
          size="small"
          type="normal"
          shape="warning"
          style={{ marginRight: '5px' }}
          onClick={visible => this.handleHide(visible, 1)}
        >
          {_intl.get('public.besure')}
        </Button>
        <Button
          id="cancelBtn"
          size="small"
          onClick={visible => this.handleHide(visible, 0)}
        >
          {_intl.get('public.close')}
        </Button>
      </div>
    );

    return (
      <Balloon
        trigger={visibleTrigger}
        triggerType="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisible}
      >
        {content}
      </Balloon>
    );
  }
}

const styles = {
  contentText: {
    padding: '5px 0 15px',
  },
};
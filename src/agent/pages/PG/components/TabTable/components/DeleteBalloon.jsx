import React, { Component } from 'react';
import { Button, Balloon } from '@icedesign/base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hasAction} from '../../../../../util';

class DeleteBalloon extends Component {
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
    if (code === 1) {
      this.props.handleRemove();
    }
    this.setState({
      visible: false,
    });
  };

  handleVisible = (visible) => {
    this.setState({ visible });
  };

  render() {
    const {btn} = this.props;
    const visibleTrigger = (
      hasAction(btn,'PG_deletepg')&&
      <Button size="small" type="secondary" shape="warning" shape="text">
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

const mapStateToProps = (state, ownProps) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
}
export default connect(mapStateToProps)(DeleteBalloon)
const styles = {
  contentText: {
    padding: '5px 0 15px',
  },
};

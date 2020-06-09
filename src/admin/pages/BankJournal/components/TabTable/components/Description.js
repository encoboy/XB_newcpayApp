import React, { Component } from 'react';
import { Button, Balloon } from "@icedesign/base";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({
      visible: false
    });
  }
  handleVisibleChange(visible) {
    this.setState({ visible });
  }
  render() {
    const {text} = this.props;
    let descText;
    const textLength = text.length;
    if(textLength>6){
      descText = text.substring(0,6) + '....';
    }else if(textLength === 0){
      descText = null;
    }else if(textLength>0&&textLength<6){
      descText = text;
    }
    const visibleTrigger = (
      <Button type="primary" shape="text" style={{color:'black' }}>
        {descText}
      </Button>
    );

    const content = (<div>{text}</div>);
    return (
        <Balloon
          trigger={visibleTrigger}
          triggerType="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange.bind(this)}
        >
          {content}
        </Balloon>
    );
  }
};

export default Description;



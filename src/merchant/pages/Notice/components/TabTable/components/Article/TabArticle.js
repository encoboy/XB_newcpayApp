import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
import ArticleList from './ArticleList';




export default class TabArticle extends Component {
  static displayName = 'TabArticle';

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    return (
      <div className="tab-article">
        <ArticleList isMobile={this.state.isMobile}  />
      </div>
    );
  }
}

const styles = {
  tabList: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom:0,
    padding:'0 20px'
  },
  icon: {
    width: '10px',
    height: '12px',
  },
  tab: {
    cursor: 'pointer',
    marginRight: '20px',
  },
  tabActive: {
    color: '#3080FE',
  },
};

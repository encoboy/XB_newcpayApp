import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './index.scss';

export default class NotPermission extends Component {
  static displayName = 'NotPermission';

  constructor(props) {
    super(props);
    this.state = {
      loading:true
    };
  }
  componentDidMount(){
    this.time =  setTimeout(()=>{
      this.setState({loading:false})
    },3000)
  }
  componentWillUnmount(){
    clearTimeout(this.time)
  }
  render() {
    const {loading} = this.state;
    return (
      <div className="not-permission" style={styles.notPermission}>
        <IceContainer>
          {
            loading&&
            <div>
              {_intl.get('public.loading')}
            </div>
          }
          {
            !loading&&
            <div style={styles.content} className="exception-content">
              <img
                src="https://img.alicdn.com/tfs/TB1Gy4Yjv6H8KJjy0FjXXaXepXa-780-780.png"
                style={styles.imgException}
                className="imgException"
                alt="prmission"
              />
              <div style={styles.prompt}>
                <h3 style={styles.title} className="title">
                  {_intl.get('500.title')}
                </h3>
                <p style={styles.description} className="description">
                  {_intl.get('500.desc')}
                </p>
              </div>
            </div>
          }
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
};

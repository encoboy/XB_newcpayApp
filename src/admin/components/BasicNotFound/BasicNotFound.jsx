import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

export default class BasicNotFound extends Component {
  static displayName = 'BasicNotFound';

  render() {
    return (
      <div className="basic-not-found">
        <IceContainer>
          <div style={styles.notfoundContent}>
            <img
              src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              style={styles.imgNotfound}
              alt={_intl.get('404.null')}
            />
            <div className="prompt">
              <h3 style={styles.title}>{_intl.get('404.title')}</h3>
              <p style={styles.description}>
                {_intl.get('404.desc')}<a href='#' onClick={()=>this.props.history.goBack()}>{_intl.get('public.back')}</a> {_intl.get('404.goon')}
              </p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  notfoundContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  imgNotfound: {
    marginRight: '50px',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    margin: '20px 0',
  },
  description: {
    color: '#666',
    fontSize: '16px',
  },
};

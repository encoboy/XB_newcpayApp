import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon, Grid } from '@icedesign/base';
import Bank from '../ObjectTable'

const { Row, Col } = Grid;

export default class AssetInfoDisplay extends Component {
  static displayName = 'AssetInfoDisplay';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {data} = this.props;
    return (
      <div className="asset-info-display" style={styles.container}>
        <IceContainer style={styles.card}>
          <div
            style={{
              ...styles.cardItem,
              borderBottom: '1px solid #fbfbfb',
            }}
          >
            <h1 style={styles.subTitle}>{_intl.get('OrderStatistics.total')}</h1>
            <div style={styles.assetsGroup}>
              <a
                style={styles.assetItem}
              >
                {/*<div style={styles.item}>{data.init_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.init_count')}：
                  {data.init_count}
                </div>
              </a>
              <a
                style={{
                  ...styles.assetItem,
                  borderRight: '0',
                }}
              >
                {/*<div style={styles.item}>{data.pending_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.pending_count')}:
                  {data.pending_count}
                  </div>
              </a>
              <a
                style={styles.assetItem}
              >
                {/*<div style={styles.item}>{data.processing_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.processing_count')}：
                  {data.processing_count}
                  </div>
              </a>
              <a
                style={{
                  ...styles.assetItem,
                  borderRight: '0',
                }}
              >
                {/*<div style={styles.item}>{data.cancel_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.cancel_count')}：
                  {data.cancel_count}
                  </div>
              </a>
              <a
                style={styles.assetItem}
              >
                {/*<div style={styles.item}>{data.fail_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.fail_count')}：
                  {data.fail_count}
                  </div>
              </a>
              <a
                style={{
                  ...styles.assetItem,
                  borderRight: '0',
                }}
              >
                {/*<div style={styles.item}>{data.error_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.error_count')}：
                  {data.error_count}
                  </div>
              </a>
              <a
                style={styles.assetItem}
              >
                {/*<div style={styles.item}>{data.success_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.success_count')}：
                  {data.success_count}
                  </div>
              </a>
              <a
                style={{
                  ...styles.assetItem,
                  borderRight: '0',
                }}
              >
                {/*<div style={styles.item}>{data.total_count}</div>*/}
                <div style={styles.subItem}>
                  {_intl.get('OrderStatistics.total_count')}：
                  {data.total_count}
                  </div>
              </a>
            </div>
          </div>
          <div
            style={{
              ...styles.cardItem,
              borderBottom: '1px solid #fbfbfb',
            }}
          >
            <h1 style={styles.subTitle}>{_intl.get('OrderStatistics.rate')}</h1>
            {
              data.rate&&
              <div style={styles.assetsGroup}>
                <a
                  style={styles.assetItem}
                >
                  <div style={styles.subItem}>
                    {_intl.get('OrderStatistics.in')}：
                    {data.rate.in===0?0:`${data.rate.in}%`}
                  </div>
                  {/*<div style={styles.subItem}>{_intl.get('OrderStatistics.in')}</div>*/}
                </a>
                <a
                  style={{
                    ...styles.assetItem,
                    borderRight: '0',
                  }}
                >
                  <div style={styles.subItem}>
                    {_intl.get('OrderStatistics.success')}：
                    {data.rate.success === 0?0:`${data.rate.success}%`}
                  </div>
                  {/*<div style={styles.subItem}>{_intl.get('OrderStatistics.success')}</div>*/}
                </a>
                <a
                  style={styles.assetItem}
                >
                  <div style={styles.subItem}>
                    {_intl.get('OrderStatistics.fail')}：
                    {data.rate.fail ===0?0:`${data.rate.fail}%`}
                  </div>
                  {/*<div style={styles.subItem}>{_intl.get('OrderStatistics.fail')}</div>*/}
                </a>
                <a
                  style={{
                    ...styles.assetItem,
                    borderRight: '0',
                  }}
                >
                  <div style={styles.subItem}>
                    {_intl.get('OrderStatistics.error')}：
                    {data.rate.error ===0?0:`${data.rate.error}%`}
                  </div>
                  {/*<div style={styles.subItem}>{_intl.get('OrderStatistics.error')}</div>*/}
                </a>
              </div>
            }

          </div>
          <div
            style={{
              ...styles.cardItem,
              borderBottom: '1px solid #fbfbfb',
            }}
          >
            <h1 style={styles.subTitle}>{_intl.get('OrderStatistics.access')}</h1>
            <div style={styles.assetsGroup}>
              <Bank data={data.data}/>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  containerContent: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  gap: {
    flex: '0 0 20px',
  },
  card: {
    flex: 1,
    padding: 0,
  },
  title: {
    color: '#6ca1ee',
    fontSize: '16px',
    padding: '20px',
    borderBottom: '1px solid #fbfbfb',
  },
  subTitle: {
    color: '#666',
    fontWeight: '400',
    // borderLeft: '4px solid #6ca1ee',
    fontSize: '16px',
    lineHeight: '1.4em',
    paddingLeft: '5px',
    marginBottom: '12px',
  },
  assets: {
    height: '116px',
    borderBottom: '1px solid #fbfbfb',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItem: {
    padding: '5px 20px',
  },
  assetsGroup: {
    // display: 'flex',
    // flexDirection: 'row',
    wordWrap:'break-word'
  },
  assetItem: {
    borderRight: '1px solid #ececec',
    height:'25px',
    lineHeight:'25px',
    padding:'0 5px',
    color: '#666',
  },
  price: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#fbb848',
  },
  item: {
    marginBottom: '10px',
    fontWeight: '800',
    fontSize: '16px',
  },
  subItem: {
    color: '#999',
    marginBottom: '12px',
    display:'inline-block'
  },
};

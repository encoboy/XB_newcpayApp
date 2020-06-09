import React, { Component } from 'react';;
import {getUserInfo} from '../../../../../../../util'
import './ArticleList.scss';

export default class ArticleList extends Component {
  static displayName = 'ArticleList';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      language:{
        'zh-cn':'cn',
        'en-us':'en',
        'my-vn':'vnd'
      }
    };
  }
  componentDidMount(){
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/User/Notice',
      data:{
        method:'',

      },
      success:(data)=>{
        console.log(data)
        this.setState({
          dataSource:data.data,
        })
      }
    })
  };


  renderItem = (data, idx) => {
    const { isMobile } = this.props;
    const { language } = this.state;
    const wrapperStyle = { ...styles.item };
    const lang = getUserInfo().lang;
    return (
      <div key={idx} style={wrapperStyle}>
        <div style={styles.title}>
          {data[`title_${language[lang]}`]}
          {!isMobile && <span style={styles.datetime}>{data.updated}</span>}
        </div>
        <div style={styles.desc}>
           {data[`content_${language[lang]}`]}
        </div>
      </div>
    );
  };

  render() {
    const { dataSource  } = this.state;
    return (
      <div className="article-list">
        {dataSource.map(this.renderItem)}
      </div>
    );
  }
}

const styles = {
  item: {
    borderBottom: '1px solid #F4F4F4',
    marginBottom: '15px',
  },
  title: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '15px',
    position: 'relative',
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    fontSize: '12px',
    color: '#9B9B9B',
  },
  desc: {
    color: '#999',
    fontSize: '13px',
    lineHeight: '24px',
    paddingBottom: '15px',
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  button: {
    marginRight: '10px',
  },
  operator: {
    paddingTop: '8px',
    fontSize: '12px',
    color: '#9B9B9B',
  },
  operatorItem: {
    marginRight: '5px',
  },
  paginationWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },
};

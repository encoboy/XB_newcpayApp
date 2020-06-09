import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      merchantLogo:'',
      favicon:'',
      title:''
    };
  }

    // 获取logo图标
  getLogoData = () => {
    _fetch({
      url:'/User/Init',
      success:(data)=>{
        this.setState({
            merchantLogo:data.data.logo,
            favicon:data.data.favicon,
            title:data.data.title
        })
      }
    })
  }

  componentDidMount() {
    this.getLogoData();
  }
  render() {
  const {merchantLogo,favicon,title} = this.state;
  // 设置网页主题小图标
    var linkEle = document.querySelector('link[rel="shortcut icon"]');
    linkEle.href = favicon;
    linkEle.type = '';
    linkEle.type = 'image/x-icon';

    // 设置网页主题
    if(title === undefined || title === null){
      document.title = '\u200E';
    }else{
      document.title = title;
    }
    return (
      <div className="logo" style={{}}>
        <Link to="/" className="logo-text">
          <img src={merchantLogo?merchantLogo:''} alt="" style={{width:'215px',height:'50px'}}/>
        </Link>
      </div>
    );
  }
}

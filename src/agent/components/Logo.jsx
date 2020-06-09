import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      agentLogo:'',
      favicon:'',
      title:''
    };
  }

    // 获取logo图标
  getLogoData = () => {
    _fetch({
      url:'/Merchant/Init',
      success:(data)=>{
        this.setState({
            agentLogo:data.data.logo,
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
    const {agentLogo,favicon,title} = this.state;

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
        <Link to="javascript::" className="logo-text">
          <img src={agentLogo?agentLogo:''} alt="" style={{width:'215px',height:'50px'}}/>
        </Link>
      </div>
    );
  }
}

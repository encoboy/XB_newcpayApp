// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
import intl from 'react-intl-universal'
//纯js intl要使用函数的方式   ()=> intl.get('')

const headerMenuConfig = [
  // {
  //   name: '首页',
  //   to: '/admin',
  //   icon: 'home',
  // },
  // {
  //   name: '反馈',
  //   path: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'message',
  // },
  // {
  //   name: '帮助',
  //   path: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'bangzhu',
  // },
];

const asideMenuConfig = [
  // {
  //   name: '首页',
  //   path: '/admin',
  //   icon: 'home',
  // },
  {
    name: ()=>intl.get('sider.profile'),
    path: '/merchant',
    icon: 'yonghu',
    operation:'profile',
    children: [
      {
        name:()=>intl.get('sider.profile_profileinfo'),
        path: '/merchant/info',
        operation:'profile_profileinfo',
      },
      {
        name: ()=>intl.get('sider.profile_password'),
        path: '/merchant/pwd',
        operation:'profile_password',
      }
    ],
  },
  {
    name:()=>intl.get('sider.account'),
    path: '/sub',
    icon: 'pin',
    operation:'sub',
    children: [
      {
        name:()=>intl.get('sider.account_addaccount'),
        path: '/sub/adduserlogin' ,
        operation:'sub_addsub',
      },
      {
        name:()=>intl.get('sider.account_accountlist'),
        path: '/sub/userlogin',
        operation:'sub_sublist'
      },
    ],
  },
  {
    name: ()=>intl.get('sider.wallet'),
    path: '/wallet',
    icon: 'redpacket',
    operation:'wallet',
    children: [
      {
        name: ()=>intl.get('sider.wallet_walletinfo'),
        path: '/wallet/info' ,
        operation:'wallet_walletinfo'
      },
      {
        name: ()=>intl.get('sider.wallet_cardjournal'),
        path: '/wallet/journal' ,
        operation:'wallet_cardjournal'
      },
      {
        name:()=>intl.get('sider.wallet_addbankcard'),
        path: '/wallet/addusercards' ,
        operation:'wallet_addbankcard'
      },
      {
        name:()=>intl.get('sider.wallet_bankcard'),
        path: '/wallet/usercards' ,
        operation:'wallet_bankcard'
      },
      {
        name: ()=>intl.get('sider.wallet_withdraw'),
        path: '/wallet/withdraw' ,
        operation:'wallet_withdraw'
      },
      {
        name:()=>intl.get('sider.wallet_withdrawlist'),
        path: '/wallet/withdrawlist' ,
        operation:'wallet_withdrawlist'
      },
      {
        name: ()=>intl.get('sider.wallet_transfer'),
        path: '/wallet/transferout' ,
        operation:'wallet_transfer'
      },
      {
        name:()=>intl.get('sider.wallet_audittransfer'),
        path: '/wallet/transferlist' ,
        operation:'wallet_audittransfer'
      },

    ],
  },
  // 我的订单
  {
    name:  ()=>intl.get('sider.order'),
    path: '/order',
    icon: 'store',
    operation:'order',
    children: [
      {
        name:  ()=>intl.get('sider.order_receipt'),
        path: '/order/orderstat' ,
        operation:'order_receipt',
      },
      {
        name:  ()=>intl.get('sider.order_depositlist'),
        path: '/order/depositlist' ,
        operation:'order_depositlist',
      },
      {
        name:  ()=>intl.get('sider.order_orderlist'),
        path: '/order/list',
        operation:'order_orderlist',
      },
    ],
  },
  {
    name: ()=>intl.get('sider.bill'),
    path: '/bill',
    icon: 'copy',
    operation:'bill',
    children: [
      {
        name: ()=>intl.get('sider.bill_todaybill'),
        path: '/bill/today' ,
        operation:'bill_todaybill',
      },
      {
        name: ()=>intl.get('sider.bill_dailybill'),
        path: '/bill/daily',
        operation:'bill_dailybill',
      },
      {
        name: ()=>intl.get('sider.bill_monthilybill'),
        path: '/bill/monthly',
        operation:'bill_monthilybill',
      }
    ],
  },
  // 操作管理
  {
    name: ()=>intl.get('sider.operation'),
    path: '/operation',
    icon: 'publish',
    operation:'operation',
    children:[
      {
        name: ()=>intl.get('sider.operation_list'),
        path: '/operation/list',
        operation:'operation_list',
      }
    ]
  },

  {
    name: ()=>intl.get('sider.notice'),
    path: '/notice',
    icon: 'speaker',
    operation:'notice',
    children:[]
  },
  {
    name: ()=>intl.get('sider.contact'),
    path: '/contact',
    icon: 'phone',
    operation:'contact',
    children:[]
  },
];

export { headerMenuConfig, asideMenuConfig };

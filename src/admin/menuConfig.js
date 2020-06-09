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
  // 我的资料
  {
    name: ()=>intl.get('sider.profile'),
    path: '/merchant',
    icon: 'yonghu',
    operation:'profile',
    children: [
      {
        name:  ()=>intl.get('sider.profile_profileinfo'),
        operation:'profile_profileinfo',
        path: '/merchant/info'
      },
      {
        name:  ()=>intl.get('sider.profile_password'),
        operation:'profile_password',
        path: '/merchant/pwd'
      },
      {
        name:  ()=>intl.get('sider.profile_pgsever'),
        operation:'profile_pgsever',
        path: '/merchant/pgsever'
      },
    ],
  },
  // 子账号
  {
    name: ()=>intl.get('sider.account'),
    path: '/sub',
    icon: 'fans2',
    operation:'sub',
    children: [
      {
        name:  ()=>intl.get('sider.sub_userjurisdiction'),
        operation:'sub_addsub',
        path: '/sub/userjurisdiction'
      },
      {
        name:  ()=>intl.get('sider.sub_adduserlogin'),
        operation:'sub_addsub',
        path: '/sub/adduserlogin'
      },
      {
        name:  ()=>intl.get('sider.sub_userlogin'),
        operation:'sub_sublist',
        path: '/sub/userlogin'
      },
    ],
  },
  // 代理资料
  {
    name:  ()=>intl.get('sider.merchant'),
    path: '/agent',
    icon: 'shop',
    operation:'merchant',
    children: [
      {
        name:  ()=>intl.get('sider.merchant_add'),
        operation:'merchant_add',
        path: '/agent/create'
      },
      {
        name:  ()=>intl.get('sider.merchant_list'),
        operation:'merchant_list',
        path: '/agent/list'
      },
    ],
  },

  // 销售报告
  {
    name:  ()=>intl.get('sider.wallet'),
    path: '/wallet',
    icon: 'redpacket',
    operation:'wallet',
    children: [
      {
        name: ()=>intl.get('sider.wallet_cost'),
        operation:'wallet_cost',
        path: '/wallet/addcost'
      },
      {
        name: ()=>intl.get('sider.wallet_costlist'),
        operation:'wallet_costlist',
        path: '/wallet/cost'
      },
      {
        name:  ()=>intl.get('sider.wallet_inoutdailylist'),
        operation:'wallet_inoutdailylist',
        path: '/wallet/inoutdailylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_inoutmonthlylist'),
        operation:'wallet_inoutmonthlylist',
        path: '/wallet/inoutmonthlylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_withdrawdailylist'),
        operation:"wallet_withdrawdailylist",
        path: '/wallet/withdrawdailylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_withdrawmonthlylist'),
        operation:"wallet_withdrawmonthlylist",
        path: '/wallet/withdrawmonthlylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_transferdailylist'),
        operation:"wallet_transferdailylist",
        path: '/wallet/transferdailylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_transfermonthlylist'),
        operation:"wallet_transfermonthlylist",
        path: '/wallet/transfermonthlylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_depositdailylist'),
        operation:"wallet_depositdailylist",
        path: '/wallet/depositdailylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_depositmonthlylist'),
        operation:"wallet_depositmonthlylist",
        path: '/wallet/depositmonthlylist'
      },
    ],
  },


  // 我的财务
  {
    name:  ()=>intl.get('sider.myfinance'),
    path: '/myfinance',
    icon: 'message',
    operation:'myfinance',
    children: [
      {
        name:  ()=>intl.get('sider.myfinance_transferlist'),
        operation:'myfinance_transferlist',
        path: '/myfinance/transferlist'
      },
      {
        name:  ()=>intl.get('sider.myfinance_withdraw'),
        operation:'myfinance_withdraw',
        path: '/myfinance/withdraw'
      },
      {
        name:  ()=>intl.get('sider.myfinance_depositlist'),
        operation:'myfinance_depositlist',
        path: '/myfinance/depositlist'
      },
    ],
  },
  
  // 银行资料
  {
    name: ()=>intl.get('sider.bank'),
    path: '/bank',
    icon: 'coupons',
    operation:'bank',
    children: [
      {
        name: ()=>intl.get('sider.bank_bankaccount'),
        operation:'bank_bankaccount',
        path: '/bank/account'
      },
      {
        name: ()=>intl.get('sider.bank_bankaccess'),
        operation:'bank_bankaccess',
        path: '/bank/access'
      },
      {
        name: ()=>intl.get('sider.bank_bankjournal'),
        operation:'bank_bankjournal',
        path: '/bank/journal'
      },
      // {
      //   name: ()=>intl.get('sider.bank_banksms'),
      //   operation:'bank_banksms',
      //   path: '/bank/sms'
      // },
      // {
      //   name: ()=>intl.get('sider.bank_banktoken'),
      //   operation:'bank_banktoken',
      //   path: '/bank/token'
      // },
    ],
  },
  // 银行通知
  {
    name: ()=> intl.get('sider.notify'),
    path: '/notify',
    icon: 'horn',
    operation:'notify',
    children: [
      {
        name:  ()=>intl.get('sider.notify_smsnotify'),
        operation:'notify_smsnotify',
        path: '/notify/sms'
      },
      {
        name:  ()=>intl.get('sider.notify_tokennotify'),
        operation:'notify_tokennotify',
        path: '/notify/token'
      },
    ],
  },
  // 订单详情
  {
    name:()=>intl.get('sider.order'),
    path: '/order',
    icon: 'chart',
    operation:'order',
    children: [
      {
        name: ()=>intl.get('sider.order_orderlist'),
        operation:'order_orderlist',
        path: '/order/list'
      },
      {
        name: ()=>intl.get('sider.order_orderstat'),
        operation:'order_orderstat',
        path: '/order/statisticsorder'
      },
      {
        name: ()=>intl.get('sider.order_ordererror'),
        operation:'order_ordererror',
        path: '/order/ordererror'
      },
    ],
  },
  // PG管理
  {
    name: ()=>intl.get('sider.pg'),
    path: '/PG',
    icon: 'compass',
    operation:'pg',
    children: [
      {
        name:  ()=>intl.get('sider.pg_pglist'),
        operation:'pg_pglist',
        path: '/PG/list'
      },
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
  // 系统通告
  {
    name: ()=>intl.get('sider.notice'),
    path: '/notice',
    icon: 'speaker',
    operation:'notice',
    children:[]
  },
  // 联系我们
  {
    name: ()=>intl.get('sider.contact'),
    path: '/contact',
    icon: 'phone',
    operation:'contact',
    children:[]
  },

  // 机器人管理
  {
    name: ()=>intl.get('sider.robot'),
    path: '/robot',
    icon: 'sucai',
    operation:'robot',
    children: [
      {
        name: ()=>intl.get('sider.robot_add'),
        operation:'robot_add',
        path: '/robot/create'
      },
      {
        name: ()=>intl.get('sider.robot_robotlist'),
        operation:'robot_robotlist',
        path: '/robot/list'
      },
    ],
  },
  
  // 原因管理
  {
    name: ()=>intl.get('sider.reason'),
    path: '/reason',
    icon: 'content',
    operation:'reason',
    children: [
      {
        name: ()=>intl.get('sider.reason_list'),
        operation:'reason',
        path: '/reason/list'
      },
    ],
  },
  // log 打印日志
  {
    name: ()=>intl.get('sider.loglist'),
    path: '/log',
    icon: 'content',
    // operation:'log_list',
    children: [
      {
        name: ()=>intl.get('sider.loglist'),
        // operation:'log_list',
        path: '/log/list'
      },
    ],
  },

];

export { headerMenuConfig, asideMenuConfig };

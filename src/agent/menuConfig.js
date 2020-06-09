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
    path: '/profile',
    icon: 'yonghu',
    operation:"profile",
    children: [
      {
        name:()=>intl.get('sider.profile_info'),
        operation:"profile_info",
        path: '/profile/info'
      },
      {
        name:()=>intl.get('sider.profile_pwd'),
        operation:"profile_pwd",
        path: '/profile/pwd'
      },
      {
        name:()=>intl.get('sider.profile_pgsever'),
        operation:"profile_pgsever",
        path: '/profile/pgsever'
      },
      // {
      //   name:()=>intl.get('sider.profile_frontlogo'),
      //   operation:"profile_frontlogo",
      //   path: '/profile/frontlogo'
      // },
    ],
  },

  // 子账号
  {
    name:  ()=>intl.get('sider.account'),
    path: '/sub',
    icon: 'fans2',
    operation:"sub",
    children: [
      {
        name:  ()=>intl.get('sider.sub_userjurisdiction'),
        operation:'sub_addsub',
        path: '/sub/userjurisdiction'
      },
      {
        name: ()=>intl.get('sider.sub_addsub'),
        operation:"sub_addsub",
        path: '/sub/create'
      },
      {
        name: ()=>intl.get('sider.sub_sublist'),
        operation:"sub_sublist",
        path: '/sub/list'
      },
    ],
  },
  // 商家资料
  {
    name:  ()=>intl.get('sider.merchant'),
    path: '/merchant',
    icon: 'shop',
    operation:"merchant",
    children: [
      {
        name:  ()=>intl.get('sider.merchant_create'),
        operation:"merchant_create",
        path: '/merchant/create'
      },
      {
        name:  ()=>intl.get('sider.merchant_list'),
        operation:"merchant_list",
        path: '/merchant/list'
      },
      {
        name:  ()=>intl.get('sider.merchant_bankcardlist'),
        operation:"merchant_bankcardlist",
        path: '/merchant/bankcardlist'
      }
    ],
  },
  // 销售报告
  {
    name:  ()=>intl.get('sider.wallet'),
    path: '/wallet',
    icon: 'redpacket',
    operation:"wallet",
    children: [
      {
        name: ()=>intl.get('sider.wallet_cost'),
        operation:"wallet_cost",
        path: '/wallet/addcost'
      },
      {
        name: ()=>intl.get('sider.wallet_costlist'),
        operation:"wallet_costlist",
        path: '/wallet/costlist'
      },
      {
        name:  ()=>intl.get('sider.wallet_inoutdailylist'),
        operation:"wallet_inoutdailylist",
        path: '/wallet/inoutdailylist'
      },
      {
        name:  ()=>intl.get('sider.wallet_inoutmonthlylist'),
        operation:"wallet_inoutmonthlylist",
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
  // 我的账目
  {
    name:  ()=>intl.get('sider.mymoneynumber'),
    path: '/mymoneynumber',
    icon: 'table',
    operation:"mymoneynumber",
    children: [
      {
        name: ()=>intl.get('sider.mymoneynumber_createfinance'),
        operation:"mymoneynumber_createfinance",
        path: '/mymoneynumber/createfinance'
      },
      {
        name: ()=>intl.get('sider.mymoneynumber_financelist'),
        operation:"mymoneynumber_financelist",
        path: '/mymoneynumber/financelist'
      }
    ],
  },
  // 我的财务
  {
    name:  ()=>intl.get('sider.myfinance'),
    path: '/myfinance',
    icon: 'message',
    operation:"myfinance",
    children: [
      {
        name: ()=>intl.get('sider.myfinance_opentransfer'),
        operation:"myfinance_opentransfer",
        path: '/myfinance/opentransfer'
      },
      {
        name: ()=>intl.get('sider.myfinance_extractlist'),
        operation:"myfinance_extractlist",
        path: '/myfinance/extractlist'
      },
      {
        name: ()=>intl.get('sider.myfinance_transferlist'),
        operation:"myfinance_transferlist",
        path: '/myfinance/transferlist'
      },
      {
        name:  ()=>intl.get('sider.myfinance_withdrawlist'),
        operation:"myfinance_withdrawlist",
        path: '/myfinance/withdrawlist'
      },
      {
        name:  ()=>intl.get('sider.myfinance_depositlist'),
        operation:"myfinance_depositlist",
        path: '/myfinance/depositlist'
      },
      {
        name:  ()=>intl.get('sider.myfinance_recharge'),
        operation:"myfinance_recharge",
        path: '/myfinance/recharge'
      },
      {
        name:  ()=>intl.get('sider.myfinance_unverified'),
        operation:"myfinance_unverified",
        path: '/myfinance/unverified'
      },
    ],
  },

  // 银行资料
  {
    name:   ()=>intl.get('sider.bank'),
    path: '/bank',
    icon: 'coupons',
    operation:"bank",
    children: [
      {
        name:   ()=>intl.get('sider.bank_access'),
        operation:"bank_access",
        path: '/bank/access'
      },
      {
        name:   ()=>intl.get('sider.bank_account'),
        operation:"bank_account",
        path: '/bank/account'
      },
      {
        name:   ()=>intl.get('sider.bank_journal'),
        operation:"bank_journal",
        path: '/bank/journal'
      },
      {
        name:   ()=>intl.get('sider.bank_allot'),
        operation:"bank_journal",
        path: '/bank/allot'
      },
      // {
      //   name:   ()=>intl.get('sider.bank_sms'),
      //   operation:"bank_sms",
      //   path: '/bank/sms'
      // },
      // {
      //   name:   ()=>intl.get('sider.bank_token'),
      //   operation:"bank_token",
      //   path: '/bank/token'
      // },
    ],
  },

  // 银行通知
  {
    name: ()=> intl.get('sider.notify'),
    path: '/notify',
    icon: 'horn',
    operation:"notify",
    children: [
      {
        name:  ()=>intl.get('sider.notify_sms'),
        operation:"notify_sms",
        path: '/notify/sms'
      },
      {
        name:  ()=>intl.get('sider.notify_token'),
        operation:"notify_token",
        path: '/notify/token'
      },
      {
        name:  ()=>intl.get('sider.notify_waringlist'),
        operation:"notify_waringlist",
        path: '/notify/waringlist'
      }
    ],
  },
  // 订单详情
  {
    name:  ()=>intl.get('sider.order'),
    path: '/order',
    icon: 'chart',
    operation:"order",
    children: [
      {
        name:  ()=>intl.get('sider.order_list'),
        operation:"order_list",
        path: '/order/list' },
      {
        name:  ()=>intl.get('sider.order_statisticsorder'),
        operation:"order_statisticsorder",
        path: '/order/statisticsorder'
      },
      {
        name:  ()=>intl.get('sider.order_orderbankstatistics'),
        operation:"order_orderbankstatistics",
        path: '/order/orderbankstatistics'
      },
      {
        name:  ()=>intl.get('sider.order_ordererror'),
        operation:"order_ordererror",
        path: '/order/ordererror'
      },
    ],
  },
  // PG管理
  {
    name: ()=>intl.get('sider.pg'),
    path: '/PG',
    icon: 'compass',
    operation:"pg",
    children: [
      {
        name:  ()=>intl.get('sider.pg_create'),
        operation:"pg_create",
        path: '/PG/create'
      },
      {
        name:  ()=>intl.get('sider.pg_list'),
        operation:"pg_list",
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
    children: [],
  },
  // 联系我们
  {
    name: ()=>intl.get('sider.contact'),
    path: '/contact',
    icon: 'phone',
    operation:'contact',
    children: [],
  },

];

export { headerMenuConfig, asideMenuConfig };

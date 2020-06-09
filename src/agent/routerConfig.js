// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from './layouts/BlankLayout';
import EditPassword from './pages/EditPassword';
import NotFound from './pages/NotFound';
import Userinfo from './pages/Userinfo';
import Login from './pages/Login';
import Withdrawlist from './pages/Withdrawlist'
import Order from './pages/Order'
import BankAccess from './pages/BankAccess'
import BankAccount from './pages/BankAccount'
import BankToken from './pages/BankToken'
import BankJournal from './pages/BankJournal'
import BankSms from './pages/BankSms'
import PG from './pages/PG'
import CreatePG from './pages/CreatePG'
import Merchantlist from './pages/UserList'
import CreateMerchant from './pages/CreateUser'
import UserLogin from './pages/UserLogin'
import CreateUserLogin from './pages/CreateUserLogin'
import ServerPermission from './pages/ServerPermission'
import SmsNotify from './pages/SmsNotify'
import TokenNotify from './pages/TokenNotify'
import WalletInfo from './pages/WalletInfo'
import Notice from './pages/Notice'
import Contact from './pages/Contact'
import Operation from './pages/Operation'
import Costlist from './pages/Costlist';
import Addcost from './pages/Addcost';
import Orderstastatics from './pages/Orderstatistics';
import CreateFinance from './pages/Createfinance';
import Financelist from './pages/Financelist';
import Transferlist from './pages/Transfer';
import Extractlist from './pages/Extract';
import Opentransfer from './pages/Opentransfer';
import inoutdailylist from './pages/inoutdailylist';
import inoutmonthlylist from './pages/inoutmonthlylist';
import withdrawdailylist from './pages/withdrawdailylist';
import withdrawmonthlylist from './pages/withdrawmonthlylist';
import transferdailylist from './pages/transferdailylist';
import transfermonthlylist from './pages/transfermonthlylist';
import depositdailylist from './pages/depositdailylist';
import depositmonthlylist from './pages/depositmonthlylist';
import Ordererror from './pages/Ordererror';
import Orderbankstatistics from './pages/Orderbankstatistics';
import Deposilist from './pages/Deposilist';
import Bankcardlist from './pages/Bankcardlist';
import Recharge from './pages/Recharge';
import Waringlist from './pages/Warninglist';
import Transferout from './pages/Transferout'
import Robot from './pages/Robot'
import Journallist from './pages/Journallist';
import PgSever from './pages/PgSever';
import Register from './pages/Register';
import UserJurisdiction from './pages/UserJurisdiction';
import BankAllot from './pages/BankAllot';
import Unverified from './pages/Unverified/index';
import FrontLogo from './pages/FrontLogo/index';

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/register',
    layout: BlankLayout,
    component: Register,
  },
  // 我的资料
  {
    path: '/profile',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Userinfo,
    operation:"profile",
    children: [
      {
        path: 'pwd',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"profile_pwd",
        component: EditPassword,
      },
      {
        path: 'info',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"profile_info",
        component: Userinfo,
      },
      {
        path: 'pgsever',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"profile_pgsever",
        component: PgSever,
      },
      {
        path: 'frontlogo',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"profile_frontlogo",
        component: FrontLogo,
      },
    ],
  },
  // 子账号
  {
    path: '/sub',
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateUserLogin,
    operation:"sub",
    children: [
      {
        path: 'userjurisdiction',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'sub_addsub',
        component: UserJurisdiction,
      },
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"sub_sublist",
        component: UserLogin,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"sub_addsub",
        component: CreateUserLogin,
      },
    ],
  },
  // 商家资料
  {
    path: '/merchant',
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateMerchant,
    operation:"merchant",
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"merchant_list",
        component: Merchantlist,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"merchant_create",
        component: CreateMerchant,
      },
      {
        path: 'bankcardlist',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"merchant_bankcardlist",
        component: Bankcardlist,
      }
    ],
  },
  // 销售报告
  {
    path: '/wallet',
    layout: HeaderAsideFooterResponsiveLayout, 
    component: WalletInfo,
    operation:"wallet",
    children: [
      { 
        path: 'costlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Costlist,
        operation:"wallet_costlist",
      },
      {
        path: 'addcost',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Addcost,
        operation:"wallet_cost",
      },
      {
        path: 'inoutdailylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: inoutdailylist,
        operation:"wallet_inoutdailylist",
      },
      {
        path: 'inoutmonthlylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: inoutmonthlylist,
        operation:"wallet_inoutmonthlylist",
      },
      {
        path: 'withdrawdailylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: withdrawdailylist,
        operation:"wallet_withdrawdailylist",
      },
      {
        path: 'withdrawmonthlylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: withdrawmonthlylist,
        operation:"wallet_withdrawmonthlylist",
      },
      {
        path: 'transferdailylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: transferdailylist,
        operation:"wallet_transferdailylist",
      },
      {
        path: 'transfermonthlylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: transfermonthlylist,
        operation:"wallet_transfermonthlylist",
      },
      {
        path: 'depositdailylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: depositdailylist,
        operation:"wallet_depositdailylist",
      },
      {
        path: 'depositmonthlylist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: depositmonthlylist,
        operation:"wallet_depositmonthlylist",
      },
    ],
  },
  // 我的账目
  {
    path: '/mymoneynumber',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Financelist,
    operation:"mymoneynumber",
    children: [
      {
        path: 'createfinance',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreateFinance,
        operation:"mymoneynumber_createfinance",
      },
      {
        path: 'financelist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Financelist,
        operation:"mymoneynumber_financelist",
      },
    ],
  },
  // 我的财务
  {
    path: '/myfinance',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Opentransfer,
    operation:"myfinance",
    children: [
      {
        path: 'opentransfer',
        layout: HeaderAsideFooterResponsiveLayout,
        component:Opentransfer,
        operation:"myfinance_opentransfer",
      },
      {
        path: 'extractlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Extractlist,
        operation:"myfinance_extractlist",
      },
      {
        path: 'transferlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component:Transferlist,
        operation:"myfinance_transferlist",
      },
      {
        path: 'withdrawlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Withdrawlist,
        operation:"myfinance_withdrawlist",
      },
      {
        path: 'depositlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Deposilist,
        operation:"myfinance_depositlist",
      },
      {
        path: 'recharge',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Recharge,
        operation:"myfinance_recharge",
      },
      {
        path: 'unverified',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Unverified,
        operation:"myfinance_unverified",
      },
    ],
  },

  // 银行资料
  {
    path: '/bank',
    layout: HeaderAsideFooterResponsiveLayout,
    component: BankAccount,
    operation:"bank",
    children: [
      {
        path: 'account',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"bank_account",
        component: BankAccount,
      },
      {
        path: 'access',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"bank_access",
        component: BankAccess,
      },
      {
        path: 'sms',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"bank_sms",
        component: BankSms,
      },
      {
        path: 'token',
        layout: HeaderAsideFooterResponsiveLayout,
        component: BankToken,
        operation:"bank_token",
      },
      {
        path: 'journal',
        layout: HeaderAsideFooterResponsiveLayout,
        component: BankJournal,
        operation:"bank_journal",
      },
      {
        path: 'allot',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"bank_journal",
        component: BankAllot,
      },
    ],
  },

  // 银行通知
  {
    path: '/notify',
    layout: HeaderAsideFooterResponsiveLayout,
    component: SmsNotify,
    operation:"notify",
    children: [
      {
        path: '/sms',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"notify_sms",
        component: SmsNotify,
      },
      {
        path: '/token',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"notify_token",
        component: TokenNotify,
      },
      {
        path: '/waringlist',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"notify_waringlist",
        component: Waringlist,
      }
    ],
  },
  // 订单详情
  {
    path: '/order',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Order,
    operation:"order",
    children: [
      {
        path: '/list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"order_list",
        component: Order,
      },
      {
        path: '/statisticsorder',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"order_statisticsorder",
        component: Orderstastatics,
      },
      {
        path: '/orderbankstatistics',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"order_orderbankstatistics",
        component: Orderbankstatistics,
      },
      {
        path: '/ordererror',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"order_ordererror",
        component: Ordererror,
      },
    ],
  },
  // PG管理
  {
    path: '/PG',
    layout: HeaderAsideFooterResponsiveLayout,
    operation:"pg",
    component: PG,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"pg_list",
        component: PG,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:"pg_create",
        component: CreatePG,
      },
    ]
  },
  // 操作管理
  {
    path: '/operation',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Operation,
    operation:'operation',
    children: [
      {
        path: '/list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Operation,
        operation:'operation_list',
      },
    ],
  },
  // 联系我们
  {
    path: '/contact',
    operation:'contact',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Contact,
  },
  // 系统通告
  {
    path: '/notice',
    operation:'notice',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Notice,
  },

  {
    path: '/server',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ServerPermission,
  },
  {
    path: '*',
    // layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;

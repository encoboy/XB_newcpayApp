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
import Robot from './pages/Robot'
import PG from './pages/PG'
import CreatePG from './pages/CreatePG'
import Merchantlist from './pages/Merchantlist'
import CreateMerchant from './pages/CreateMerchant'
// import Statisticsorder from './pages/Statisticsorder'
import CreateRobot from './pages/CreateRobot'
import LogList from './pages/LogList'
import SmsNotify from './pages/SmsNotify'
import TokenNotify from './pages/TokenNotify'
import BillList from './pages/BillList'
import UserLogin from './pages/UserLogin'
import CreateUserLogin from './pages/CreateUserLogin'
import Journallist from './pages/Journallist'
import Notice from './pages/Notice'
import Contact from './pages/Contact'
import ReasonList from './pages/ReasonList'
import ServerPermission from './pages/ServerPermission'
import Operation from './pages/Operation'
import Addcost from './pages/Addcost';
import Moneylist from './pages/Moneylist';
import Orderstatics from './pages/Orderstatics';
// 新增
import Transferlist from './pages/Transferlist';
import inoutdailylist from './pages/inoutdailylist';
import inoutmonthlylist from './pages/inoutmonthlylist';
import withdrawdailylist from './pages/withdrawdailylist';
import withdrawmonthlylist from './pages/withdrawmonthlylist';
import transferdailylist from './pages/transferdailylist';
import transfermonthlylist from './pages/transfermonthlylist';
import depositdailylist from './pages/depositdailylist';
import depositmonthlylist from './pages/depositmonthlylist';
import Ordererror from './pages/Ordererror';
import Deposilist from './pages/Deposilist';
import PgSever from './pages/PgSever';
import UserJurisdiction from './pages/UserJurisdiction';

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
  // 我的资料
  {
    path: '/merchant',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Userinfo,
    operation:'profile',
    children: [
      {
        path: 'pwd',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'profile_password',
        component: EditPassword,
      },
      {
        path: 'info',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'profile_profileinfo',
        component: Userinfo,
      },
      {
        path: 'pgsever',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'profile_pgsever',
        component: PgSever,
      },
    ],
  },
  // 子账号
  {
    path: '/sub',
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateUserLogin,
    operation:'sub',
    children: [
      {
        path: 'userjurisdiction',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'sub_addsub',
        component: UserJurisdiction,
      },
      {
        path: 'adduserlogin',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'sub_addsub',
        component: CreateUserLogin,
      },
      {
        path: 'userlogin',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'sub_sublist',
        component: UserLogin,
      },
    ],
  },
  // 代理资料
  {
    path: '/agent',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Merchantlist,
    operation:'merchant',
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'merchant_list',
        component: Merchantlist,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'merchant_add',
        component: CreateMerchant,
      }
    ],
  },
    // 销售报告
    { 
      path: '/wallet',
      layout: HeaderAsideFooterResponsiveLayout, 
      component: Moneylist,
      operation:"wallet",
      children: [
        {
          path: 'cost',
          layout: HeaderAsideFooterResponsiveLayout,
          component: Moneylist,
          operation:"wallet_cost",
        },
        {
          path: 'addcost',
          layout: HeaderAsideFooterResponsiveLayout,
          component: Addcost,
          operation:"wallet_costlist",
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
  // 我的财务
  {
    path: '/myfinance',
    layout: HeaderAsideFooterResponsiveLayout,
    component: '',
    operation:"myfinance",
    children: [
      {
        path: 'transferlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Transferlist,
        operation:'myfinance_transferlist',
      },
      {
        path: 'withdraw',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Withdrawlist,
        operation:'myfinance_withdraw',
      },
      {
        path: 'depositlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Deposilist,
        operation:'myfinance_depositlist',
      },
    ],
  },
  {
    path: '/bank',
    operation:'bank',
    layout: HeaderAsideFooterResponsiveLayout,
    component: BankAccount,
    children: [
      {
        path: 'account',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'bank_bankaccount',
        component: BankAccount,
      },
      {
        path: 'access',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'bank_bankaccess',
        component: BankAccess,
      },
      {
        path: 'sms',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'bank_banksms',
        component: BankSms,
      },
      {
        path: 'token',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'bank_banktoken',
        component: BankToken,
      },
      {
        path: 'journal',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'bank_bankjournal',
        component: BankJournal,
      }
    ],
  },
  {
    path: '/notify',
    layout: HeaderAsideFooterResponsiveLayout,
    component: SmsNotify,
    operation:'notify',
    children: [
      {
        path: '/sms',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'notify_smsnotify',
        component: SmsNotify,
      },
      {
        path: '/token',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'notify_tokennotify',
        component: TokenNotify,
      },
    ],
  },
  {
    path: '/robot',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Robot,
    operation:'robot',
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'robot_robotlist',
        component: Robot,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'robot_add',
        component: CreateRobot,
      },
    ]
  },

  {
    path: '/PG',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PG,
    operation:'pg',
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'pg_pglist',
        component: PG,
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
  // 订单详情
  {
    path: '/order',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Order,
    operation:'order',
    children: [
      {
        path: '/list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'order_orderlist',
        component: Order,
      },
      {
        path: '/statisticsorder',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'order_orderstat',
        component: Orderstatics,
      },
      {
        path: '/ordererror',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'order_ordererror',
        component: Ordererror,
      },
    ],
  },
  // 打印日志
  {
    path: '/log',
    layout: HeaderAsideFooterResponsiveLayout,
    // operation:'log',
    component: LogList,
    children: [
      {
        path: '/list',
        layout: HeaderAsideFooterResponsiveLayout,
        // operation:'log_list',
        component: LogList,
      },
    ],
  },
  // 原因管理
  {
    path: '/reason',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ReasonList,
    operation:'reason',
    children: [
      {
        path: '/list',
        layout: HeaderAsideFooterResponsiveLayout,
        operation:'reason',
        component: ReasonList,
      },
    ],
  },
  {
    path: '/notice',
    layout: HeaderAsideFooterResponsiveLayout,
    operation:'notice',
    component: Notice,
  },
  {
    path: '/contact',
    layout: HeaderAsideFooterResponsiveLayout,
    operation:'contact',
    component: Contact,
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

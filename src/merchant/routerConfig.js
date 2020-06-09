// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from './layouts/BlankLayout';
import EditPassword from './pages/EditPassword';
import NotFound from './pages/NotFound';
import UserCards from './pages/UserCards'
import CreateUserCard from './pages/CreateUserCard'
import Userinfo from './pages/Userinfo';
import Login from './pages/Login';
import UserLogin from './pages/UserLogin';
import CreateUserLogin from './pages/CreateUserLogin';
import WalletInfo from './pages/WalletInfo'
import WalletJournal from './pages/WalletJournal'
import TodayBill from './pages/TodayBill'
import Transferout from './pages/Transferout'
import Transferlist from './pages/Transferlist'
import Withdraw from './pages/Withdraw'
import Withdrawlist from './pages/Withdrawlist'
import Order from './pages/Order'
import ServerPermission from './pages/ServerPermission'
import Orderstat from './pages/Orderstat'
import Notice from './pages/Notice'
import Contact from './pages/Contact'
import Operation from './pages/Operation'
import Newtodaybill from './pages/Newtodaybill';
import Newdailybill from './pages/Newdailybill';
import Newmonthlybill from './pages/Newmonthlybill';
import Orderdeposit from './pages/Orderdeposit/index';

const routerConfig = [

  {
    path: '/merchant',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Userinfo,
    operation:'profile',
    children: [
      {
        path: 'info',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Userinfo,
        operation:'profile_profileinfo',
      },
      {
        path: 'pwd',
        layout: HeaderAsideFooterResponsiveLayout,
        component: EditPassword,
        operation:'profile_password',
      },
    ],
  },
  // 子账号
  {
    path: '/sub',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserLogin,
    operation:'sub',
    children: [
      {
        path: 'userlogin',
        layout: HeaderAsideFooterResponsiveLayout,
        component: UserLogin,
        operation:'sub_sublist'
      },
      {
        path: 'adduserlogin',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreateUserLogin,
        operation:'sub_addsub',
      }
      ]
  },
  // 销售报告
  {
    path: '/wallet',
    layout: HeaderAsideFooterResponsiveLayout,
    component: WalletInfo,
    operation:'wallet',
    children: [
      {
        path: 'info',
        layout: HeaderAsideFooterResponsiveLayout,
        component: WalletInfo,
        operation:'wallet_walletinfo'
      },
      {
        path: 'journal',
        layout: HeaderAsideFooterResponsiveLayout,
        component: WalletJournal,
        operation:'wallet_cardjournal'
      },
      {
        path: 'addusercards',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreateUserCard,
        operation:'wallet_addbankcard'
      },
      {
        path: 'usercards',
        layout: HeaderAsideFooterResponsiveLayout,
        component: UserCards,
        operation:'wallet_bankcard'
      },
      {
        path: 'withdraw',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Withdraw,
        operation:'wallet_withdraw'
      },
      {
        path: 'withdrawlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Withdrawlist,
        operation:'wallet_withdrawlist'
      },
      {
        path: 'transferout',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Transferout,
        operation:'wallet_transfer'
      },
      {
        path: 'transferlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Transferlist,
        operation:'wallet_audittransfer'
      },
    ]
  },
  // 我的订单
  {
    path: '/order',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Order,
    operation:'order',
    children: [
      {
        path: 'orderstat',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Orderstat,
        operation:'order_receipt',
      },
      {
        path: 'depositlist',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Orderdeposit,
        operation:'order_depositlist',
      },
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Order,
        operation:'order_orderlist',
      },

    ],
  },
  // 账单管理
  {
    path: '/bill',
    layout: HeaderAsideFooterResponsiveLayout,
    component: TodayBill,
    operation:'bill',
    children: [
      {
        path: 'today',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Newtodaybill,
        operation:'bill_todaybill',
      },
      {
        path: 'daily',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Newdailybill,
        operation:'bill_dailybill',
      },
      {
        path: 'monthly',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Newmonthlybill,
        operation:'bill_monthilybill',
      },
    ]
  },

  {
    path: '/operation',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Operation,
    operation:'operation',
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Operation,
        operation:'operation_list',
      },
    ],
  },
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
    path: '/notice',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Notice,
    operation:'notice',
  },
  {
    path: '/contact',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Contact,
    operation:'contact',
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

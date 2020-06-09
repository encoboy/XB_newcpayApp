const app = {
  admin:{
    staging:{
      output: './build/staging/admin',
      config: {
        dynamic:true,
        _root: 'https://ncpayadminappapi.syncbug.com/index.php',
        title: 'New CPay 管理层',
      },
    },
    live:{
      output: './build/production/admin',
      config: {
        _root: 'https://adminapi.rewqpay.com/index.php',
        title: 'New CPay admin live',
      },
    }
  },
  agent:{
    staging:{
      output: './build/staging/agent',
      config: {
        dynamic:false,
        _root: 'https://ncpayagentappapi.syncbug.com/index.php',
        title: '',
      },
    },
    live:{
      output: './build/production/agent',
      config: {
        _root: 'https://agentapi.ncpay.cash/index.php',
        title: '',
      },
    }
  },
  merchant:{
    staging:{
      output: './build/staging/merchant',
      config: {
        dynamic:false,
        _root: 'https://ncpaymerchantappapi.syncbug.com/index.php',
        title: '',
      },
    },
    live:{
      output: './build/production/merchant',
      config: {
        _root: 'https://merchantapi.ncpay.cash/index.php',
        title: '',
      },
    }
  }
};


function stringfy(conf) {
  const confs = {};
  Object.keys(conf).forEach((key) => {
    confs[`process.${key}`] = JSON.stringify(conf[key]);
  });
  return confs;
}

module.exports = function (confName,env) {
  // console.log(confName,env);
  if (app[confName]) {
    if(app[confName][env]){
      const conf = app[confName][env].config || {};
      return Object.assign({}, app[confName][env], { config: stringfy(conf) });
    }
    const conf = app[confName].staging.config || {};
    return Object.assign({}, app[confName].staging, { config: stringfy(conf) });
  }
  console.log(`Config name :入口 ${confName}环境${env} is not found in the app-config, it will run merchant config`);
  const conf = app.merchant.staging.config || {};
  return Object.assign({}, app.merchant.staging, { config: stringfy(conf) });
};


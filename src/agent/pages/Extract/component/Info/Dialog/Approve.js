import React, { Component } from 'react';
import { Dialog, Input, Radio, Button,Form,Field ,Feedback,Checkbox,Select} from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import './Approve.scss';
// import logo_fetch from '../../../../../components/fetchForm';
import {connect} from 'react-redux';
import {hasAction} from '../../../../../util';

const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;
const Toast = Feedback.toast;

class Approve extends Component {
  static displayName = 'Approve';
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
      isMobile: false,
      id:null,
      allname:[],
      shouldUpdatePosition:true,
      logo:null,
      imgname:null
    };
    this.field = new Field(this);
  }
  componentDidMount() {
    this.enquireScreenRegister();
    this.getallusername();
    console.log(this.props);
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = (data) => {
    this.field.setValues({ ...data });
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false
    },()=>{
      this.field.reset()
    });
  };


//   showDetails = () => {
//     _fetch({
//         url:'/Merchant/Agentaccount',
//         data:{
//             method:'accountdetail',
//             ledgerid:this.props.detaildata.id
//         },
//         success:(data)=>{
//             console.log(data);
//             this.setState({
//               detaildata:data.data
//             })
//         }
//     })
//   }



  onOk = () => {
    this.field.validate((error,values) => {
      console.log(values);
      if (error) {
        return;
      }
      this.hideDialog();
      logo_fetch({
        url:'/Merchant/Userwithdraw',
        data:{
          withdrawid:this.props.detailid,
          method:'updatewithdraw',
          status:"verified",
          description:values.description,
          // resit:this.state.logo,
        },
        success:(data)=>{
          console.log(data);
          if(data.status==='ok'){
            Toast.success(_intl.get('myfinance.actionsuccess'));
            setTimeout(this.props.goback(),2000);
          }
        }
      })

    });
  };
     // 得到图片
     isInArray=(arr,value)=>{
      for(var i = 0; i < arr.length; i++){
      if(value === arr[i]){
      return true;
      }
      }
      return false;
      }
    getlogo = (e) => {
      console.log(e);
      let logo = e.target.files[0];
      console.log(logo)
      // var file = document.getElementById('file').value;
      // var extension = file.substr(index + 1);
      // var arr = ['jpeg','png','jpg','gif'];
      // if (this.isInArray(arr,extension)) {
      //   var img = document.getElementById("previewimg");
      //   img.src = window.URL.createObjectURL(e.target.files[0]);
      //   } else {
      //   message.info('请选择正确的图片格式');
      //   return false;
      //   }
      this.setState({
        logo:logo,
        imgShow:true,
        imgname:logo.name
      })
    }

  // 得到所有账户名
  getallusername = () => {
    _fetch({
      url:'/Merchant/Agentaccount',
      data:{
        method:'allaccountsname'
      },
      success:(data)=>{
        console.log(data);
        this.setState({
          allname:data.data
        })
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  render() {
    const { isMobile,allname,imgname } = this.state;
    const {btn} = this.props;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const init = this.field.init;
    const {data,type} = this.props;
    return (
      <div style={styles.inlineBlock}>
      <Dialog
        className="simple-form-dialog"
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title={_intl.get('waitetransfer.ok')}
        {...this.props}
        onOk={this.onOk}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        visible={this.state.visible}
        isFullScreen='true'
      >
  <Form direction="ver" field={this.field } labelAlign='top'>
        <div>
          {/*<FormItem label={_intl.get('myfinance.financename')}>
            <Select style={{width:'100%'}} {...init('ledgerid',{rules:[{required:true,message:_intl.get('public.required')}]})}>
                {
                  allname.map(function (item,index) {
                    return(
                      <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                    )
                  })
                }
            </Select>
          </FormItem>
          <FormItem label={_intl.get('waitetransfer.amount')}>
          <Input
            {...init('amount',{
                rules:[{required:true,message:_intl.get('public.required')}
                        , { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: _intl.get('myfinance.mustnumber') },]
            })}
          />
        </FormItem>*/}

                {/*<a href="#" className="file">
                <label for="file">{_intl.get('public.logo')}</label>
                <input
                onChange={(e)=>{this.getlogo(e)}}
                name="file" 
                type="file" 
                className='upload'
                id="file"
                />
            </a>
      <div style={styles.pupOpen}>{_intl.get('myfinance.logoname')}:{imgname}</div>*/}


            <FormItem label={_intl.get('myfinance.description')} >
                <Input
                {...init('description',{
                    rules:[
                    {required:true,message:_intl.get('public.required')}
                    ]
                })}
                />
            </FormItem>

        </div>


    </Form>
  </Dialog>
    {hasAction(btn,'Amend_transferok')&&<Button type="primary" onClick={()=>this.showDialog(data)} >
        {_intl.get('waitetransfer.ok')}
    </Button>}
  </div>
    );
  }
}

const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStatToProp)(Approve);


const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  inlineBlock:{
    display:'inline',
  },
  pupOpen:{
      marginBottom:'20px'
  }
  
};
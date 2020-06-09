import React, { Component } from 'react';
import { Table ,Radio,Pagination,Feedback,Button,moment} from '@icedesign/base';
import AddBtnOperation from './../BtnOperation/AddBtnOperation';
import EditBtnOperation from './../BtnOperation/EditBtnOperation';
import DelBtnOperationGroups from './../BtnOperation/DelBtnOperationGroups/index';
const { Group: RadioGroup } = Radio;
const Toast = Feedback.toast;
 class DisplayPageAll extends Component{
  state = {

  };
  componentDidMount(){
 
  }
 
  render(){
    const {buttonoperategroups,getButtonOperationGroups,btnoperation} = this.props;
    return(
      <div>
        <div style={{margin:'10px 0 20px 0'}}>
          <AddBtnOperation 
            btnoperate={btnoperation}
            getButtonOperationGroups={getButtonOperationGroups}/>
        </div>
        <Table dataSource={buttonoperategroups} hasBorder={false} align="center">
          <Table.Column
            key='id'
            dataIndex='id'
            width={20}
            title={_intl.get('bill.id')}
          />
          <Table.Column
            key='name'
            dataIndex='name'
            width={20}
            title={_intl.get('userJurisdiction.name')}
          />
          <Table.Column
            key='operations'
            dataIndex='operations'
            width={50}
            title={(<div>{_intl.get('userJurisdiction.right')}</div>)}
            cell={(text,index,record)=>{
              let btnOperationArr = text.split('|');
              const maxLength = 5;
              let fiveOperationArr = [];
              btnOperationArr.map(function (childItem,childIndex){
                if(btnOperationArr.length>maxLength&&childIndex<maxLength){
                  fiveOperationArr.push(childItem);
                  if(childIndex==4){
                    fiveOperationArr.push('.......')
                  }
                }

              });
              const fiveChildren = (
                fiveOperationArr.map(function(fiveItem,fiveIndex){
                  return(
                    <span style={{marginRight:'5px'}} key={fiveIndex}>{_intl.get(`operation.${fiveItem}`)?_intl.get(`operation.${fiveItem}`):fiveItem}</span>
                  )
                })
              )
              const children = (
                <div>
                  { btnOperationArr.map(function (childItem,childIndex){
                    if(btnOperationArr.length<=maxLength){
                      return(
                        <span style={{marginRight:'5px'}} key={childIndex}>{_intl.get(`operation.${childItem}`)}</span>
                      )
                    }
                  })}
                </div>
              )

                return(<span>{btnOperationArr.length>maxLength?fiveChildren:children}</span>)
              }
            }
          />

          <Table.Column
            key='action'
            dataIndex='action'
            width={20}
            title={_intl.get('public.action')}
            cell={(text,index,record)=>{
              let BtnOperation = record.operations.split('|');
              let btnName = record.name;
              return(
                <span>
                  <EditBtnOperation 
                    id={record.id} 
                    getButtonOperationGroups={getButtonOperationGroups} 
                    BtnOperation={BtnOperation} 
                    btnName={btnName}
                    btnoperate={btnoperation}
                    />
                  &nbsp;&nbsp;&nbsp;
                  <DelBtnOperationGroups id={record.id} getButtonOperationGroups={getButtonOperationGroups}/>
                </span>
                )
            }}
          />
        </Table>
      </div>
    )
  }
}

export default DisplayPageAll

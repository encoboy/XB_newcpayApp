import React, { Component } from 'react';
import { Table ,Radio,Pagination,Feedback,Button,moment} from '@icedesign/base';
import AddPageOperation from './../PageOperation/AddPageOperation';
import EditPageOperation from './../PageOperation/EditPageOperation';
import DelPageOperationGroups from './../PageOperation/DelPageOperationGroups/index';
const { Group: RadioGroup } = Radio;
const Toast = Feedback.toast;
 class DisplayPageAll extends Component{
  state = {

  };
  componentDidMount(){
 
  }
 
  render(){
    const {pageoperategroups,getPageOprationGrops,pageoperate} = this.props;
    return(
      <div>
        <div style={{margin:'10px 0 20px 0'}}>
          <AddPageOperation 
            pageoperate={pageoperate}
            getPageOprationGrops={getPageOprationGrops}/>
        </div>
        <Table dataSource={pageoperategroups} hasBorder={false} align="center">
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
              let pageOperationArr = text.split('|');
              const maxLength = 5;
              let fiveOperationArr = [];
              pageOperationArr.map(function (childItem,childIndex){
                if(pageOperationArr.length>maxLength&&childIndex<maxLength){
                  fiveOperationArr.push(childItem);
                  if(childIndex==4){
                    fiveOperationArr.push('.......')
                  }
                }

              });
              const fiveChildren = (
                fiveOperationArr.map(function(fiveItem,fiveIndex){
                  return(
                    <span style={{marginRight:'5px'}} key={fiveIndex}>{_intl.get(`sider.${fiveItem}`)?_intl.get(`sider.${fiveItem}`):fiveItem}</span>
                  )
                })
              )
              const children = (
                <div>
                  { pageOperationArr.map(function (childItem,childIndex){
                    if(pageOperationArr.length<=maxLength){
                      return(
                        <span style={{marginRight:'5px'}} key={childIndex}>{_intl.get(`sider.${childItem}`)}</span>
                      )
                    }
                  })}
                </div>
              )

                return(<span>{pageOperationArr.length>maxLength?fiveChildren:children}</span>)
              }
            }
          />

          <Table.Column
            key='action'
            dataIndex='action'
            width={20}
            title={_intl.get('public.action')}
            cell={(text,index,record)=>{
              console.log(record)
              let pageOperation = record.operations.split('|');
              let pageName = record.name;
              return(
                <span>
                  <EditPageOperation 
                    id={record.id} 
                    getPageOprationGrops={getPageOprationGrops} 
                    pageOperation={pageOperation} 
                    pageName={pageName}
                    pageoperate={pageoperate}
                    />
                  &nbsp;&nbsp;&nbsp;
                  <DelPageOperationGroups id={record.id} getPageOprationGrops={getPageOprationGrops}/>
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

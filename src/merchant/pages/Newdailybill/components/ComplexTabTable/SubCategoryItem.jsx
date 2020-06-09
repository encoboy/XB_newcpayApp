/* eslint no-unused-expressions: 0 */
import React from 'react';

const categoryStyle = {
  display: 'inline-block',
  marginRight: '12px',
  padding: '0 20px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  borderRadius: '100px',
  cursor: 'pointer',
  fontSize: '12px',
  marginTop: '12px',
};

export default class SubCategoryItem extends React.Component{
  state = {
    current:'normal',
  };
  handleChange = (current) => {
    this.props.onChange(current)
  };
  render(){
    const {type} = this.props;
    return(
      <div>
         <span
           style={{
             ...categoryStyle,
             color: type==='normal' ? '#fff' : '#666',
             backgroundColor: type==='normal' ? '#3080FE' : '#f5f5f5',
           }}
           onClick={()=>this.handleChange('normal')}
         >
           {_intl.get('order.normal')}
        </span>
        <span
          style={{
            ...categoryStyle,
            color: type==='normal' ?   '#666':'#fff',
            backgroundColor: type==='normal' ? '#f5f5f5':'#3080FE' ,
          }}
          onClick={()=>this.handleChange('advanced')}
        >
           {_intl.get('order.advanced')}
        </span>
      </div>
    )
  }
}

// export default (props) => {
//   return (
//     <span
//       style={{
//         ...categoryStyle,
//         color: props.isCurrent ? '#fff' : '#666',
//         backgroundColor: props.isCurrent ? '#3080FE' : '#f5f5f5',
//       }}
//       onClick={() => {
//         props.onItemClick && props.onItemClick(props.id);
//       }}
//     >
//       {props.text}
//     </span>
//   );
// };

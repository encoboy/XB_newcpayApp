import React, { Component } from 'react';
import './Details.scss'

class Details extends Component{
    render(){
        const data = this.props.dataSource;
        const children = this.props.children;
        return(
            <div id='details'>
                <table className='info-table'>
                    <tbody>
                    {
                        React.Children.map(children, child => {
                            return React.cloneElement(child, {
                                data:data
                            })
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

class Item extends Component{
    render(){
        const {data,title,render,dataIndex} = this.props;
        return(
            <tr >
                <th>{title}</th>
                {
                    render&&
                    <td>{render(String(data[dataIndex])?data[dataIndex]:'',data)}</td>
                }
                {
                    !render&&
                    <td>{String(data[dataIndex])?data[dataIndex]:''}</td>
                }
            </tr>
        )

    }
}

Details.Item = Item;

export default Details

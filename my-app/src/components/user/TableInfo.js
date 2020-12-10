import React, { Component } from 'react';

class TableInfo extends Component {
    render() {
        return (
            <table className="table" style={{marginTop: '20px'}}>
                <tbody>
                    <tr>        
                    <td><strong>User Name</strong></td>
                    <td className="text-primary">{this.props.name}</td>
                    </tr>
                    <tr>        
                    <td><strong>Birthday</strong></td>
                    <td className="text-primary">{this.props.birthday}</td>
                    </tr>
                    <tr>        
                    <td><strong>Email</strong></td>
                    <td className="text-primary">{this.props.mail}</td>
                    </tr>
                    <tr>        
                    <td><strong>Phone</strong></td>
                    <td className="text-primary">{this.props.phone}</td>
                    </tr>
                    <tr>        
                    <td><strong>Address</strong></td>
                    <td className="text-primary">{this.props.address}</td>
                    </tr>
                    <tr>        
                    <td><strong>Github</strong></td>
                    <td className="text-primary">
                        <a href={this.props.github} target="_blank" rel="noreferrer">{this.props.github}</a>
                    </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default TableInfo;
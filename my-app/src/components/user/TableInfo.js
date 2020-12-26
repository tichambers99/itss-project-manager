import React, { Component } from 'react';

class TableInfo extends Component {
    
    render() {
        const { username, date, email, phone, address, github } = this.props.user;
        
        return (
            <table className="table" style={{marginTop: '20px'}}>
                <tbody>
                    <tr>        
                    <td><strong>User Name</strong></td>
                    <td className="text-primary">{username}</td>
                    </tr>
                    <tr>        
                    <td><strong>Birthday</strong></td>
                    <td className="text-primary">{date && date.slice(0,10)}</td>
                    </tr>
                    <tr>        
                    <td><strong>Email</strong></td>
                    <td className="text-primary">{email}</td>
                    </tr>
                    <tr>        
                    <td><strong>Phone</strong></td>
                    <td className="text-primary">{phone}</td>
                    </tr>
                    <tr>        
                    <td><strong>Address</strong></td>
                    <td className="text-primary">{address}</td>
                    </tr>
                    <tr>        
                    <td><strong>Github</strong></td>
                    <td className="text-primary">
                        <a href={github} target="_blank" rel="noreferrer">{github}</a>
                    </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default TableInfo;
import React from 'react'

import { Link } from 'react-router-dom'

import { isAuthenticated } from './../auth/helpers'

function Dashboard() {

    const {user: {name, email, role, phone, address}} = isAuthenticated()
    
    const admininfo = () => {
        return (
         <div className="card">
            <h5 className="card-header">User Information</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{address}</li>
                <li className="list-group-item">{phone}</li>
                <li className="list-group-item">{role ? 'Admin': 'User'}</li>
            </ul>
          </div>
        )
    }

    const adminLinks = () => {
        return (
            <div className="card">
            <h5 className="card-header">User Links</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/product/create">Create Product</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/category/create">Create Category</Link>
                </li>
            </ul>
            </div>
        )
    }
    return (
        <div className="container my-5">
            <div className="row" style={{height: '100%'}}>
                <div className="col-12 col-md-12 col-lg-4">
                    {adminLinks()}
                </div>
                <div className="col-12 col-md-12 col-lg-8">
                    {admininfo()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard

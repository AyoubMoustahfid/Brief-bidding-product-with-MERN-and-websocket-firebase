import React, {useState} from 'react'

import {API_URL} from './../config'

import toastr from 'toastr';
import "toastr/build/toastr.css";

function Signup(props) {

    const [user, setUser] = useState({
        fullname: '',
        email: '',
        address: '',
        phone: ''
    })

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const submitSignup = e => {
        e.preventDefault();

        fetch(`${API_URL}/auth/singup`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }) .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success('User is created SuccessFully', 'New Accout', {
                    positionClass: "toast-bottom-left",
                })

                props.history.push('/signin')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignup}> 
            <div className="form-group">
                <label htmlFor="fullname" className="text-muted">Full Name</label>
                <input onChange={handleChange} type="text" className="form-control" id="fullname" />
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="text-muted">Phone</label>
                <input onChange={handleChange} type="text" className="form-control" id="phone" />
            </div>

            <div className="form-group">
                <label htmlFor="address" className="text-muted">Address</label>
                <input onChange={handleChange} type="text" className="form-control" id="address" />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="text-muted">email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
                </div>
                

            <div className="form-group">
                <label htmlFor="password" className="text-muted">password</label>
                <input onChange={handleChange} type="password" className="form-control" id="password"/>
            </div>

            <div className="d-grid my-3">
            <button className="btn btn-success">Sign Up</button>
            </div>

        </form>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto">
                    {form()}
                </div>
            </div>
        </div>
    )
}

export default Signup

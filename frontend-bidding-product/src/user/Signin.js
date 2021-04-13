import React, {useState} from 'react'

import toastr from 'toastr';
import "toastr/build/toastr.css";

import { API_URL } from './../config'

function Signin(props) {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const submitSignin  = (e) => {
        e.preventDefault();

        fetch(`${API_URL}/auth/singin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.info('User is authenticated SuccessFully', 'Welcome', {
                    positionClass: "toast-bottom-left",
                })

                localStorage.setItem('jwt_info', JSON.stringify(res))

                props.history.push('/')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignin}> 
           
            <div className="form-group">
                <label htmlFor="email" className="text-muted">email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>


            <div className="form-group">
                <label htmlFor="password" className="text-muted">password</label>
                <input onChange={handleChange} type="password" className="form-control" id="password"/>
            </div>

            <div className="d-grid my-3">
            <button className="btn btn-primary">Sign In</button>
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

export default Signin

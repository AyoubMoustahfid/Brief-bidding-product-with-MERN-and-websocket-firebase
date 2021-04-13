import React, {useState} from 'react'

import { isAuthenticated } from './../auth/helpers'

import {API_URL} from './../config'

import toastr from 'toastr';
import "toastr/build/toastr.css";


function AddCategory() {
    
    const [name, setName] = useState('');

    const handleChange = e => {
        setName(e.target.value);
    }

    const submitCategory = e => {
        e.preventDefault();

        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/profile/category/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name})
        }).then(res => res.json()) 
          .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success(`Category ${name} created`, 'new Category', {
                    positionClass: "toast-bottom-left",
                })

                setName("")

            }

          }).catch(err =>  toastr.error(err, 'Server error !', {
            positionClass: "toast-bottom-left",
        }))
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto">
                    <form onSubmit={submitCategory}>
                        <div className="form-group">
                            <label htmlFor="" className="text-muted"></label>
                            <input value={name} required autoFocus placeholder="Add name of Category" onChange={handleChange} type="text" className="form-control"/>
                        </div>

                        <div className="d-grid my-3">
                            <button className="btn btn-primary">Create Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategory

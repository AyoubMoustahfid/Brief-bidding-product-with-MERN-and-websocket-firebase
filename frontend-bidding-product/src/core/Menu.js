import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {isAuthenticated} from './../auth/helpers'

import toastr from 'toastr';
import "toastr/build/toastr.css";

import {API_URL} from './../config'

function Menu(props) {



    const signout = () => {

        fetch(`${API_URL}/auth/signout`)
          .then(() => {

            toastr.info('User SignOut', 'Next Time', {
                positionclassName: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/signin')

          })
          .catch()

    }

    return (
        <div> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        
        <Link className="navbar-brand" to="/" style={{cursor: 'pointer'}}>
            <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24"/>
        </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" style={{cursor: 'pointer'}}>Profile</a>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{cursor: 'pointer'}}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`${isAuthenticated() && isAuthenticated().user.role === 'ADMIN' ? '/admin' : ''}/dashboard`} style={{cursor: 'pointer'}}>Dashboard</Link>
              </li>
            </ul>

           <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {!isAuthenticated() && (
                  <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/signup" style={{cursor: 'pointer'}}>Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/signin" style={{cursor: 'pointer'}}>Signin</Link>
                    </li>
                  </Fragment>
           
              )}
              {isAuthenticated() && (
                  <Fragment>
                  <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" onClick={signout} style={{cursor: 'pointer'}}>Signout</Link>
                  </li>
                  </Fragment>
              )}

            </ul>
           </div>
           
        </div>
        </div>
      </nav>
        </div>
    )
}

export default Menu

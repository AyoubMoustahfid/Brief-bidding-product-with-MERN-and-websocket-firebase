import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'

import AddProduct from './admin/AddProduct'
import AddCategory from './admin/AddCategory'

import Menu from './core/Menu'
import Home from './core/Home'

import Signup  from './user/Signup'
import Signin from './user/Signin'
import Dashboard from './user/Dashboard'


function Routers() {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <PrivateRoute path="/" exact component={Home}/>
                
                <Route path="/signup" exact component={Signup}/>
                <Route  path="/signin" exact component={Signin}/>
                <AdminRoute  path="/admin/dashboard" exact component={Dashboard}/>
                <AdminRoute  path="/admin/product/create" exact component={AddProduct}/>
                <AdminRoute  path="/admin/category/create" exact component={AddCategory}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers

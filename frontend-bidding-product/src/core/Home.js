import React,{ useState, useEffect} from 'react'

import {isAuthenticated} from './../auth/helpers'
import {API_URL} from './../config'

import axios from 'axios'

import toastr from 'toastr';
import "toastr/build/toastr.css";

import ChatApp from './ChatApp'


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';





const auth = firebase.auth();


function Home() {

    const {user, token} = isAuthenticated();
    const [item , setItem] = useState()


   


useEffect(async () => {
    await axios.get(`${API_URL}/`)
    .then(res => {
        console.log(res.data)
        setItem(res.data)
        localStorage.setItem('item', JSON.stringify(res.data))
    })
    
},[])

const itemStorage = localStorage.getItem('item')
const itemParse = JSON.parse(itemStorage)


const [bid, setBid] = useState({
    user_id: user._id, 
    item_id: itemParse.currentItem[0]._id,
    price: 0
})

const handleChange = e => {
    setBid({...bid, [e.target.id]: e.target.value})
}

const submitBid = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/profile/createBid/${user._id}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bid)
    }).then(res => res.json())
      .then(res => {
          if (res.error){
            toastr.warning(res.error, 'Please Check form !', {
                positionClass: "toast-bottom-left",
            })
          }else{
            toastr.success(`Bid created`, 'new Product', {
                positionClass: "toast-bottom-left",
            })

            const itemStorage = localStorage.getItem('item')
            const itemParse = JSON.parse(itemStorage)
            setBid({
                user_id: user._id, 
                item_id: itemParse.currentItem[0]._id,
                price: 0 
            })
          }
      }).catch(err =>  toastr.error(err, 'Server error !', {
        positionClass: "toast-bottom-left",
      }))
}


const listProduct = () => (
<ul className="list-group">
    <li className="list-group-item">
        <div className="row">
            <div className="col-4">
                <strong>Product :</strong>
            </div>
            <div className="col-8">
                {itemParse.currentItem[0].name}
            </div>
        </div>
    </li>
    <li className="list-group-item">
        <div className="row">
            <div className="col-4">
                <strong>Detail :</strong>
            </div>
            <div className="col-8">
                {itemParse.currentItem[0].detail}
            </div>
        </div>

    </li>
    <li className="list-group-item">
        <div className="row">
            <div className="col-4">
                <strong>Price :</strong>
            </div>
            <div className="col-8">
                {itemParse.currentItem[0].price} DH
            </div>
        </div>
    </li>
    <li className="list-group-item">
        <div className="row">
            <div className="col-4">
                <strong>Price :</strong>
            </div>
            <div className="col-8">
                {itemParse.owner[0].phone}
            </div>
        </div>
    </li>
    <li className="list-group-item">
    <div className="row">
        <div className="col-4">
            <strong>Category :</strong>
        </div>
        <div className="col-8">
            {itemParse.category[0].name}
        </div>
    </div>
</li>
</ul>
)


const form = () => (
    <form onSubmit={submitBid}>

    <div className="mb-3">
      <label htmlFor="" className="form-label">Add a bid :</label>
<input type="number" className="form-control" onChange={handleChange} id="price" aria-describedby="emailHelp" name="price" min={itemParse.currentItem[0].price + 1} />
    </div>

    <div className="mb-3">
        <input type="hidden" className="form-control" onChange={handleChange} id="user_id" aria-describedby="emailHelp" name="user_id"/>
    </div>

    <div className="mb-3">
        <input type="hidden" className="form-control" onChange={handleChange} id="item_id" aria-describedby="emailHelp" name="item_id"/>
    </div>
    <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit</button>
    </div>
    </form>
)


return (
<div className="container">

  <div className="row align-items-center">
      <div className="col-6">
      {itemParse.noItem ? (
        <h1>Product not found</h1>
        ): (
        <div className="row">
            <div className="col-12">
                <img src={`${API_URL}/profile/photo/${itemParse.currentItem[0]._id}`} width="300px" height="300px" style={{borderRadius: "50%"}} className="my-3" />
            </div>
            <div className="row">
                <div className="col-12">
                    {listProduct()}
                </div>
    
                <div className="col-6 mx-auto my-3">
                    {form()}
                </div>
            </div>
        </div>
        )}

      </div>
      <div className="col-6">
      <div className="row">
      <div class="card">
          <div class="card-body">
              <ChatApp/>
          </div>
      </div>
  </div>
      </div>
  </div>

</div>
)
}

export default Home
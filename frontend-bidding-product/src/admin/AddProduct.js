import React, {useState, useEffect} from 'react'

import {API_URL} from './../config'
import {isAuthenticated} from './../auth/helpers'

import toastr from 'toastr';
import "toastr/build/toastr.css";

function AddProduct(props) {

    const {user ,token} = isAuthenticated();

    const [product, setProduct] = useState({
         user_id: user._id, 
         name: '',
         category_id: 0,
         images: '',
         detail: '',
         price: 0
    })

    const [formData, setFormData] = useState(new FormData());
    const [categories, setCategories] = useState([])
    
    useEffect(() => getCategories(), [])


    const getCategories = () => {
        fetch(`${API_URL}/profile/category/${user._id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ContentType: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
          .then(res => {
              console.log(res);
              setCategories(res.categories)
          })
          .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        const value = e.target.id === 'images' ? e.target.files[0] : e.target.value;
        formData.set(e.target.id, value);
        setProduct({...product, [e.target.id]: value})
    }

    const submitProduct = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/profile/createItem/${user._id}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
            'Authorization' : `Bearer ${token}`
            },
            body: formData
        }).then(res => res.json())
          .then(res => {
              if(res.error){
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
              }else{
                toastr.success(`Product ${product.name} created`, 'new Product', {
                    positionClass: "toast-bottom-left",
                })

                setProduct({
                    user_id: user._id, 
                    name: '',
                    category_id: 0,
                    images: '',
                    detail: '',
                    price: 0
                })

                setFormData(new FormData())

                props.history.push('/')
              }
          }).catch(err => toastr.error(err, 'Server error !', {
            positionClass: "toast-bottom-left",
          }))

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto">
                     <form onSubmit={submitProduct}>
                         <div className="form-group">
                            <label htmlForm="images">Images</label>
                            <input onChange={handleChange} id="images" type="file" className="form-control" name="images"/>
                         </div>          
                         
                        <div className="form-group">
                            <label htmlForm="name">Name :</label>
                            <input onChange={handleChange} id="name" type="text" className="form-control" name="name"/>
                        </div>

                        <div className="form-group">
                            <label htmlForm="price">Price :</label>
                            <input onChange={handleChange} id="price" type="text" className="form-control" name="price"/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="category_id">category</label>
                            <select value={product.category_id} onChange={handleChange} name="category_id" id="category_id" className="form-control">
                                <option value="0">Select a category</option>
                                { categories && categories.map((category, i) => (
                                    <option key={i} value={category._id}>{category.name}</option>
                                )) }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlForm="detail">Detail Product :</label>
                            <textarea onChange={handleChange} id="detail" type="text" className="form-control" name="detail" rows="5"></textarea>
                        </div>

                        <div className="d-grid my-3">
                            <button className="btn btn-primary"> Create Product</button>
                        </div>
                     </form>
                     {JSON.stringify(product)}
                </div>
            </div>
        </div>
    )
}

export default AddProduct

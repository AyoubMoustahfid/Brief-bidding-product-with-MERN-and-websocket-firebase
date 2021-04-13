const bcrypt = require('bcryptjs');
const mv = require('mv');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Category = require('../models/categoryModel');
const Bid = require('../models/bidModel');





exports.getHome = (req, res) => {
    (async () => {
        try{
            let loggedInUser = await req.params.userId;
            console.log(loggedInUser);
            let items = await Item.find({user_id: loggedInUser}).sort({_id: - 1}).select('-images');
            res.json({
                items
            })
        }catch(err){
            console.log(err);
        }
    })();
}

exports.addCategory = (req, res) => {
   const category = new Category(req.body);
   
   category.save((err, category) => {
       if(err){
           return res.status(404).json({
               error: 'bad request !!'
           })
       }

       res.json({
           category
       })
   })
}

exports.getAllCategory = (req, res) => {
    
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            categories
        })
    })
}


exports.addItem = (req, res) => {
    (async () => {
        try{
            let loggedInUser = await req.params.userId;
            const form = formidable({ multiples: true });

            form.parse(req, (err, fields, files) => {
                if(err){
                    return res.status(400).json({
                        error: "Image could nor update"
                    })
                }
              
           
                (async ()=>{
                    if(fields.start_bid_date == '1m'){
                        fields.start_bid_date = new Date().getTime() + 60000;
                    }
                    else if(fields.start_bid_date == '1h'){
                        fields.start_bid_date = new Date().getTime() + 3600000;
                    }
                    else if(fields.start_bid_date == '1d'){
                        fields.start_bid_date = new Date().getTime() + 86400000;
                    }
                    const item = await new Item({user_id: loggedInUser,
                        name: fields.name,
                        detail: fields.detail, 
                        price: fields.price, 
                        images: fields.images, 
                        category_id: fields.category_id,
                        start_bid_date: fields.start_bid_date})

                        item.save((err, item) => {
                            return res.status(404).json({
                                item
                            })
                    })
                                

                                if(files.images){

                                    if(files.images.size > Math.pow(10, 6)){
                                        return res.status(400).json({
                                            error: "Image should be less than 1Mo in size !"
                                        })
                                    }

                                      item.images.data = fs.readFileSync(files.images.path)
                                      item.images.contentType = files.images.type
                                  }
                    
                })();            
              });
                

        }catch(err){
            console.log(err);
        }
    })();
}


// get photo from data base
exports.photoProduct = (req, res) => {
    const {contentType, data} = req.item.images

    if(data) {
        res.set("Content-Type" , contentType)
        
        return res.send(data)
    }
}

exports.itemById = (req, res, next, id) => {
    Item.findById(id)
    .exec((err, item) => {
        if(err || !item){
            return res.status(400).json({
                error: "Item not found"
            })
        }

        req.item = item
        next()
    })
}


exports.getShowById = (req, res) => {

    (async () => {
         
        try {
            let param = req.params.userId;
            let item = await Item.find({user_id: param})

            if(item.length > 0){
                let bid = await Bid.find().sort({item_id: 1}).limit(1);
                console.log(bid[0].user_id);

                if(bid.length > 0){
                    let user = await User.find({_id: bid[0].user_id});
                    console.log(user);
                    if(user.length > 0){
                        let showBid = true;
                    

                        res.json({
                            user, item, bid, showBid
                        })
                    }else{
                        return res.status(404).json({
                            error: 'User not found !!'
                        })
                    }
                }else{
                    return res.status(404).json({
                        error: 'bid not found !!'
                    })
                }
                
            }else{
                return res.status(404).json({
                    error: 'item not found !!'
                })
            }


        }catch(err){
            console.log(err);
        }
    })();
}


exports.createBid = (req, res) => {

    const bid = new Bid(req.body)

    bid.save((err, bid) => {
        if(err || !bid){
            return res.status(404).json({
                error: "big not found !!!"
            })
        } 

        res.json({
            bid
        })
    })
}

exports.categoryId = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {

        if(err || !category) {
            return res.status(404).json({
                error: "Category not found !"
            })
        }

        req.category = category;
        next()
    })

}


exports.showCategory = (req, res) => {

    let category = req.category;

    res.json({
        category
    })
}

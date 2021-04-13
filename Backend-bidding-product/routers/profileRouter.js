const express = require('express');

const {getHome, getAllCategory, addCategory, addItem, getShowById, createBid, categoryId, showCategory, photoProduct, itemById} = require('../controllers/profileController');
const {requireSignIn, isAuth, isAdmin} = require('../middlewares/auth')
const {userById} = require('../middlewares/user')

const router = express.Router();

// All routes related category
router.post('/category/create/:userId', [requireSignIn, isAuth, isAdmin], addCategory)
router.get('/category/:userId', [requireSignIn, isAuth, isAdmin], getAllCategory);

router.get('/home/:userId', getHome);
router.get('/photo/:itemId', photoProduct)
router.get('/showCategory/:categoryId', showCategory);

router.post('/createItem/:userId', [requireSignIn, isAuth, isAdmin], addItem)
router.post('/createBid/:userId', [requireSignIn, isAuth, isAdmin], createBid)
router.get('/showById/:userId', [requireSignIn, isAuth, isAdmin], getShowById)


router.param('userId', userById)
router.param('categoryId', categoryId)
router.param('itemId', itemById)

module.exports = router;
const Product = require('../model/product');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', path: '/admin/add-product', editing : false,isAuthenticated: req.session.isLoggedIn});
};

exports.postAddProduct = (req,res,next) => {
    const product = new Product({
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description,
            price: req.body.price,
            userId: req.user
        }
    );
    product.save().
    then((succ) => {
        res.redirect('/')
        console.log(succ);
    }).
    catch(err => {console.log(err)});
};

exports.getProducts = (req,res,next) => {
    // Product.fetchAll(products => {
    //     res.render('admin/products', {prods : products, pageTitle: "Admin Products", path: '/admin/products'});
    // });
    Product.find({userId : req.user._id})
    //.select('name title')
    //.populate('userId', 'name -_id')
    .then((products) => {
        res.render('admin/products', {prods : products, pageTitle: "Admin Products", path: '/admin/products',isAuthenticated: req.session.isLoggedIn});
    })
};

exports.getEditProduct = (req,res,next) => {
    Product.findById(req.params.productId).then((product) => {
        if(product.userId.toString() !== req.user._id.toString()){
            return res.redirect('/admin/products');
        }
        if(product){
            res.render('admin/edit-product', {pageTitle: 'Edit Product', path: '/admin/edit-product', editing: true, product:product,isAuthenticated: req.session.isLoggedIn});
        }else{
            res.redirect('/');
        }
    }).catch(err => {console.log(err);})
};

exports.postEditProduct = (req,res,next) => {
    //const product = new Product(, req.body.imageURL, req.body.description, req.body.price, req.body.id);
    Product.findById(req.body.id).then((product) => {
        product.title = req.body.title;
        product.description = req.body.description;
        product.imageURL = req.body.imageURL;
        product.price = req.body.price;
        product.save();
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {console.log(err);})
}

exports.postDeleteProduct = (req,res,next) => {
    const id = req.body.id;
    Product.findByIdAndRemove(id).then(() => {
        console.log("Product deleted");
        res.redirect('/products');
    }).catch((err) => {console.log(err)});
}
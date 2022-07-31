const Cart = require('../model/cart');
const Order = require('../model/order');
const Product = require('../model/product');
const user = require('../model/user');

exports.getProducts = (req,res,next) => {
    // Product.fetchAll(products => {
    //     res.render('shop/product-list', {prods : products, pageTitle: "My Shop", path: '/products'});
    // });
    // Product.fetchAll()
    // .then(([idx0, idx1]) => {
    //     res.render('shop/product-list', {prods : idx0, pageTitle: "My Shop", path: '/products'});
    // })
    // .catch(err => {console.log(err)});
    // Product.fetchAll().then((products) => {
    //     res.render('shop/product-list', {prods : products, pageTitle: "My Shop", path: '/products'});
    // }).catch((err) => {console.log(err);})
    Product.find().then(products => {
        res.render('shop/product-list', {prods : products, pageTitle: "My Shop", path: '/products',isAuthenticated: req.session.isLoggedIn});
    }).catch(err => {console.log(err);})
};

// exports.getProducts = (req,res,next) => {
//     console.log("HIT");
//     Product.find().then(products => {
//         //return products;
//         //res.json(products);//.redirect('/lolololl');
//         return res.redirect('/lolololol');
//     })
// }

exports.getProduct = (req,res,next) => {
    const productId = req.params.productId;
    // Product.findById(productId,(product) => {
    //     if(product){
    //         res.render('shop/product-detail', {product:product, path:'/products', pageTitle:product.title});
    //     }else{
    //         res.redirect('/404');
    //     }
    // })
    // Product.findById(productId)
    // .then(([idx0, idx1]) => {
    //     console.log(idx0.length);
    //     if(idx0.length){
    //         res.render('shop/product-detail', {product:idx0[0], path:'/products', pageTitle:idx0.title});
    //     }
    //     else{
    //         res.redirect('/404');
    //     }
    // });
    //console.log(productId);
    Product.findById(productId).then(product => {
        res.render('shop/product-detail', {product:product, path:'/products', pageTitle:product.title,isAuthenticated: req.session.isLoggedIn});
    })
}

exports.getIndex = (req,res,next) => {
    // Product.fetchAll(products => {
    //     res.render('shop/index', {prods : products, pageTitle: "My Shop", path: '/'});
    // });
    // Product.fetchAll()
    // .then(([idx0, idx1]) => {
    //     res.render('shop/product-list', {prods : idx0, pageTitle: "My Shop", path: '/'});
    // })
    // .catch(err => {console.log(err)});
    Product.find().then((products) => {
        res.render('shop/index', {prods : products, pageTitle: "My Shop", path: '/',isAuthenticated: req.session.isLoggedIn});
    }).catch((err) => {console.log(err);})
};

exports.getCart = (req,res,next) => {

    const lol = async () => {
        return await req.user.populate('cart.items.productId');
    }

    lol().then(user => {
        const products = user.cart.items;
        console.log(products);
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          isAuthenticated: req.session.isLoggedIn
        });
    })

    // req.user
    // .populate('cart.items.productId')
    // .execPopulate()
    // .then(user => {
    // })
    // .catch(err => console.log(err));

    // req.user.getCart().then(cartProducts => {
    //     res.render('shop/cart', {pageTitle: "Cart", path: '/cart', products: cartProducts});
    // })
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for(prod of products){
    //             const f = cart.products.find(pro => pro.id === prod.id);
    //             if(f){
    //                 cartProducts.push({productData : prod, qty : f.qty});
    //             }
    //         }
    //         res.render('shop/cart', {pageTitle: "Cart", path: '/cart', products: cartProducts});
    //     })
    // })
};

exports.postCart = (req,res,next) => {
    const id = req.body.productId;
    req.user.addToCart(id).then(result => {console.log(result);res.redirect('/cart');}).catch(e => {console.log(e);})
}

exports.getOrders = (req,res,next) => {
    // req.user.getOrders().then(orders => {
    //     res.render('shop/orders', {pageTitle: "Orders", path:'/orders', orders:orders});
    // })
    Order.find({"user.userId" : req.user._id}).then(orders => {
        res.render('shop/orders', {pageTitle: "Orders", path:'/orders', orders:orders,isAuthenticated: req.session.isLoggedIn});
    })
};
exports.getCheckout = (req,res,next) => {
    //Product.fetchAll(products => {
        res.render('shop/checkout', {pageTitle: "Checkout", path: '/checkout',isAuthenticated: req.session.isLoggedIn});
    //});
};

exports.postDeleteCart = (req,res,next) => {
    const id = req.body.productId;
    req.user.deleteFromCart(id).then(() => {res.redirect('/cart');}).catch(err => {console.log(err);})
}

exports.postOrder = (req,res,next) => {
    // req.user.addOrder().then(() => {res.redirect('/products')}).catch(err => {console.log(err);})

    const lol = async () => {
        return await req.user.populate('cart.items.productId');
    }

    lol().then(user => {
        console.log(user);
        const realProducts = user.cart.items.map(p => {
            return{product: {...p.productId._doc}, quantity: p.quantity}
        })
        const order = new Order({
            products: realProducts,
            user:{
                email:req.user.email,
                userId: req.user._id
            }
        });
        order.save();
        req.user.clearCart();
        res.redirect('/orders');
        // req.user.cart = {items : []};
        // req.user.save();
    }).catch(err => {console.log(err);})


}
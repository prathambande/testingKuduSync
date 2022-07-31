const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    cart:{
        items: [ 
            {
                productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }
})

userSchema.methods.addToCart = function(id){
    const cartProductIndex = this.cart.items.findIndex(cp => {return cp.productId.toString() === id;});
    if(cartProductIndex >= 0){
        this.cart.items[cartProductIndex].quantity++;
    }else{
        this.cart.items.push({productId: id, quantity: 1});
    }
    return this.save();
}

userSchema.methods.deleteFromCart = function(id){
    const updatedCartItems = this.cart.items.filter(p => {
        if(p.productId.toString() !== id){
            return true;
        }else if(p.quantity !== 1){
            return true;
        }
    }).map(p => {
            if(p.productId.toString() !== id){
                return p;
            }else{
                return {...p, quantity:p.quantity-1};
            }
    })
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items : []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// module.exports = class User {
//     constructor(username, email, cart, id){
//         this.name = username;
//         this.email = email;
//         this.cart = cart ? cart : { items: []};
//         this._id = id;
//     }

//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }
    
//     static findById(id){
//         const db = getDb();
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(id)});
//     }

//     addToCart(id){
//         const db = getDb();
//         const cartProductIndex = this.cart.items.findIndex(cp => {return cp.productId.toString() === id;});
//         if(cartProductIndex >= 0){
//             this.cart.items[cartProductIndex].quantity++;
//         }else{
//             this.cart.items.push({productId: new mongodb.ObjectId(id), quantity: 1});
//         }
//         return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart : this.cart}})
//     }

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map(p => {return p.productId});
        
//         return db.collection('products').find({_id: {$in : productIds}}).toArray()
//         .then(products => {
//             return products.map(p => {
//                 return{
//                     ...p,
//                     quantity: this.cart.items.find(ci => {return ci.productId.toString() === p._id.toString()}).quantity
//                 }
//             })
//         })
//     }
    
//     deleteFromCart(id){
//         const db = getDb();
//         // const updatedCartItems = this.cart.items.reduce(p => {
//         //     if(p.productId.toString() !== id){
//         //         return p;
//         //     }else{
//         //         if(p.quantity !== 1){
//         //             return {...p, quantity:p.quantity-1};
//         //         }
//         //     }
//         // })
//         const updatedCartItems = this.cart.items.filter(p => {
//             if(p.productId.toString() !== id){
//                 return true;
//             }else if(p.quantity !== 1){
//                 return true;
//             }
//         }).map(p => {
//             if(p.productId.toString() !== id){
//                 return p;
//             }else{
//                 return {...p, quantity:p.quantity-1};
//             }
//         })
//         return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart : {items : updatedCartItems }}})
//     }

//     addOrder(){
//         const db = getDb();
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.name
//                 }
//             };
//             return db.collection('orders').insertOne(order).then(result => {
//                 this.cart = { items : []};
//                 return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set : {cart : {items : []}}});
//             })
//         })

//     }

//     getOrders(){
//         const db = getDb();
//         return db.collection('orders').find({'user._id' : new mongodb.ObjectId(this._id)}).toArray();
//     }

// }
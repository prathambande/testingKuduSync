const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageURL:{
        type: String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Product', productSchema);


// //const fs = require('fs');
// //const path = require('path');
// //const rootDir = require('../util/path');
// const Cart = require('./cart');
// //const db = require('../util/db');
// // const p = path.join(rootDir,'data','products.json');


// // const getProductsFromFile = (cb) => {
// //     fs.readFile(p, (err, fileContent) => {
// //         if(err){
// //             cb([]);
// //         }
// //         else{
// //             cb(JSON.parse(fileContent));
// //         }
// //     })
// // }


// // save(){
//     //     getProductsFromFile((products) => {
//         //         if(this.id){
//     //             const existingProductId = products.findIndex(p => p.id === this.id);
//     //             products[existingProductId] = this;
//     //         }
//     //         else{
//         //             this.id = Math.random().toString();
//         //             products.push(this);
//         //         }  
//         //         fs.writeFile(p, JSON.stringify(products), (err) => {
//             //             console.log(err);
//             //         })
//             //     })
//             // }
            
//             // static delete(id, price){
//                 //     getProductsFromFile((products) => {
//                     //         Cart.deleteProduct(id,price);
//                     //         const updatedProducts = products.filter(p => p.id !== id);
//                     //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//                         //             console.log(err);
//                         //         })
//                         //     })
//                         // }
                        
//                         // static fetchAll(cb){
//                             //     getProductsFromFile(cb);
//                             // }
                            
//                             // static findById(id,cb){
//                                 //     getProductsFromFile((products) => {
//                                     //         const product = products.find(p => p.id === id);
//                                     //         cb(product);
//                                     //     })
//                                     // }
                                    
//                                     //MY SQL (not squirrel) AS DATABASE 
//                                     // static fetchAll(){
//                                         //     return db.execute('SELECT * FROM products');
//                                         // }
                                        
//                                         // save(){
//                                             //     return db.execute('INSERT INTO products(title,price,description,imageURL) VALUES (?,?,?,?)', [this.title, this.price,this.description,this.imageURL]);
//     // }
    
//     const mongodb = require('mongodb');
//     const getDb = require('../util/database').getDb;
//     module.exports = class Product{
//         constructor(title, imageURL, description, price, id, userId){
//             this.title = title;
//             this.imageURL = imageURL;
//             this.description = description;
//             this.price = price;
//             this._id = id ? new mongodb.ObjectId(id) : null;
//             this.userId = userId;
//         }
//     // static findById(id){
//         //     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);//.then((p) => {console.log(p[0]);}).catch((err) => {console.log(err)}); 
//         // }
        
//         save(){
//             const db = getDb();
//             let dbOp;
//             console.log("0OKKKK");
//             console.log(this._id);
//             if(this._id){
//                 //update
//                 dbOp = db.collection('products').updateOne({_id: this._id}, { $set : this});
//             }else{
//                 //create
//                 dbOp = db.collection('products').insertOne(this);
//             }
//             return dbOp.then(result => {console.log(result);}).catch(err => {console.log(err);})
//         }
        
//         // static fetchAll(){
//             //     const db = getDb();
//     //     return db.collection('products').find().toArray().then(products => {
//     //         console.log(products);
//     //         return products;
//     //     }).catch(err => {console.log(err);})
//     // }
//     static fetchAll() {
//         const db = getDb();
//         return db
//           .collection('products')
//           .find()
//           .toArray()
//           .then(products => {
//             //console.log(products);
//             return products;
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       }

//     static findById(id){
//         const db = getDb();
//         return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next().then((p)=>{return p;}).catch(e=>{console.log(e);})
//     }

//     static deleteById(id){
//         const db = getDb();
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)}).then().catch(err => {console.log(err)});
//     }

// }
const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir,'data','cart.json');


module.exports = class Cart{
    static addProduct(id,price){
        fs.readFile(p, (err, fileContent) => {
            let cart = { products : [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const existingProductId = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductId];
            if(existingProduct){
                let updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products[existingProductId] = updatedProduct;
            }else{
                let updatedProduct = {id : id, qty: 1};
                cart.products.push(updatedProduct);
            }
            cart.totalPrice += +price;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }


    static deleteProduct(id, price){
        fs.readFile(p, (err,fileContent) => {
            if(err){
                console.log(err);
                return;
            }
            fileContent = JSON.parse(fileContent);
            const product = fileContent.products.find(p => p.id === id);
            if(product){
                console.log('to delete fromn cart :');
                console.log(product);
                fileContent.totalPrice -= price * product.qty;
                fileContent.products = fileContent.products.filter(p => p.id !== id);
                fs.writeFile(p, JSON.stringify(fileContent), (err) => {
                    console.log(err);
                });
            }
        })
    }

    static getCart(cb){
        fs.readFile(p, (err,fileContent) => {
            if(!err){
                cb(JSON.parse(fileContent));
            }
            else{
                cb(null);
            }
        })
    }
}
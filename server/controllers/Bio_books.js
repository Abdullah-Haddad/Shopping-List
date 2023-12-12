var express = require('express');
var router = express.Router();
let Book = require('../models/Bio_books');

module.exports.DislayProductlist = async (req,res,next)=>{ //< Mark function as async
    try{
       const BookList = await Book.find(); //< Use of await keyword
        res.render('book/list', {
            title: 'Product List', 
            BookList: BookList,
            displayName: req.user ? req.user.displayName:''
        });
    }catch(err){
        console.error(err);
        //Handle error
        res.render('book/list', {
            error: 'Error on server'
        });
    }
};

module.exports.AddProduct = async (req,res,next)=>{
    try{
        res.render('book/add',
        {
            title:'Add Product',
            displayName: req.user ? req.user.displayName:'',
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessProduct = async (req,res,next)=>{
    try{
        let newBook = Book({
            "Name":req.body.Name,
            "Store": req.body.Store,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        Book.create(newBook).then(() =>{
            res.redirect('/shoppinglist')
        })
    }
    catch(error){
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditProduct = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const bookToEdit = await Book.findById(id);
    res.render('book/edit',
    {
        title:'Edit Product',
        displayName: req.user ? req.user.displayName:'',
        Book:bookToEdit
    })
}
catch(error){
    console.error(err);
    res.render('book/list',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditProduct = async (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedBook = Book({
            "_id":id,
            "Name":req.body.Name,
            "Store": req.body.Store,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/shoppinglist')
        });
    }
    catch(error){
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.DeleteProduct = async (req,res,next)=>{
    try{
        let id = req.params.id;
        Book.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/shoppinglist')
        })
    }
    catch(error){
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
}
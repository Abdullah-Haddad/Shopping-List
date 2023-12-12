var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');

// Connect with book model
let Controller = require('../controllers/Bio_books')
let mongoose = require('mongoose');

// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
        {
            return res.redirect('/login')
        }
    next();
}

        /* CRUD Operation*/
/* Get route for the Bio Books list */
// Read Operation
router.get('/', Controller.DislayProductlist);
/* Get route for Add Book page --> Create */
router.get('/add', requireAuth, Controller.AddProduct); 
/* Post route for Add Book page --> Create */
router.post('/add', requireAuth, Controller.ProcessProduct);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', requireAuth, Controller.EditProduct);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', requireAuth, Controller.ProcessEditProduct);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, Controller.DeleteProduct);

module.exports = router;
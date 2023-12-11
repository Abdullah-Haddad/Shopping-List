var express = require('express');
var router = express.Router();

// Connect with book model
let BookController = require('../controllers/Bio_books')
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
router.get('/', BookController.DislayBooklist);
/* Get route for Add Book page --> Create */
router.get('/add', requireAuth, BookController.AddBook); 
/* Post route for Add Book page --> Create */
router.post('/add', requireAuth, BookController.ProcessBook);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', requireAuth, BookController.EditBook);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', requireAuth, BookController.ProcessEditBook);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, BookController.DeleteBook);

module.exports = router;
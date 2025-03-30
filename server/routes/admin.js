const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


const adminLayout = '../views/layouts/admin'



/**
    *GET / 
    *ADMIN - LOGIN PAGE
*/
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: 'Admin',
            description: 'Admin page'
        }
        res.render('admin/index', { locals, layout: adminLayout });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
    *POST / 
    *ADMIN - CHECK LOGIN 
*/
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username and password are correct
        if (username === 'admin' && password === '1234') {
            res.redirect('/dashboard');
        } else {
            // Send the login page with an error message
            res.render('admin/index', { errorMessage: 'Invalid credentials, please try again.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});





/**
    *GET / 
    *ADMIN Dashboard
*/
router.get('/dashboard', async (req, res) => {

    try {
        const locals = {
            title: 'Dashboard',
            description: 'Welcome to our blog!'
        };

        const data = await Job.find();

        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});

/**
    *GET / 
    *ADMIN - Create Post
*/
router.get('/add-job', async (req, res) => {

    try {
        const locals = {
            title: 'Add Job',
            description: 'Welcome to our blog!'
        };

        const data = await Job.find();

        res.render('admin/add-job', {
            locals,
            layout: adminLayout
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});

/**
    *POST / 
    *ADMIN - Create Post
*/
router.post('/add-job', async (req, res) => {

    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });
            await Post.create(newPost);
            res.redirect('/dashboard');
        }
        catch (error) {
            return res.status(400).json({ message: "Invalid Data" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


/**
    *GET / 
    *ADMIN - Edit post
*/
router.get('/edit-job/:id', async (req, res) => {
    try {
        const locals = {
            title: 'Edit Post',
            description: 'Welcome to our blog!'
        };

        const data = await Job.findOne({ _id: req.params.id.trim() });

        res.render('admin/edit-job', {
            data,
            locals,
            layout: adminLayout
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


/**
    *PUT / 
    *ADMIN - Edit post
*/
router.put('/edit-job/:id', async (req, res) => {

    try {
        await Job.findByIdAndUpdate(req.params.id.trim(), {
            title: req.body.title,
            body: req.body.body
        });

        res.redirect(`/edit-job/${req.params.id.trim()}`);
    }
    catch (err) {
        console.error(err);
    }
});


/**
    *DELETE / 
    *ADMIN - Delete Post 
*/
router.delete('/delete-job/:id', async (req, res) => {

    try {
        await Job.deleteOne({ _id: req.params.id.trim() });
        res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
    }

});

/**
    *DELETE / 
    *ADMIN - Delete Post 
*/
router.get('/logout', (req, res) => {
    res.redirect('/');
});



module.exports = router;
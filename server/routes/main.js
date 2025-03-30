const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


//Route
/**
    *GET / 
    *HOME
*/
router.get('/', async (req, res) => {
    const locals = {
        title: 'JOBIFY',
        description: 'Welcome to our Website'
    }
    try {
        const data = await Job.find();
        res.render('index', { locals, data });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
    *GET / 
    *Post :id
*/
router.get('/job/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Job.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: 'Welcome user'
        }

        res.render('job', { locals, data });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


/**
    *POST / 
    *Post :id
*/
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: 'Search',
            description: 'Welcome user'
        }

        let searchTerm = req.body.searchTerm || '';
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Job.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
            ]
        });
        res.render("search", {
            data,
            locals
        });
    }
    catch (err) {
        console.error(err);
    }
});








/**
    *GET / 
    *About
*/
router.get('/about', async (req, res) => {
    const locals = {
        title: 'About',
        description: 'Welcome to our blog!'
    }
    res.render('about', { locals });
});
/**
    *GET / 
    *Contact
*/
router.get('/contact', async (req, res) => {
    const locals = {
        title: 'Contact US',
        description: 'Welcome to our blog!'
    }
    res.render('contact', { locals });
});

// function insertPostData() {
//     Job.insertMany([
//         {
//             title: "MERN Stack Developer",
//             company: "TechCorp",
//             body: "Develop and maintain web applications using MERN stack technologies.",
//             skill: "MongoDB, Express, React, Node.js",
//             salary: "80,000",
//             image: "../img/techcorp.png",
//             experience: "3 years",
//             about: "Develop and maintain dynamic web applications using the MERN stack (MongoDB, Express.js, React, and Node.js). Collaborate with cross-functional teams to ensure responsive designs and scalable backend systems.",
//             resp : "Build and optimize user-facing features using React, Develop server-side APIs and integrate databases with Node.js and Express, Ensure data consistency and efficient storage with MongoDB, Debug and resolve performance issues across the stack.",
//             location : "Remote",
//             why: "At TechCorp, we value innovation and collaboration. Work with a talented team, enjoy flexible hours, and grow in a supportive environment tailored for tech enthusiasts."
//         },
//         {
//             title: "Front-end Engineer",
//             company: "Designify",
//             body: "Focus on the React front-end for dynamic user interfaces.",
//             skill: "React, JavaScript, HTML, CSS",
//             salary: "75,000",
//             image: "../img/Designify.jpg",
//             experience: "Intern",
//             about: "Develop and maintain user-facing features using React. Focus on building dynamic, responsive interfaces for web applications.",
//             resp: "Work closely with design and back-end teams to implement and optimize UI components, ensure cross-browser compatibility, and enhance the user experience.",
//             location: "Remote",
//             why: "Designify offers a creative work environment with opportunities to grow as a front-end developer. Work with cutting-edge technologies and collaborate with top designers."
//         },
//         {
//             title: "Back-end Developer",
//             company: "ServerTech",
//             body: "Build scalable APIs and manage databases using Node.js and MongoDB.",
//             skill: "Node.js, MongoDB, Express",
//             salary: "85,000",
//             image: "../img/ServerTech.jpg",
//             experience: "1+ years",
//             about: "Design and implement scalable backend services and APIs using Node.js. Handle data storage, retrieval, and ensure performance optimization in MongoDB.",
//             resp: "Develop RESTful APIs, integrate with front-end frameworks, optimize database queries for performance, and maintain application security and scalability.",
//             location: "Onsite",
//             why: "At ServerTech, we value innovation and teamwork. Join a company that fosters personal growth, offers competitive pay, and embraces new technologies."
//         },        
//         // {
//         //     title: "Full-Stack Developer",
//         //     company: "CodeBase",
//         //     body: "Handle both front-end and back-end development with the MERN stack.",
//         //     skill: "MongoDB, Express, React, Node.js",
//         //     salary: "90,000",
//         //     image: "../img/CodeBase.jpg",
//         //     experience: "6 month"
//         // },
//         // {
//         //     title: "Junior React Developer",
//         //     company: "Reactify",
//         //     body: "Assist in creating React components and integrating APIs.",
//         //     skill: "React, JavaScript, REST APIs",
//         //     salary: "65,000",
//         //     image: "../img/Reactify.png",
//         //     experience: "Intern"
//         // },
//         // {
//         //     title: "Node.js Specialist",
//         //     company: "NodeExperts",
//         //     body: "Focus on developing server-side logic and database operations.",
//         //     skill: "Node.js, MongoDB, Express",
//         //     salary: "78,000",
//         //     image: "../img/NodeExperts.jpg",
//         //     experience: "3 years+"
//         // }
//     ]);
// }

// insertPostData();


module.exports = router;
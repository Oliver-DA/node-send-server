const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.newLink = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({msg: errors.array()});
    }

    const { body: {original_name, name} } = req;

    const link = new Link();

    link.url = shortid.generate();
    link.name = name;
    link.original_name = original_name;

    if (req.user) {
        const {body: {password, downloads} } = req;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt)
        }

        if (downloads) {
            link.downloads = downloads
        }

        link.author = req.user.id
    }

    try {
        await link.save();
        res.json({msg: link.url});
        return next();

    } catch (err) {
        console.log(err);
    }

}

exports.hasPassword = async (req, res, next) => {

    const {params: { url } } = req;
    const link = await Link.findOne({ url });

    if(!link) {
        res.json({ msg: "This link does not exists"});
        return next()
    }

    if(link.password) {
         res.json ({password: true, link: link.url})
    }

    next()

}

exports.confirmPassword = async (req, res, next) => {

    const {params: { url }  }  = req;
    const {body: { password } } = req;

    const link = await Link.findOne({ url });

    if(bcrypt.compareSync(password, link.password)) {
        next();

    } else {
        return res.status(401).json({msg: "Incorrect password"})
    }
}

exports.getLink = async (req, res, next) => {
    const {params: {url}} = req;

    const link = await Link.findOne({ url });

    if(!link) {
        res.json({ msg: "This link does not exists"});
        return next()
    }
    
    res.json({file: link.name, password: false})

    next();
}

exports.allLinks = async (req, res) => {
    try {
        const links = await Link.find({}).select("url -_id");
        res.json({links});

    } catch (error) {
        console.log(error)
    }
}
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const Link = require("../models/Link");


exports.uploadFile = async (req, res, next) => {

    const multerConfig = {
        limits : { fileSize: req.user ? 1024 * 1024 * 10 : 1000000 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + "/../uploads")
            },
    
            filename : (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            }
        })
    }
    
    const upload = multer(multerConfig).single("file");

    upload(req, res, async (err) => {

        if(!err) {
            res.json({ file: req.file.filename});

        } else {
            console.log(err);
            return next()
        }
    })
}


exports.deleteFile = async (req, res) => {

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);

    }catch(err) {
        console.log(err)
    }
}

exports.download = async (req, res, next) => {

    const {params: { file } } = req;

    const link = await Link.findOne({name: file})

    const download_file = __dirname + '/../uploads/' + file;
    res.download(download_file);
   
    let { downloads, name } = link

    if (downloads === 1) {

        req.file = name

        await Link.findOneAndRemove(link.id)

        next();

    } else {
        link.downloads--;
        await link.save();
    }
}

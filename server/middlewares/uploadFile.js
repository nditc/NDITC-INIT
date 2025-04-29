const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { BadRequestError } = require('../errors');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
//file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const validFields = /participants|CA|banner|gallery|thumbnail|event|sponsor/;
//     const isFieldValid = validFields.test(file.fieldname);
//     if (!isFieldValid) {
//       cb(new Error(`Field name didn't match`));
//     }
//     let destName = resolve(__dirname, `../uploads/${file.fieldname}`);

//     if (!existsSync(destName)) {
//       try {
//         mkdirSync(destName, { recursive: true });
//       } catch (error) {
//         // cmnt
//       }
//     }
//     const pathName = `uploads/${file.fieldname}`;
//     cb(null, pathName);
//   },
//   filename: (req, file, cb) => {
//     let type = file.mimetype.split('/');
//     const fileExt = type[type.length - 1];

//     let fileName = '';
//     if (file.fieldname === 'banner') {
//       fileName = 'eventBanner' + `@${Date.now()}`;
//     } else if (file.fieldname === 'participants' || file.fieldname === 'CA') {
//       let { fullName, name } = req.body;

//       if (fullName) {
//         fullName = fullName.trim();
//         fileName = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;
//         req.userName = fileName;
//       } else if (name) {
//         fileName = name;
//       } else {
//         cb(new BadRequestError('fullName should be provided'));
//       }
//     } else if (file.fieldname === 'event') {
//       fileName = req.body.name.split(' ').join('') + `@${Date.now()}`;
//     } else {
//       fileName = file.fieldname + `-${Date.now()}`;
//     }
//     cb(null, fileName + '.' + fileExt);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req, file) => {
      return `init/uploads/${file.fieldname}/`;
    },
    public_id: (req, file) => {
      let type = file.mimetype.split('/');
      const fileExt = type[type.length - 1];

      let fileName = '';
      if (file.fieldname === 'banner') {
        fileName = 'eventBanner' + `@${Date.now()}`;
      } else if (file.fieldname === 'participants' || file.fieldname === 'CA') {
        let { fullName, name } = req.body;

        if (fullName) {
          // cmnt
          fullName = fullName.trim();
          fileName = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;
          req.userName = fileName;
        } else if (name) {
          fileName = name;
        } else {
          cb(new BadRequestError('fullName should be provided'));
        }
      } else if (file.fieldname === 'event') {
        fileName = req.body.name.split(' ').join('') + `@${Date.now()}`;
      } else {
        fileName = file.fieldname + `-${Date.now()}`;
      }
      return encodeURIComponent(fileName);
    },
    overwrite: true,
    invalidate: true,
    transformation: [{ quality: 'auto:eco' }, { width: 1920, crop: 'scale' }],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const validFields = /participants|CA|banner|gallery|thumbnail|event|sponsor/;
    const isFieldValid = validFields.test(file.fieldname);

    if (!isFieldValid) {
      cb(new Error(`Field name didn't match`));
    }

    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new BadRequestError('only jpg,png,jpeg is allowed!'));
    }

    cb(new Error('there was an unknown error'));
  },
});

module.exports = upload;

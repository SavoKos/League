const { Router } = require('express');
//izbaciti
const multer = require('multer');

const authController = require('../controllers/authController');
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
} = require('../controllers/handlerFactory');

const User = require('../models/userModel');
const { upload } = require('../utils/uploadImage');

const router = Router();

router.post('/login', authController.login_Post);
router;
router.patch(
  '/register/:id',
  upload.single('image'),
  authController.register_Patch
);
router.get('/logout', authController.logout_Get);
router.get('/protected', authController.protected_Get);

router.get('/', getAll(User));
router.post('/', authController.createPendingUser_Post);

//izbaciti

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file?.originalname);
  },
});

const uploadd = multer({
  storage: Storage,
});

router.post('/image', uploadd.single('image'), authController.image);

router
  .route('/:id')
  .get(getOne(User))
  .patch(upload.single('image'), updateOne(User))
  .delete(deleteOne(User));

module.exports = router;

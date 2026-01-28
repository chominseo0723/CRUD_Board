const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// 중복 체크
router.post('/check-username', authController.checkUsername);
router.post('/check-nickname', authController.checkNickname);

// 회원가입
router.post('/register', authController.register);

// 로그인
router.post('/login', authController.login);

// 닉네임 조회
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;

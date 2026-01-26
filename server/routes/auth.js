const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

// 아이디 : 영문 소문자 + 숫자 4~20자
const usernameRegex = /^[a-z0-9]{4,20}$/;

router.post('/check-username', (req, res) => {
  const { username } = req.body;

  // 빈 값 체크
  if (!username) {
    return res.status(400).json({ message: '아이디를 입력하세요' });
  }

  // 아이디 형식 체크
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: '아이디는 영문 소문자와 숫자 4~20자만 가능합니다',
    });
  }

  // DB 중복 확인
  const sql = 'SELECT id FROM users WHERE username = ?';

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 에러' });
    }

    // 이미 존재
    if (results.length > 0) {
      return res.json({ available: false });
    }

    // 사용 가능
    res.json({ available: true });
  });
});


router.post('/check-nickname', (req, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ message: '닉네임을 입력하세요' });
  }

  const sql = 'SELECT id FROM users WHERE nickname = ?';

  db.query(sql, [nickname], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 에러' });
    }

    // 이미 존재
    if (results.length > 0) {
      return res.json({ available: false });
    }
    res.json({ available: true });
  });
});

router.post('/register', async (req, res) => {
  const { username, nickname, password } = req.body;

  // 필수 값 체크
  if (!username || !nickname || !password) {
    return res.status(400).json({ message: '모든 값을 입력하세요' });
  }

  // 아이디 형식 체크 
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: '아이디는 영문 소문자와 숫자 4~20자만 가능합니다',
    });
  }

  try {
    //  비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      'INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)';

    db.query(sql, [username, nickname, hashedPassword], (err) => {
      if (err) {
        console.error(err);

        // 중복 에러 처리
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            message: '이미 존재하는 아이디 또는 닉네임입니다',
          });
        }

        return res.status(500).json({ message: '회원가입 실패' });
      }

      res.json({ message: '회원가입 성공' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러' });
  }
});

module.exports = router;

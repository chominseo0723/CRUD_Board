const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');


const router = express.Router();

// 아이디 중복확인
router.post('/check-username', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: '아이디를 입력하세요' });
  }

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

// 닉네임 중복확인
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

    // 사용 가능
    res.json({ available: true });
  });
});



router.post('/register', async (req, res) => {
  const { username, nickname, password } = req.body;


  if (!username || !nickname || !password) {
    return res.status(400).json({ message: '모든 값을 입력하세요' });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const sql =
      'INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)';

    db.query(sql, [username, nickname, hashedPassword], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: '회원가입 실패' });
      }

      res.json({ message: '회원가입 성공 🎉' });
    });
  } catch (error) {
    res.status(500).json({ message: '서버 에러' });
  }
});


module.exports = router;

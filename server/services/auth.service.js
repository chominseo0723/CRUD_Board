const db = require('../db');
const bcrypt = require('bcrypt');

// 아이디 형식
const usernameRegex = /^[a-z0-9]{4,20}$/;

exports.checkUsername = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) {
      return reject({ status: 400, message: '아이디를 입력하세요' });
    }

    if (!usernameRegex.test(username)) {
      return reject({
        status: 400,
        message: '아이디는 영문 소문자와 숫자 4~20자만 가능합니다',
      });
    }

    const sql = 'SELECT id FROM users WHERE username = ?';

    db.query(sql, [username], (err, results) => {
      if (err) return reject({ message: '서버 에러' });

      resolve({ available: results.length === 0 });
    });
  });
};

exports.checkNickname = (nickname) => {
  return new Promise((resolve, reject) => {
    if (!nickname) {
      return reject({ status: 400, message: '닉네임을 입력하세요' });
    }

    const sql = 'SELECT id FROM users WHERE nickname = ?';

    db.query(sql, [nickname], (err, results) => {
      if (err) return reject({ message: '서버 에러' });

      resolve({ available: results.length === 0 });
    });
  });
};

exports.register = ({ username, nickname, password }) => {
  return new Promise(async (resolve, reject) => {
    if (!username || !nickname || !password) {
      return reject({ status: 400, message: '모든 값을 입력하세요' });
    }

    if (!usernameRegex.test(username)) {
      return reject({
        status: 400,
        message: '아이디는 영문 소문자와 숫자 4~20자만 가능합니다',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      'INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)';

    db.query(sql, [username, nickname, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return reject({
            status: 409,
            message: '이미 존재하는 아이디 또는 닉네임입니다',
          });
        }
        return reject({ message: '회원가입 실패' });
      }

      resolve();
    });
  });
};

exports.login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      return reject({
        status: 400,
        message: '아이디와 비밀번호를 입력하세요',
      });
    }

    const sql =
      'SELECT id, username, nickname, password FROM users WHERE username = ?';

    db.query(sql, [username], async (err, results) => {
      if (err) return reject({ message: '서버 에러' });

      if (results.length === 0) {
        return reject({
          status: 401,
          message: '아이디 또는 비밀번호가 틀렸습니다',
        });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return reject({
          status: 401,
          message: '아이디 또는 비밀번호가 틀렸습니다',
        });
      }

      resolve({
        id: user.id,
        username: user.username,
        nickname: user.nickname,
      });
    });
  });
};

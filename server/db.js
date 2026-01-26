const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // MySQL 유저
  password: 'star0723!!',  // MySQL 비밀번호
  database: 'node_auth'
});

// 연결 시도
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});

module.exports = db;

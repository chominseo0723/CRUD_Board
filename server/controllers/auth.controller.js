const authService = require('../services/auth.service');

// 아이디 중복 체크
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const result = await authService.checkUsername(username);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

// 닉네임 중복 체크
exports.checkNickname = async (req, res) => {
  try {
    const { nickname } = req.body;
    const result = await authService.checkNickname(nickname);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

// 회원가입
exports.register = async (req, res) => {
  try {
    const { username, nickname, password } = req.body;
    await authService.register({ username, nickname, password });
    res.json({ message: '회원가입 성공' });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.login({ username, password });

    res.json({
      message: '로그인 성공',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

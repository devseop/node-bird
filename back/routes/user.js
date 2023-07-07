const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();

// POST /user/
router.post("/", async (req, res, next) => {
  try {
    // 중복 이메일 찾기
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res
        .status(403)
        .send("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhos:3000"); // 두번쨰에 '*'를 넣으면 모든 서버에서 허용
    res.status(201).send("✅ OK");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;

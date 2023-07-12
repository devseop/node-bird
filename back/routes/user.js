const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");

const router = express.Router();

router.post(
  "/logIn",
  // 미들웨어를 확장하는 방법
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        // 401 = 허가되지 않음
        console.log(info);
        return res.status(401).send(info.reason);
      }
      return req.logIn(user, async (logInErr) => {
        if (logInErr) {
          console.error(logInErr);
          return next(logInErr);
        }
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          // 원하는 데이터를 아래와 같이 선택하여 보내준다.
          // attributes: ["id", "nickname", "email"],
          // exclude는 해당 데이터를 제외한 모든 데이터를 보내준다.
          attributes: { exclude: ["password"] },
          include: [
            {
              model: Post,
            },
            {
              model: User,
              as: "Followings",
            },
            {
              model: User,
              as: "Followers",
            },
          ],
        });
        return res.status(200).json(fullUserWithoutPassword);
      });
    })(req, res, next);
  }
);

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

router.post("/user/logOut", (req, res) => {
  console.log(req.user);
  req.logOut();
  req.session.destroy();
  res.send("✅ Log Out Successed");
});

module.exports = router;

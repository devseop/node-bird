const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// 새로고침시 사용자 정보를 복구하는 코드
router.get("/", async (req, res, next) => {
  console.log(req.headers);
  try {
    // 사용자가 있으면 정보를 보내고 없으면 아무것도 보내지 않기
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/logIn",
  isNotLoggedIn,
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
              attributes: ["id"],
            },
            {
              model: User,
              as: "Followings",
              attributes: ["id"],
            },
            {
              model: User,
              as: "Followers",
              attributes: ["id"],
            },
          ],
        });
        return res.status(200).json(fullUserWithoutPassword);
      });
    })(req, res, next);
  }
);

// log out
router.post("/logOut", isLoggedIn, (req, res) => {
  console.log(req.user);
  req.logOut(() => {
    // res.redirect("/");
  });
  // req.session.destroy();
  res.send("✅ Log Out Successed");
});

// sign up
router.post("/", isNotLoggedIn, async (req, res, next) => {
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
    // res.setHeader("Access-Control-Allow-Origin", "http://localhos:3000");
    // 두번쨰에 '*'를 넣으면 모든 서버에서 허용
    res.status(201).send("✅ OK");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

// edit nickname
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// follow
router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("존재하지 않는 사용자입니다.");
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// unfollow
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("존재하지 않는 사용자입니다.");
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// remove follow
router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("존재하지 않는 사용자입니다.");
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// load followers
router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("존재하지 않는 사용자입니다.");
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// load followings
router.get("/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("존재하지 않는 사용자입니다.");
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

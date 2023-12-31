const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Comment, Image, User, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("🚧 uploads 폴더가 없으므로 생성합니다. 🚧");
  fs.mkdirSync("uploads");
}

// upload image
const upload = multer({
  storage: multer.diskStorage({
    // 저장위치
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // ex) 윤섭.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 윤섭
      done(null, basename + "_" + new Date().getTime() + ext); // 윤섭1284759.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 한도
});

// add post
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      // result의 값이 [[노드, true], [리액트, true]] 형태로 출력
      // 따라서 아래와 같이 value의 첫번째 값만 가져오도록 함
      await post.addHashtags(result.map((v) => v[0]));
    }
    // 이미지를 여러개 올리면 [1.png, 2.png]의 배열형태로 업로드됨
    // 이미지가 한개인 경우 image: 1.png의 결로 형태로 업로드됨
    // 따라서 위 경우를 나누기 위해 if 함수를 이용한 분기처리가 필요하다
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // map()을 이용해 시퀄라이즈 생성을 해줌
        // create()는 promise => 아래 코드는 promise의 배열인셈
        // 따라서 Promise.all로 한번에 처리될 수 있도록 함
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

// post
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
          ],
        },
        { model: User, attributes: ["id", "nickname"] },
        { model: User, as: "Likers", attributes: ["id", "nickname"] },
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        { model: User, as: "Likers", attributes: ["id"] },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// retweet
router.post("/:postId/retweet", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{ model: Post, as: "Retweet" }],
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    // 아래 해당되는 조건들은 리트윗 불가능
    if (
      // 내 게시물 리트윗 하는 것
      req.user.id === post.UserId ||
      // 다른 사람이 리트윗한 '내 게시물'을 다시 리트윗 하는 것
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("내 게시물은 직접 리트윗할 수 없습니다.");
    }
    // 다른 사람이 리트윗한 제3자의 게시물을 내가 리트윗 하는 것은 가능
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send("이미 리트윗된 게시물입니다.");
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });
    // 내가 어떤 게시물을 리트윗했는지 알려주는 코드
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
          ],
        },
        { model: User, attributes: ["id", "nickname"] },
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        { model: User, as: "Likers", attributes: ["id"] },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// add comment
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          modle: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// like post
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ id: req.params.postId });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// unlike post
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ id: req.params.postId });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// delete post
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

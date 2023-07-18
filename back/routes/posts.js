const express = require("express");
const { Post, User, Image, Comment } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10, // 가져올 게시글의 갯수
      // offset: 0, // 가져오는 게시글의 순서 offset: 0 => 1~10번째 게시물
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("✅ DataBase Connected!");
  })
  .catch(console.error);

app.use(express.json()); // json 형식의 데이터를 req.body에 넣어주는 역할
app.use(express.urlencoded({ extended: true })); // form data를 req.body에 넣어주는 역할

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express!</h1>");
});

app.get("/api", (req, res) => {
  res.send("<h1>Hello, API!</h1>");
});

app.get("/post", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello3" },
    { id: 2, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("🚧 Server is running! 🚧");
});

//* app.get => 가져오기
//* app.post => 생성하기
//* app.put => 전체 수정
//* app.delete => 삭제
//* app.patch => 부분 수정
//* app.options => 찔러보기(요청 확인)
//* app.head => 헤더만 가져오기

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("✅ DataBase Connected!");
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: true, // origin: true로 설정시 요청을 보낸 곳의 주소가 자동으로 삽입됨
    credentials: true,
  })
); // cors 라이브러리를 이용하면 모든 요청에 Access-Control-Allow-Origin를 넣어줌
app.use(express.json()); // json 형식의 데이터를 req.body에 넣어주는 역할
app.use(express.urlencoded({ extended: true })); // form data를 req.body에 넣어주는 역할
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express!</h1>");
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

// 에러 처리를 위한 미들웨어는 4개의 매개변수를 가진다.
// app.use((err, req, res, next) => {});

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

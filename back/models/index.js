const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 환경변수 설정
const config = require("../config/config.js")[env];
const db = {};

// 시퀄라이즈가 노드와 mysql을 연결
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

// 각 모델별 associate를 연결 및 실행해주는 함수
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

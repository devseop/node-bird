const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 환경변수 설정
const config = require("../config/config")[env];
const db = {};

// 시퀄라이즈가 노드와 mysql을 연결
const sequelize = new this.sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

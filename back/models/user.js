module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // MySQL에는 users라는 테이블로 생성됨
      // id는 MySQL에서 자동으로 입력해줌
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수 or 선택 여부
        unique: true, // 고유한 값 설정 여부
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    {
      // 두번째 브라켓엔 유저 모델에 대한 setting
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongstoMany(db.Post, { through: "Like", as: "Liked" }); // 사용자와 게시글의 '좋아요' 관계
    db.User.belongstoMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongstoMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};

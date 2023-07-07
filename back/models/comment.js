module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // db.B.belongsTo(db.A) => B가 A의 종속 관계임을 표현
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};

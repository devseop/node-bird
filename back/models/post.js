module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // 이모티콘을 쓰려면 mb4를 같이 입력해야함
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 어떤 사용자가 포스트를 작성했는가에 대한 관계
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 다대다(M:N) 관계를 표현
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 어떤 사용자가 포스트에 좋아요를 눌렀는가에 대한 관계
    // through를 통해서 둘 사이에 생성되는 중간 테이블의 이름을 설정할 수 있다.
    // 대신 연결되어 있는 다른 모델에서도 똑같이 적용해야 한다.
    // as를 이용하여 별칭부여가 가능 => 별칭은 해당 모델 중심으로 설정하는 것이 좋다.
    //* db.A.hasOne(db.B) => 1:1 관계
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // retweet 관계
  };
  return Post;
};

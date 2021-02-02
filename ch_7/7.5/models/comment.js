const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        //commenter는 시퀄라이즈에서 관계 컬럼이라해서
        //특별하게 까로 만들어줌
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });//여기에 onDelete:'cascade'등옵션 추가가능
    //반대로 써줌 commenter가 속해져 있다.
    //댓글이 사용자에게 속해져 있는것.
    //belongsTo 쪽에 commenter가 추가된다.
  }
};
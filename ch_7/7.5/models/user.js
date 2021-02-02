const Sequelize = require('sequelize');
// 기본 양식임
module.exports = class User extends Sequelize.Model {//User가 모델이름
    //시퀄라이즈에서 모델이 DB에서 테이블
  static init(sequelize) {
    return super.init({
        //id는 자동으로 들어감
      name: {//각각의 컬럼
        type: Sequelize.STRING(20),
        allowNull: false,//not null
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,//시퀄라이저에서는
        //INTEGER라고 정확히 써줘야됨.
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,//ture false의 값
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE, //mysql에서 DATE라면 Sequelize DateOnly
        allowNull: false,
        defaultValue: Sequelize.NOW, //디폴트 값 now()
        //시퀄라이즈는 여러가지 디비를 동시에 지원하다보니까
        //조금씩 표현법이 다름
      },
    }, {//모델에 대한 설정
      sequelize,
      timestamps: false,//true하면 createdAt, updatedAt도 컬럼 같이 지원해줌
      underscored: false,
      //시퀄라이즈에서 자동으로 만들어주는것
      //true하면 created_at이런식으로 만들어줌
      //false면 createdAt (취향차이)
      modelName: 'User',
      tableName: 'users',//실제 sql에서 쓰는 이름.
      //테이블명, 시퀄라이즈는 모델이름을 소문자 복수형으로 한다음 테이블이름을 정한다.
      paranoid: false,
      //이것이 트루면 제거날짜까지 만들어줌
      //삭제할때 deletedAt을 트루로 만들어줌(소프트 딜리트)
      //소프트 딜리트 구현 될수 있도록.
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    //유저의 외래키는 남의 키
    //소스키가 자신.
  }
};
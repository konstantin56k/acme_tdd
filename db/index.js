const Sequelize = require('sequelize');
const { STRING } = Sequelize.DataTypes;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_tdd');

const Artist = conn.define('artist', {
  name: STRING
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [weeknd, metalica] = await Promise.all([
    Artist.create({ name: 'The Weeknd'}),
    Artist.create({ name: 'Metalica'}),
    Artist.create({ name: 'Adele'})
  ]); 
  return {
    artists: {
      weeknd,
      metalica
    }
  };

};


module.exports = {
  syncAndSeed,
  models: {
    Artist
  }
};

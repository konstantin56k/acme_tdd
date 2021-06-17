const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, INTEGER } = Sequelize.DataTypes;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_tdd');

const Artist = conn.define('artist', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING
});

const Song = conn.define('song', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING
});

const Album = conn.define('album', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false
  }
});

const Track = conn.define('track', {
  idx: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

Song.belongsTo(Artist);
Album.belongsTo(Artist);
Track.belongsTo(Song);
Track.belongsTo(Album);
Artist.hasMany(Song);
Artist.hasMany(Album);
Song.hasMany(Track);
Album.hasMany(Track);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [weeknd, metalica, adele, starboy] = await Promise.all([
    Artist.create({ name: 'The Weeknd'}),
    Artist.create({ name: 'Metalica'}),
    Artist.create({ name: 'Adele'}),
    Album.create({ name: 'Starboy'})
]);

starboy.id = weeknd.id;
await starboy.save();

  return {
    artists: {
      weeknd,
      metalica,
      adele
    },

    albums: {
      starboy
    }
  };

};


module.exports = {
  syncAndSeed,
  models: {
    Artist,
    Album,
    Song,
    Track
  }
};

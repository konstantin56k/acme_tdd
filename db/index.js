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
  name: STRING,
  duration: {
    type: INTEGER
  }
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
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  idx: INTEGER
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
  const [weeknd, metalica, adele] = await Promise.all([
    Artist.create({ name: 'The Weeknd'}),
    Artist.create({ name: 'Metalica'}),
    Artist.create({ name: 'Adele'})
]);

const [ adele19, adele25, afterHours, theHighlights] = await Promise.all([
  Album.create({ name: 'Adele 19', artistId: adele.id }),
  Album.create({ name: 'Adele 25', artistId: adele.id }),
  Album.create({ name: 'After Hours', artistId: weeknd.id }),
  Album.create({ name: 'The Highlights', artistId: weeknd.id }),
]);

const [ hello, whenWeWereYoung, dayDreamer, blindingLights, inYourEyes, saveYourTears] = await Promise.all([
  Song.create({ name: 'Hello', artistId: adele.id, duration: 300 }),
  Song.create({ name: 'When We Were Young', artistId: adele.id, duration: 350 }),
  Song.create({ name: 'Day Dreamer', artistId: adele.id, duration: 350 }),
  Song.create({ name: 'Blinding Lights', artistId: weeknd.id, duration: 400 }),
  Song.create({ name: 'In Your Eyes', artistId: weeknd.id, duration: 410 }),
  Song.create({ name: 'Save Your Tears', artistId: weeknd.id, duration: 410 }),
]);

await Promise.all([
  Track.create({ songId: hello.id, albumId: adele25.id, idx: 1}),
  Track.create({ songId: whenWeWereYoung.id, albumId: adele25.id, idx: 1}),
  Track.create({ songId: dayDreamer.id, albumId: adele25.id, idx: 2}),
  Track.create({ songId: blindingLights.id, albumId: theHighlights.id, idx: 2}),
  Track.create({ songId: inYourEyes.id, albumId: theHighlights.id, idx: 2}),
  Track.create({ songId: blindingLights.id, albumId: afterHours.id, idx: 2}), 
  Track.create({ songId: inYourEyes.id, albumId: afterHours.id, idx: 1}),
  Track.create({ songId: saveYourTears.id, albumId: afterHours.id, idx: 5}) 
]);


  return {
    artists: {
      weeknd,
      metalica,
      adele
    },
    albums: {
      theHighlights,
      adele19,
      afterHours,
      adele25
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

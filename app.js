const express = require('express');
const app = express();
const path = require('path');
const { models: { Song, Track, Artist, Album }} = require('./db');


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/artists', async(req, res, next)=> {
  try {
    res.send(await Artist.findAll({
      order: [['name']]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/albums', async(req, res, next)=> {
  try {
    res.send(await Album.findAll({
      order: [['name']],
      include: [ Artist ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/albums/:id/tracks', async(req, res, next)=> {
  try {
    res.send(await Track.findAll({
      order: [['idx']],
      where: {
        albumId: req.params.id
      },
      include: [ Song ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;
const { expect } = require('chai');
const { syncAndSeed } = require('./db');
const supertest = require('supertest');
const app = supertest(require('./app'));

describe('The API', ()=> {
  let seed;
  beforeEach(async()=> {
    seed = await syncAndSeed();
  });
  describe('seeded data', ()=> {
    it('The Weeknd is one of the artists', ()=> {
      const weeknd = seed.artists.weeknd;
      expect(weeknd).to.be.ok;
    });
    it('Metalica is one of the artists', ()=> {
      expect(seed.artists.metalica.name).to.equal('Metalica');
    });
  });
  describe('albums routes', ()=> {
    describe('GET /api/albums', ()=> {
      it('returns the albums', async()=> {
        const response = await app.get('/api/albums');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);
        const names = response.body.map( album => album.name);
        expect(names).to.eql(['Adele', 'Metalica', 'The Weeknd']);
      });
    });
  });
});

const { expect } = require('chai');
const { syncAndSeed } = require('./db');

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
      expect(seed.artists.metalica.name).to.equal('metalica');
    });
  });
});

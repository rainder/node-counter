'use strict';

require('co-mocha')
const chai = require('chai');
const Counter = require('./..')
chai.should();

describe('all-tests', function () {
  const sleep = (time) => (cb) => setTimeout(cb, time);

  const _setInterval = setInterval;
  global.setInterval = (cb, time) => {
    return _setInterval(cb, 50);
  };

  it('should create counter', function *() {
    const counter = new Counter();

    counter.inc('req', 1);

    counter.total.should.have.keys(['req']);
    counter.total.req.should.equals(1);

    yield sleep(55);

    counter.inc('req', 1);
    counter.inc('req', 1);
    counter.inc('req', 1);

    counter.total.should.have.keys(['req']);
    counter.per_sec.should.have.keys(['req']);

    counter.total.req.should.equals(4);
    counter.per_sec.req.should.equals(1);

    yield sleep(55);

    counter.total.req.should.equals(4);
    counter.per_sec.req.should.equals(3);

    yield sleep(55);

    counter.total.req.should.equals(4);
    counter.per_sec.req.should.equals(0);
  });

});

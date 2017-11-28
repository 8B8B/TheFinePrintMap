const assert = require('chai').assert;
var mongoose = require('mongoose');
var config = require('../config/config');
var should = require('should');
var request = require('supertest');
var expect = require('chai').expect;
//const heatMapToggle = require('C:/Users/Allison/TheFinePrintMap/client/index.html').heatMapToggle;
var demographicSchema = require('C:/Users/Allison/TheFinePrintMap/demoSchema.js');

//const app = require('../config/app');

var demographic;
demographic = {
    zip: 32601,
    population: 18585,
    medianAge: 24.4,
    numOfHousing: 9182,
    medianIncome: 24272,
    percentBelowPov: 46.9,
    race: {
        whiteAlone: 13029,
        AAAlone: 3895,
        nativeAm: 0,
        asian: 891,
        nativeHawaiian: 88,
        Other: 237,
        twoOrMore: 668,
        hispanicLatino: 1818,
        whiteAloneNotHispanic: 11613
    }
}



describe('Testing Database Features', function(){

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when zip and population provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('throws an error when no zip provided', function(done){
      new demographicSchema({
        population: demographic.population
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('saves properly when no population provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        medianAge: demographic.medianAge,
        numOfHousing: demographic.numOfHousing,
        medianIncome: demographic.medianIncome,
        percentBelowPov: demographic.percentBelowPov,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            AAAlone: demographic.race.AAAlone,
            nativeAm: demographic.race.nativeAm,
            asian: demographic.race.asian,
            nativeHawaiian: demographic.race.nativeHawaiian,
            Other: demographic.race.other,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when no medianAge provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population,
        numOfHousing: demographic.numOfHousing,
        medianIncome: demographic.medianIncome,
        percentBelowPov: demographic.percentBelowPov,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            AAAlone: demographic.race.AAAlone,
            nativeAm: demographic.race.nativeAm,
            asian: demographic.race.asian,
            nativeHawaiian: demographic.race.nativeHawaiian,
            Other: demographic.race.other,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when no numOfHousing provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population,
        medianAge: demographic.medianAge,
        medianIncome: demographic.medianIncome,
        percentBelowPov: demographic.percentBelowPov,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            AAAlone: demographic.race.AAAlone,
            nativeAm: demographic.race.nativeAm,
            asian: demographic.race.asian,
            nativeHawaiian: demographic.race.nativeHawaiian,
            Other: demographic.race.other,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when no medianIncome provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population,
        medianAge: demographic.medianAge,
        numOfHousing: demographic.numOfHousing,
        percentBelowPov: demographic.percentBelowPov,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            AAAlone: demographic.race.AAAlone,
            nativeAm: demographic.race.nativeAm,
            asian: demographic.race.asian,
            nativeHawaiian: demographic.race.nativeHawaiian,
            Other: demographic.race.other,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when no percentBelowPov provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population,
        medianAge: demographic.medianAge,
        numOfHousing: demographic.numOfHousing,
        medianIncome: demographic.medianIncome,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            AAAlone: demographic.race.AAAlone,
            nativeAm: demographic.race.nativeAm,
            asian: demographic.race.asian,
            nativeHawaiian: demographic.race.nativeHawaiian,
            Other: demographic.race.other,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when no AAAlone provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population,
        medianAge: demographic.medianAge,
        numOfHousing: demographic.numOfHousing,
        medianIncome: demographic.medianIncome,
        percentBelowPov: demographic.percentBelowPov,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            nativeAm: demographic.race.nativeAm,
            asian: demographic.race.asian,
            nativeHawaiian: demographic.race.nativeHawaiian,
            Other: demographic.race.other,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when no race provided', function(done){
      new demographicSchema({
        zip: demographic.zip,
        population: demographic.population,
        medianAge: demographic.medianAge,
        numOfHousing: demographic.numOfHousing,
        medianIncome: demographic.medianIncome,
        percentBelowPov: demographic.percentBelowPov
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('throws an error when most but zip provided', function(done){
      new demographicSchema({
        population: demographic.population,
        medianAge: demographic.medianAge,
        percentBelowPov: demographic.percentBelowPov,
        race: {
            whiteAlone: demographic.race.whiteAlone,
            nativeAm: demographic.race.nativeAm,
            twoOrMore: demographic.race.twoOrMore,
            hispanicLatino: demographic.race.hispanicLatino,
            whiteAloneNotHispanic: demographic.race.whiteAloneNotHispanic
        }
      }).save(function(err){
        should.exist(err);
        done();
      })
    });



  });

});

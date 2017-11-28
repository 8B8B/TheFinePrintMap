var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var demographicSchema = new mongoose.Schema({
      zip: {
        type: Number,
        required: true
      },
      population: Number,
      medianAge: Number,
      numOfHousing: Number,
      medianIncome: Number,
      percentBelowPov: Number,
      race: {
          whiteAlone: Number,
          AAAlone: Number,
          nativeAm: Number,
          asian: Number,
          nativeHawaiian: Number,
          Other: Number,
          twoOrMore: Number,
          hispanicLatino: Number,
          whiteAloneNotHispanic: Number
      }
    });

demographicSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Demo = mongoose.model('Demo', demographicSchema);

module.exports = Demo;

// app/models/Chicken.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our chook model
//module.exports allows us to pass this to other files when it is called
var chickenSchema = new Schema({
  breed: String,
  name: String,
  laying: Boolean
})
chickenSchema.methods.speak = function () {
    var greeting = this.name ?
      "Bok, Bok, Bok! My name is " + this.name :
      "I don't have a name";
    console.log(greeting);
}
var Chicken = mongoose.model('Chicken', chickenSchema);
module.exports = Chicken;
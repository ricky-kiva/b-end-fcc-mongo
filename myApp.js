require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // connecting to mongoose API

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
}) // making schema for person

let Person = mongoose.model('Person', personSchema) // defining schema model for Person

const createAndSavePerson = (done) => {
  var kathlynLenz = new Person({
    name: 'Kathlyn',
    age: 22,
    favoriteFoods: ['Ice Cream', 'Nasi Kebuli']
  }) // making new document from a model

  kathlynLenz.save(function(err, data) { // saving the document
    if (err) return console.error(err)
    done(null, data); // passing the document data to callback
  })
};

const arrayOfPeople = [
    {
      name: 'Waters',
      age: 24,
      favoriteFoods: ['Pork', 'Sate']
    }, 
    {
      name: 'Syd',
      age: 22,
      favoriteFoods: ['Candy', 'Mushroom']
    }, {
      name: 'Dave',
      age: 24,
      favoriteFoods: ['Salmon', 'Wine']
    }
  ]; // array for createManyPeople()

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }) // Model.create() to make many new document from an array
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }) // Model.find() will search for all document with related JSON properties
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }) // Model.findOne() will search one document in matching JSON properties
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, person) { // find person by id
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd) // push new food array element

    person.save(function(err, editPerson) {
      if (err) return console.error(err);
      done(null, editPerson)
    }) // save the edited person
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, editAge) {
    if (err) return console.error(err);
    done(null, editAge);
  }) // to find one occurence of properties, update, and post
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }) // find one occurence of ID and remove it
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }) // will remove person in var nameToRemove
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1}) // sort by name ascending
    .limit(2) // limit the data caught to be only 2
    .select({name: true, favoriteFoods: true}) // only name & favoriteFoods that is visible
    .exec()
    .then(data => {
      done(null, data);
    })
    .catch(err => {
      console.error(err);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

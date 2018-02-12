const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const RINGS = [
  'adopt',
  'trial',
  'assess',
  'hold'
];

const ringValidator = [
  validate({
    validator: 'isLength',
    arguments: [4, 40],
    message: 'ring must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: function(val){
      return (-1 !== RINGS.indexOf(val));
    },
    message: `ring must be one of (${RINGS.join(', ')}).`
  })
];

const quadrantValidator = [
  validate({
    validator: 'isLength',
    arguments: [4, 40],
    message: 'ring must not exceed {ARGS[1]} characters.'
  })
];

const poleValidator = [
  validate({
    validator: 'isLength',
    arguments: [4, 40],
    message: 'ring must not exceed {ARGS[1]} characters.'
  })
];

const descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 4000],
    message: 'description must have a length between {ARGS[0]} and {ARGS[1]}.'
  })
];
// todo replace this when upgrading the models
// const isNewsValidator = [
//   validate({
//     validator: 'isBoolean'
//   })
// ];


// Define the database model
const TechnologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true,
    validate: nameValidator
  },
  ring: {
    type: String,
    required: [true, 'ring is required.'],
    validate: ringValidator
  },
  quadrant: {
    type: String,
    required: [true, 'quadrant is required.'],
    validate: quadrantValidator
  },
  pole: {
    type: String,
    required: [true, 'pole is required.'],
    validate: poleValidator
  },
  description: {
    type: String,
    required: [true, 'description is required.'],
    validate: descriptionValidator
  },
  isNews: {
    type: Boolean,
    required: [true, 'isNews is required.'],
    // validate: isNewsValidator
  }
});

// Use the unique validator plugin
TechnologySchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Technologie = module.exports = mongoose.model('technologie', TechnologySchema);
const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Technology = require('./technologies-models');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:id', (req, res) => {
  Technology.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such technologie.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  Technology.find({})
    .then((result) => {
      res.json(result.map((tech)=>{
        return {
          name: tech.name,
          ring: tech.ring,
          quadrant: tech.quadrant,
          description: tech.description,
          isNew: tech.isNews,
        };
      }));
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  // Validate the age
  // let age = sanitizeAge(req.body.age);
  // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });
  let {
    name,
    ring,
    quadrant,
    description,
    isNew,
  } = req.body;

  let newTechnologie = new Technology({
    name,
    ring,
    quadrant,
    description,
    isNews,
  });

  newTechnologie.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          name: result.name,
          ring: result.ring,
          quadrant: result.quadrant,
          description: result.description,
          isNew: result.isNews
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.email) {
          res.status(400).json({ success: false, msg: err.errors.email.message });
          return;
        }
        if (err.errors.age) {
          res.status(400).json({ success: false, msg: err.errors.age.message });
          return;
        }
        if (err.errors.gender) {
          res.status(400).json({ success: false, msg: err.errors.gender.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put('/:id', (req, res) => {

  // Validate the age
  // let age = sanitizeAge(req.body.age);
  // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });
  let { name, ring, quadrant, description, isNew } = req.body;

  let updatedTechnologie = {
    name,
    ring,
    quadrant,
    description,
    isNews
  };

  Technology.findOneAndUpdate({ _id: req.params.id }, updatedTechnologie, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Technology.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              name: newResult.name,
              ring: newResult.ring,
              quadrant: newResult.quadrant,
              description: newResult.description,
              isNew: newResult.isNews
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.email) {
          res.status(400).json({ success: false, msg: err.errors.email.message });
          return;
        }
        if (err.errors.age) {
          res.status(400).json({ success: false, msg: err.errors.age.message });
          return;
        }
        if (err.errors.gender) {
          res.status(400).json({ success: false, msg: err.errors.gender.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {

  Technology.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          name: result.name,
          ring: result.ring,
          quadrant: result.quadrant,
          description: result.description,
          isNew: result.isNews
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
// sanitizeName = (name) => {
//   return stringCapitalizeName(name);
// }
// sanitizeEmail = (email) => {
//   return email.toLowerCase();
// }
// sanitizeAge = (age) => {
//   // Return empty if age is non-numeric
//   if (isNaN(age) && age != '') return '';
//   return (age === '') ? age : parseInt(age);
// }
// sanitizeGender = (gender) => {
//   // Return empty if it's neither of the two
//   return (gender === 'm' || gender === 'f') ? gender : '';
// }
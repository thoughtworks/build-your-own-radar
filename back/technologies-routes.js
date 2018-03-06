const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const jsonexport = require('jsonexport');
const { verifyMiddleware } = require('./auth');

// const stringCapitalizeName = require('string-capitalize-name');

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

const mapNewsToNew = (tech) => {
  return {
    _id: tech._id,
    name: tech.name,
    ring: tech.ring,
    quadrant: tech.quadrant,
    pole: tech.pole,
    description: tech.description,
    isNew: tech.isNews,
  };
};
const mapNewsToNewWoId = (tech) => {
  return {
    // _id: tech._id,
    name: tech.name,
    ring: tech.ring,
    quadrant: tech.quadrant,
    pole: tech.pole,
    description: tech.description,
    isNew: tech.isNews,
  };
};

// READ (ALL)
router.get('/_csv_', (req, res) => {
  Technology.find({})
    .then((result) => {
      jsonexport(result.map(mapNewsToNewWoId), (err, data) => {
        res.send(data);
      })
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ALL)
router.get('/downloadCSV', (req, res) => {
  Technology.find({})
    .then((result) => {
      jsonexport(result.map(mapNewsToNewWoId), (err, data) => {
        res.setHeader('Content-disposition', `attachment; filename=Radar-backup-${new Date().toLocaleString()}.csv`);
        res.setHeader('Content-type', 'text/csv; charset=utf-8');

        res.send(data);
      })
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get('/:id', (req, res) => {
  Technology.findById(req.params.id)
    .then((result) => {
      res.json(mapNewsToNew(result));
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such technologie.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  Technology.find({})
    .then((result) => {
      res.json(result.map(mapNewsToNew));
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, verifyMiddleware, (req, res) => {

  // Validate the age
  // let age = sanitizeAge(req.body.age);
  // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });
  let {
    name,
    ring,
    quadrant,
    pole,
    description,
    isNew,
  } = req.body;

  let newTechnologie = new Technology({
    name,
    ring,
    quadrant,
    pole,
    description,
    isNews: isNew,
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
          pole: result.pole,
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
router.put('/:id', verifyMiddleware, (req, res) => {

  // Validate the age
  // let age = sanitizeAge(req.body.age);
  // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });
  let { name, ring, quadrant, pole, description, isNew } = req.body;

  let updatedTechnologie = {
    name,
    ring,
    quadrant,
    pole,
    description,
    isNews: isNew
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
              pole: newResult.pole,
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
router.delete('/:id', verifyMiddleware, (req, res) => {

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
          pole: result.pole,
          description: result.description,
          isNew: result.isNews
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

router.post('/csv', verifyMiddleware, (req, res) => {
  // todo customize overwrite
  Technology.remove({}, () => {
    let technologiesP = req.body.csv.map((o) => {
      return (new Technology(o)).save();
    });
    Promise.all(technologiesP).then((saved) => {
      //todo optim
      Technology.find({})
        .then((result) => {
          res.json(result.map(mapNewsToNew));
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
    }).catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
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
const db = require('../models/db');
const strConverter = require('../../client/utils/stringConverter');
const geoConverter = require('../../client/utils/geoConverter');
const axios = require("axios");
// store whether user is snypee or snyppr in auth0 profile

exports.verifyHasProfile = (req, res) => {
  const accountType = req.body.accountType;
  delete req.body.accountType;
  const options = accountType === 'Snyppr'
  ? { include: [db.SnypprStripe, db.ProfilePic, {
    model: db.SnypprReview,
    include: [db.Snypee],
  }, {
    model: db.Transaction,
    include: [db.Snypee, db.SnypeeReview],
  }] }
    : { include: [{
      model: db.SnypeeReview,
      include: [db.Snyppr],
    },
    {
      model: db.Transaction,
      include: [db.Snyppr, db.SnypprReview],
    }, db.ProfilePic] };
  options.where = { id: req.body.id };
  db[accountType]
    .find(options)
    .then((data) => {
      res.json(data);
    })
    .catch(err => console.log('error finding profile', err));
};

exports.addProfile = (req, res) => {
  const str = strConverter(req.body.address);
  geoConverter(str)
    .then((location) => {
      req.body.lat = location.lat;
      req.body.lng = location.lng;
      const accountType = req.body.accountType;
      delete req.body.accountType;
      console.log(req.body, accountType);
      console.log('adding profile', req.body);
      db[accountType]
        .create(req.body)
        .then((data) => {
          res.send(data);
          // res.send('login');
        })
        .catch(err => console.log('error creating profile', err));
    })
    .catch((err) => {
      console.log('error during geoconversion, heres the error ', err);
    });
};


exports.updateCertified = (req, res) => {
  db.Snyppr.findOne({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    data.updateAttributes({
      certified: true,
    });
    res.status(200).send(data);
  }).catch((err) => {
    res.status(404).send(err);
  });

exports.addTumblr = (req, res) => {
  let tumblrHandle = req.params.tumblrHandle
  const config = {
        headers: {'Content-Type': 'application/json'
      }
    }
  axios.get("https://api.tumblr.com/v2/blog/" + tumblrHandle +  "/posts/photo?api_key=hMrH1EJuH5MnQpmQSUhlw1lZ9tAMNCPPLeW4YHyxRLPnKgfcQV", config)
    .then(function(photos){
      console.log('before success console')
      console.log(photos);
      console.log('after success console')
      res.send(photos.data.response.posts)
    })
    .catch(function(err){
      console.log("there was an error : ", err)
      res.send(err);
    })

};

const Url = require('./models');

exports.findUrl = function (shortUrlName) {
  return Url.findOne({shortName: Number(shortUrlName)});
};

exports.findOrCreateUrl = function findOrCreateUrl(urlName) {
  return findUrlByName(urlName)
    .then( data => {
      if (data) {
        return data;
      }
      return findLastUrl().then( data => {
        return createNewUrl(data, urlName);
      });
    });
};

function findUrlByName(urlName) {
  return Url.findOne({fullName: urlName});
}

function findLastUrl() {
  //this query is being flattened from data['0']
  return Url.find().limit(1).sort({$natural: -1})
    .then(data => data && data.length && data[0]);
}

function createNewUrl(data, urlName) {
  let shortName = data.shortName;
  if(data.fullName === urlName){
    return data;
  }
  if (shortName != undefined){
    shortName = Number(shortName);
  }
  if (shortName === undefined) { //for first entry
    shortName = 0;
    console.log('data doesnt exist therefore shortname = ' + shortName);
  } else { //for everything after first entry
    shortName++;
    console.log('data does exist shortname = ' + shortName);
  }
  const ourUrl = new Url({
    fullName: urlName,
    shortName: shortName
  });
  console.log('saving to database');
  return ourUrl.save();
}

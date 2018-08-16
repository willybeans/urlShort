const Url = require('./models');

module.exports = function findOrCreateUrl(urlName) {
  return findUrlByName(urlName)
    .then( data => {
      if (data) {
        console.log(data);
        return data;
      }
      return findLastUrl().then( data => {
        return createNewUrl(data, urlName);
      });
    });
};

function findUrlByName(urlName) {
  console.log('findurlbyname fired');
  return Url.findOne({fullName: urlName});
}

function findLastUrl() {
  console.log('findLAST fired');
  //this query is being flattened from data['0']
  return Url.find().limit(1).sort({$natural: -1})
    .then(data => data && data.length && data[0]);
}

function createNewUrl(data, urlName) {
  let shortName = data.shortName;
  if(data.fullName === urlName){
    console.log('this should never fire now');
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

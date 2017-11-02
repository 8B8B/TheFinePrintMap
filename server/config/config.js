//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri:'mongodb://akahn:a123456a@ds161194.mlab.com:61194/team8b'
  }, 
  googleMaps: {
    key: 'AIzaSyCzcplqLGgsRpnPIhCr_1MhVk2qsVNZwcY'
  },
  port: 8080
};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    email:    String,
    password: String,
    image:    String,
    //Accounts Information
    accounts: [{name:   String,
                total:  Number, 
                number: String
              }],
    //Tranfers
    movements:[{  from_account: String,
                  to_account:   String,
                  ammount:      Number,
                  description:  String,
                  date:         Date
                }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
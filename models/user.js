// user model decleration
// define use case
//import any required libraries
'use strict';
const bcrypt = require('bcrypt')
// declare user model format
module.exports = function(sequelize, DataTypes) {
    // define user object
    const user = sequelize.define('user', {
        // email
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid Email Address'
                }
            }
        },
        // name
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 an d 99 characters'
                }
            }
        },
        // password
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check character number.'
                }
            }
        }
    }, { // hook 
        hooks: {
            // before new record
            beforeCreate: function(createdUser, options) {
                if(createdUser && createdUser.password) {
                     // hash password
                    let hash = bcrypt.hashSync(createdUser.password, 12)
                    // return hashed password for new record
                    createdUser.password = hash;
                }
            }
        }
    });
    // user associations
    user.associate = function(models) {
        // TODO: any user associations you want
    }
    // validPassword definition to validate password at user login
    user.prototype.validPassword = function(passwordTyped)    {
        return bycrypt.compareSync(passwordTyped, this.password);
    }

    // remove password before any serialization of User object
    user.prototype.toJson = function() {
        delete userData.password;
        return userData;
    }
    return user;
};


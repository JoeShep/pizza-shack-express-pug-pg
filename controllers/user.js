'use strict'

const User = require('../models/user')

module.exports.new = (req, res) => {
  console.log("rendering new register page")
  res.render('register')
};
                         // Remember nested destructuring?   
module.exports.create = ({ body: { email, password, confirmation } }, res, err) => {
  console.log("create user called")
  User.forge({email, password})
  .save()
  .then( (model) => {
    console.log(model); // logs hashed and salted password!
    res.redirect('/');
  });
}

// module.exports.create = ({ body: { email, password, confirmation } }, res, err) => {
//   if (password === confirmation) {
//     User.findOneByEmail(email)
//       .then(user => {
//         if (user) {
//           return res.render('register', { msg: 'Email is already registered' })
//         }

//         return User.create({ email, password })
//       })
//       .then(() => res.redirect('/login'))
//       .catch(err)
//   } else {
//     res.render('register', { msg: 'Password & password confirmation do not match' })
//   }
// }

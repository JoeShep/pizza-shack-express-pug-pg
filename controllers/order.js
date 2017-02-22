'use strict'

const Order = require('../models/order');
const { knex } = require('../db/database');
const Size = () => knex('sizes');
const Topping = () => knex('toppings');

// Leave as-is or make into static methods on model?
const getToppings = () => 
  Topping().select()
  .then( (rows) => {
    return rows
  })
  .catch( (error) => {
    throw error
  });

const getSizes = () =>
  Size().select()
  .then( (rows) => {
    return rows
  })
  .catch( (error) => {
    throw error
  });
// ****************************************************

module.exports.new = (req, res, err) =>
  Promise
    .all([getToppings(), getSizes()])
    .then(([toppings, sizes]) =>
      res.render('order', { page: 'Order', sizes, toppings})
    ).catch(err)

module.exports.create = ({ body }, res, err) => {
  console.log("body", body );
  Order.forge(body)
    .save()
    .then((orderObj) => res.redirect('/'))

    // Throws Error: Can't set headers after they are sent.

    // If it errors, redraw the page and add errors
    // .catch(({ errors }) =>
    //   Promise.all([ // retrieve sizes and toppings again,
    //     Promise.resolve(errors), // but pass the errors along as well
    //     getSizes(),
    //     getToppings()
    //   ])
    // )
    // .then(([errors, sizes, toppings]) =>
    //   // UI/UX additions
    //   // send errors to renderer to change styling and add error messages
    //   // also, send the req.body to use as initial form input values so
    //   // user can resubmit withour filling the damn thing out again
    //   res.render('order', { page: 'Order', sizes, toppings, errors, body })
    // )
    // .catch(err)
}

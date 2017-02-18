'use strict'

const Order = require('../models/order');
const { knex } = require('../db/database');
const Size = () => knex('sizes');
const Topping = () => knex('toppings')

module.exports.new = (req, res, err) =>
  Promise
    .all([
      // select defaults to * if no parameters passed in
      Size().select()
      .then( (rows) => {
        return rows
      })
      .catch( (error) => {
        throw error
      }),
      Topping().select()
      .then( (rows) => {
        return rows
      })
      .catch( (error) => {
        throw error
      })
    ])
    .then(([sizes, toppings]) =>
      res.render('order', { page: 'Order', sizes, toppings})
    )
    .catch(err)

module.exports.create = ({ body }, res, err) =>
  Order.forge(body)
    .save()
    .then((orderObj) => res.redirect('/'))
    // If it errors, redraw the page and add errors
    .catch(({ errors }) =>
      Promise.all([ // retrieve sizes and toppings again,
        Promise.resolve(errors), // but pass the errors along as well
        Size().select()
        .then( (rows) => {
          return rows
        })
        .catch( (error) => {
          throw error
        }),
        Topping().select()
        .then( (rows) => {
          return rows
        })
        .catch( (error) => {
          throw error
        })
      ])
    )
    .then(([errors, sizes, toppings]) =>
      // UI/UX additions
      // send errors to renderer to change styling and add error messages
      // also, send the req.body to use as initial form input values so
      // user can resubmit withour filling the damn thing out again
      res.render('order', { page: 'Order', sizes, toppings, errors, body })
    )
    .catch(err)

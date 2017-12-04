const fs = require('fs')

const AsanaModel = require('../models/asana-model')

async function findAll() {
    return AsanaModel.find().populate('yogaset')
}

async function add(asana) {
    return AsanaModel.create(asana)
}

async function del(id) {
    return AsanaModel.remove({ id })
}

async function find(id) {
    return AsanaModel.findOne({ id }).populate('yogaset')
}

module.exports = {
    findAll,
    find,
    add,
    del
}

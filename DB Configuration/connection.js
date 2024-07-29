
const mongoose = require("mongoose");

async function connection(url) {
    const connect = await mongoose.connect(url)

    return connect;
}

module.exports = { connection }
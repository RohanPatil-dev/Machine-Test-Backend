
async function authorization(req, res, next) {
    const headers = req.headers["authorization"];

    if (headers === undefined) {
        return res.send("Invalid token !")
    } else {
        const bearer = headers.split(" ");
        const token = bearer[1];

        req.token = token;
    }
    next()
}

module.exports = {authorization}
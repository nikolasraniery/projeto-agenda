exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = "Esta e uma variavel local";
    next();
}

exports.outroMiddleware = (req, res, next) => {
    console.log("Outro middleware");
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code == "EBADCSRFTOKEN") {
        return res.render("404");
    }
    next();
}

exports.checkCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}
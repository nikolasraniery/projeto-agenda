exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    next();
}

exports.outroMiddleware = (req, res, next) => {
    console.log("Outro middleware");
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render("404");
    }
    next();
}

exports.checkCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash("errors", "Faça login para continuar");
        req.session.save(() => res.redirect("/"));
        return;
    }
    next();
}
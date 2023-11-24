function handleSession() {
    return (req, res, next) => {
        if (req.session.userId) {
            res.locals.session = req.session;
        }
        next();
    };
};

module.exports =  handleSession;
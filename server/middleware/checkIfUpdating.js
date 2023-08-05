const checkIfUpdating = async (req, res, next) => {
    if (req.app.locals.isUpdating) {
        res.status(503).json({ 'description': "Service is currently unavailable due to ongoing fetch." });
    }
    else{
        next();
    }
}

export default checkIfUpdating;
import jwt from "jsonwebtoken";
//unused for now - don't need authorization logic for now
const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if (!token) {
            res.status(403).send("Access Denied");
        }
        if (!token.startsWith("Bearer ")){
            res.status(422).send("Was unable to process the token");
        }
        else{
            token = token.slice(7, token.length).trimLeft();
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        }

    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}

export default verifyToken;
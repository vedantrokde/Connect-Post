const jwt = require("jsonwebtoken");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

exports.upload = multer({ storage: storage });

exports.requireSignin = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ").length === 2
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(401).json({ message: "Invalid token. Retry!" });
      if (user) {
        req.user = user;
        next();
      }
    });
  } else return res.status(401).json({ message: "Authorization required!" });
};

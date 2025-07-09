import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  console.log("Headers received:", req.headers);

  const authHeader = req.headers.authorization;
  console.log("🔐 AUTH HEADER:", authHeader); 
  console.log("🚨 JWT_SECRET =", process.env.JWT_SECRET);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Passed token check, calling next()");
    next();
  } catch (err) {
    console.log("❌ JWT verification failed:", err.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default auth;
module.exports = function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ error: "No basic auth" });
  }

  const base64 = authHeader.split(" ")[1];
  const [user, pass] = Buffer.from(base64, "base64").toString().split(":");

  if (user !== process.env.BASIC_USER || pass !== process.env.BASIC_PASS) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  next();
};

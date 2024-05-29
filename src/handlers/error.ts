export const customErrorHandler = (err, req, res, next) => {
  if (err.type === "Auth") {
    res
      .status(401)
      .json({ message: "Authorization error. Check your request body." });
  } else if (err.type === "Database") {
    res.status(501).json({ message: "Database connection error." });
  } else {
    console.error(err);
    res.status(500).json({
      message: "Internal server error. Please contact us for support",
    });
  }
};

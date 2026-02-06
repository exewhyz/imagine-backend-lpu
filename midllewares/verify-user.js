export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.Authorization;
  if (!authHeader || !authHeader.includes("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Please login again",
    });
  }

  // const str = "Bearer token"

  // str.split(" ") //["Bearer", "token"]

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login again",
    });
  }
//   req.userId = 

};

// import jwt from "jsonwebtoken";

// //admin authentication middleware

// const authAdmin = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers;
//     if (!atoken) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }

//     const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

//     if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }

//     next();
//   } catch (error) {
//     console.log("error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authAdmin;
import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    // ✅ FIX 1: correct header name
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    // ✅ decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX 2: check role instead of weird comparison
    if (decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log("error:", error);
    return res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authAdmin;
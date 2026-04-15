// // // import express from "express";
// // // import validator from "validator";
// // // import bcrypt from "bcrypt";
// // // import userModel from "../models/userModel.js";
// // // import jwt from "jsonwebtoken";
// // // import { v2 as cloudinary } from "cloudinary";
// // // import doctorModel from "../models/doctorModel.js";
// // // import appointmentModel from "../models/appointmentModel.js";
// // // import razorpay from "razorpay";
// // // // API for register user

// // // const registerUser = async (req, res) => {
// // //   try {
// // //     const { name, email, password } = req.body;
// // //     if (!name || !email || !password) {
// // //       return res.json({ success: false, message: "Missing Detail" });
// // //     }

// // //     //validating email format
// // //     if (!validator.isEmail(email)) {
// // //       return res.json({ success: false, message: "Enter a valid email" });
// // //     }

// // //     //validating strong password
// // //     if (password.length < 8) {
// // //       return res.json({ success: false, message: "Enter a strong password" });
// // //     }

// // //     //check user existed
// // //     const existedUser = await userModel.findOne({ email });

// // //     if (existedUser) {
// // //       return res.status(409).json({
// // //         success: false,
// // //         message: "User with email already exists",
// // //       });
// // //     }

// // //     //hashing the password
// // //     const salt = await bcrypt.genSalt(10);
// // //     const hashedPassword = await bcrypt.hash(password, salt);

// // //     const userData = {
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //     };

// // //     const newUser = new userModel(userData);

// // //     const user = await newUser.save();

// // //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// // //     res.json({ success: true, token });
// // //   } catch (error) {
// // //     console.log("error:", error);

// // //     return res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // //api for user login

// // // const loginUser = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     const user = await userModel.findOne({ email });

// // //     //check user exist
// // //     if (!user) {
// // //       return res.json({ success: false, message: "User does not exist" });
// // //     }

// // //     //check for password
// // //     const isMatch = await bcrypt.compare(password, user.password);

// // //     if (isMatch) {
// // //       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
// // //       return res.json({ success: true, token });
// // //     } else {
// // //       return res.json({ success: false, message: "Invalid credentials" });
// // //     }
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // //API to get user profile data

// // // const getProfile = async (req, res) => {
// // //   try {
// // //     const { userId } = req.body;

// // //     const userData = await userModel.findById(userId).select("-password");

// // //     res.json({ success: true, userData });
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // //API to update user profile

// // // const updateProfile = async (req, res) => {
// // //   try {
// // //     const { userId, name, phone, address, dob, gender } = req.body;

// // //     const imageFile = req.file;

// // //     if (!name || !phone || !dob || !gender) {
// // //       return res.json({ success: false, message: "Data missing" });
// // //     }

// // //     await userModel.findByIdAndUpdate(userId, {
// // //       name,
// // //       phone,
// // //       address: JSON.parse(address),
// // //       dob,
// // //       gender,
// // //     });

// // //     if (imageFile) {
// // //       // upload image to cloudinary
// // //       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
// // //         resource_type: "image",
// // //       });

// // //       const imageURL = imageUpload.secure_url;

// // //       await userModel.findByIdAndUpdate(userId, { image: imageURL });
// // //     }

// // //     res.json({ success: true, message: "Profile Updated" });
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // //API to book appointment

// // // const bookAppointment = async (req, res) => {
// // //   try {
// // //     const { userId, docId, slotDate, slotTime } = req.body;
// // //     const docData = await doctorModel.findById(docId).select("-password");

// // //     if (!docData.available) {
// // //       return res.json({ success: false, message: "Doctor is not availble " });
// // //     }

// // //     let slots_booked = docData.slots_booked;

// // //     //checking for slot availablity
// // //     if (slots_booked[slotDate]) {
// // //       if (slots_booked[slotDate].includes(slotTime)) {
// // //         return res.json({
// // //           success: false,
// // //           message: "Slot not availble ",
// // //         });
// // //       } else {
// // //         slots_booked[slotDate].push(slotTime);
// // //       }
// // //     } else {
// // //       slots_booked[slotDate] = [];
// // //       slots_booked[slotDate].push(slotTime);
// // //     }

// // //     const userData = await userModel.findById(userId).select("-password");

// // //     delete docData.slots_booked;

// // //     const appointmentData = {
// // //       userId,
// // //       docId,
// // //       userData,
// // //       docData,
// // //       amount: docData.fees,
// // //       slotTime,
// // //       slotDate,
// // //       date: Date.now(),
// // //     };

// // //     const newAppointment = new appointmentModel(appointmentData);
// // //     await newAppointment.save();

// // //     //save new slots data in docdata

// // //     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

// // //     res.json({ success: true, message: "Appointment Booked" });
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // //API to get user appointments for backend my-appointments page

// // // const listAppointment = async (req, res) => {
// // //   try {
// // //     const { userId } = req.body;
// // //     const appointments = await appointmentModel.find({ userId });

// // //     if (!appointments) {
// // //       return res.json({ success: false, message: "No Appointment" });
// // //     }

// // //     res.json({ success: true, appointments });
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // // API to cancel appointment
// // // const cancelAppointment = async (req, res) => {
// // //   try {
// // //     const { userId, appointmentId } = req.body;
// // //     const appointmentData = await appointmentModel.findById(appointmentId);

// // //     if (appointmentData.userId !== userId) {
// // //       return res.json({ success: false, message: "Unauthorized action" });
// // //     }

// // //     await appointmentModel.findByIdAndUpdate(appointmentId, {
// // //       cancelled: true,
// // //     });

// // //     // releaseing doctor slot
// // //     const { docId, slotDate, slotTime } = appointmentData;

// // //     const doctorData = await doctorModel.findById(docId);

// // //     let slots_booked = doctorData.slots_booked;
// // //     slots_booked[slotDate] = slots_booked[slotDate].filter(
// // //       (e) => e !== slotTime
// // //     );

// // //     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

// // //     res.json({ success: true, message: "Appointment Cancelled" });
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // // API for make payment of appointment using razorpay
// // // const razorpayInstance = new razorpay({
// // //   key_id: process.env.RAZORPAY_KEY_ID,
// // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // });

// // // const paymentRazorpay = async (req, res) => {
// // //   try {
// // //     const { appointmentId } = req.body;

// // //     const appointmentData = await appointmentModel.findById(appointmentId);

// // //     if (!appointmentData) {
// // //       return res.json({
// // //         success: false,
// // //         message: "Appointment cancelled or not found",
// // //       });
// // //     }

// // //     // creating options for razorpay payment

// // //     const options = {
// // //       amount: appointmentData.amount * 100,
// // //       currency: process.env.CURRENCY,
// // //       receipt: appointmentId,
// // //     };

// // //     //creating of an order
// // //     const order = await razorpayInstance.orders.create(options);

// // //     res.json({ success: true, order });
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // // API to verify payment
// // // const verifyRazorpay = async (req, res) => {
// // //   try {
// // //     const { razorpay_order_id } = req.body;
// // //     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

// // //     if (orderInfo.status === "paid") {
// // //       await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
// // //         payment: true,
// // //       });

// // //       res.json({ success: true, message: "Payment successfull" });
// // //     } else {
// // //       res.json({ success: false, message: "Payment failed" });
// // //     }
// // //   } catch (error) {
// // //     console.log("error:", error);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };
// // // export {
// // //   registerUser,
// // //   loginUser,
// // //   getProfile,
// // //   updateProfile,
// // //   bookAppointment,
// // //   listAppointment,
// // //   cancelAppointment,
// // //   paymentRazorpay,
// // //   verifyRazorpay,
// // // };

// // import express from "express";
// // import validator from "validator";
// // import bcrypt from "bcrypt";
// // import userModel from "../models/userModel.js";
// // import jwt from "jsonwebtoken";
// // import { v2 as cloudinary } from "cloudinary";
// // import doctorModel from "../models/doctorModel.js";
// // import appointmentModel from "../models/appointmentModel.js";
// // import Razorpay from "razorpay";

// // // ================= REGISTER =================
// // const registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password) {
// //       return res.json({ success: false, message: "Missing Detail" });
// //     }

// //     if (!validator.isEmail(email)) {
// //       return res.json({ success: false, message: "Enter a valid email" });
// //     }

// //     if (password.length < 8) {
// //       return res.json({ success: false, message: "Enter a strong password" });
// //     }

// //     const existedUser = await userModel.findOne({ email });
// //     if (existedUser) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "User already exists",
// //       });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     const user = await new userModel({
// //       name,
// //       email,
// //       password: hashedPassword,
// //     }).save();

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// //     res.json({ success: true, token });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= LOGIN =================
// // const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await userModel.findOne({ email });
// //     if (!user) {
// //       return res.json({ success: false, message: "User does not exist" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.json({ success: false, message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// //     res.json({ success: true, token });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= PROFILE =================
// // const getProfile = async (req, res) => {
// //   try {
// //     const { userId } = req.body;

// //     const userData = await userModel.findById(userId).select("-password");

// //     res.json({ success: true, userData });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= UPDATE PROFILE =================
// // const updateProfile = async (req, res) => {
// //   try {
// //     const { userId, name, phone, address, dob, gender } = req.body;
// //     const imageFile = req.file;

// //     if (!name || !phone || !dob || !gender) {
// //       return res.json({ success: false, message: "Data missing" });
// //     }

// //     await userModel.findByIdAndUpdate(userId, {
// //       name,
// //       phone,
// //       address: JSON.parse(address),
// //       dob,
// //       gender,
// //     });

// //     if (imageFile) {
// //       const imageUpload = await cloudinary.uploader.upload(imageFile.path);
// //       await userModel.findByIdAndUpdate(userId, {
// //         image: imageUpload.secure_url,
// //       });
// //     }

// //     res.json({ success: true, message: "Profile Updated" });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= BOOK APPOINTMENT =================
// // const bookAppointment = async (req, res) => {
// //   try {
// //     const { userId, docId, slotDate, slotTime } = req.body;

// //     const docData = await doctorModel.findById(docId).select("-password");

// //     if (!docData.available) {
// //       return res.json({ success: false, message: "Doctor not available" });
// //     }

// //     let slots_booked = docData.slots_booked;

// //     if (slots_booked[slotDate]?.includes(slotTime)) {
// //       return res.json({ success: false, message: "Slot not available" });
// //     }

// //     slots_booked[slotDate] = slots_booked[slotDate] || [];
// //     slots_booked[slotDate].push(slotTime);

// //     const userData = await userModel.findById(userId).select("-password");

// //     const appointment = await new appointmentModel({
// //       userId,
// //       docId,
// //       userData,
// //       docData,
// //       amount: docData.fees,
// //       slotTime,
// //       slotDate,
// //       date: Date.now(),
// //     }).save();

// //     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

// //     res.json({ success: true, message: "Appointment Booked", appointment });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= LIST APPOINTMENTS =================
// // const listAppointment = async (req, res) => {
// //   try {
// //     const { userId } = req.body;

// //     const appointments = await appointmentModel.find({ userId });

// //     res.json({ success: true, appointments });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= CANCEL =================
// // const cancelAppointment = async (req, res) => {
// //   try {
// //     const { userId, appointmentId } = req.body;

// //     const appointment = await appointmentModel.findById(appointmentId);

// //     if (appointment.userId !== userId) {
// //       return res.json({ success: false, message: "Unauthorized" });
// //     }

// //     await appointmentModel.findByIdAndUpdate(appointmentId, {
// //       cancelled: true,
// //     });

// //     const doctor = await doctorModel.findById(appointment.docId);

// //     doctor.slots_booked[appointment.slotDate] =
// //       doctor.slots_booked[appointment.slotDate].filter(
// //         (e) => e !== appointment.slotTime
// //       );

// //     await doctor.save();

// //     res.json({ success: true, message: "Cancelled" });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= RAZORPAY SETUP =================
// // let razorpayInstance;

// // if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
// //   razorpayInstance = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY_ID,
// //     key_secret: process.env.RAZORPAY_KEY_SECRET,
// //   });
// // } else {
// //   console.log("⚠️ Razorpay not configured");
// // }

// // // ================= PAYMENT =================
// // const paymentRazorpay = async (req, res) => {
// //   try {
// //     if (!razorpayInstance) {
// //       return res.json({
// //         success: false,
// //         message: "Payment not configured",
// //       });
// //     }

// //     const { appointmentId } = req.body;

// //     const appointment = await appointmentModel.findById(appointmentId);

// //     const options = {
// //       amount: appointment.amount * 100,
// //       currency: "INR",
// //       receipt: appointmentId,
// //     };

// //     const order = await razorpayInstance.orders.create(options);

// //     res.json({ success: true, order });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= VERIFY PAYMENT =================
// // const verifyRazorpay = async (req, res) => {
// //   try {
// //     const { razorpay_order_id } = req.body;

// //     const order = await razorpayInstance.orders.fetch(razorpay_order_id);

// //     if (order.status === "paid") {
// //       await appointmentModel.findByIdAndUpdate(order.receipt, {
// //         payment: true,
// //       });

// //       res.json({ success: true, message: "Payment successful" });
// //     } else {
// //       res.json({ success: false, message: "Payment failed" });
// //     }
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= EXPORT =================
// // export {
// //   registerUser,
// //   loginUser,
// //   getProfile,
// //   updateProfile,
// //   bookAppointment,
// //   listAppointment,
// //   cancelAppointment,
// //   paymentRazorpay,
// //   verifyRazorpay,
// // };

// import express from "express";
// import validator from "validator";
// import bcrypt from "bcrypt";
// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import appointmentModel from "../models/appointmentModel.js";
// import Razorpay from "razorpay";

// // ================= RAZORPAY SETUP (FIXED) =================
// const getRazorpayInstance = () => {
//   if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//     console.log("❌ Razorpay keys missing");
//     return null;
//   }

//   return new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });
// };

// // ================= REGISTER =================
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success: false, message: "Missing Detail" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Enter a valid email" });
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Enter a strong password" });
//     }

//     const existedUser = await userModel.findOne({ email });
//     if (existedUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     }).save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//     res.json({ success: true, token });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= LOGIN =================
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//     res.json({ success: true, token });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= PROFILE =================
// const getProfile = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const userData = await userModel.findById(userId).select("-password");
//     res.json({ success: true, userData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= UPDATE PROFILE =================
// const updateProfile = async (req, res) => {
//   try {
//     const { userId, name, phone, address, dob, gender } = req.body;
//     const imageFile = req.file;

//     if (!name || !phone || !dob || !gender) {
//       return res.json({ success: false, message: "Data missing" });
//     }

//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       address: JSON.parse(address),
//       dob,
//       gender,
//     });

//     if (imageFile) {
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path);
//       await userModel.findByIdAndUpdate(userId, {
//         image: imageUpload.secure_url,
//       });
//     }

//     res.json({ success: true, message: "Profile Updated" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// // ================= BOOK APPOINTMENT =================
// const bookAppointment = async (req, res) => {
//   try {
//     const { userId, docId, slotDate, slotTime } = req.body;

//     const docData = await doctorModel.findById(docId).select("-password");

//     if (!docData.available) {
//       return res.json({ success: false, message: "Doctor not available" });
//     }

//     let slots_booked = docData.slots_booked;

//     if (slots_booked[slotDate]?.includes(slotTime)) {
//       return res.json({ success: false, message: "Slot not available" });
//     }

//     slots_booked[slotDate] = slots_booked[slotDate] || [];
//     slots_booked[slotDate].push(slotTime);

//     const userData = await userModel.findById(userId).select("-password");

//     const appointment = await new appointmentModel({
//       userId,
//       docId,
//       userData,
//       docData,
//       amount: docData.fees,
//       slotTime,
//       slotDate,
//       date: Date.now(),
//     }).save();

//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//     res.json({ success: true, message: "Appointment Booked", appointment });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= LIST APPOINTMENTS =================
// const listAppointment = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const appointments = await appointmentModel.find({ userId });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= CANCEL =================
// const cancelAppointment = async (req, res) => {
//   try {
//     const { userId, appointmentId } = req.body;

//     const appointment = await appointmentModel.findById(appointmentId);

//     if (!appointment) {
//       return res.json({ success: false, message: "Appointment not found" });
//     }

//     if (appointment.userId.toString() !== userId) {
//       return res.json({ success: false, message: "Unauthorized" });
//     }

//     await appointmentModel.findByIdAndUpdate(appointmentId, {
//       cancelled: true,
//     });

//     const doctor = await doctorModel.findById(appointment.docId);

//     if (doctor?.slots_booked?.[appointment.slotDate]) {
//       doctor.slots_booked[appointment.slotDate] =
//         doctor.slots_booked[appointment.slotDate].filter(
//           (e) => e !== appointment.slotTime
//         );
//     }

//     await doctor.save();

//     res.json({ success: true, message: "Appointment Cancelled" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };



// // ================= PAYMENT =================
// const paymentRazorpay = async (req, res) => {
//   try {
//     const razorpayInstance = getRazorpayInstance();

//     if (!razorpayInstance) {
//       return res.json({
//         success: false,
//         message: "Payment not configured",
//       });
//     }

//     const { appointmentId } = req.body;
//     const appointment = await appointmentModel.findById(appointmentId);

//     const options = {
//       amount: appointment.amount * 100,
//       currency: "INR",
//       receipt: appointmentId,
//     };

//     const order = await razorpayInstance.orders.create(options);

//     res.json({ success: true, order });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= VERIFY =================
// const verifyRazorpay = async (req, res) => {
//   try {
//     const razorpayInstance = getRazorpayInstance();

//     const { razorpay_order_id } = req.body;

//     const order = await razorpayInstance.orders.fetch(razorpay_order_id);

//     if (order.status === "paid") {
//       await appointmentModel.findByIdAndUpdate(order.receipt, {
//         payment: true,
//       });

//       res.json({ success: true, message: "Payment successful" });
//     } else {
//       res.json({ success: false, message: "Payment failed" });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ================= EXPORT =================
// export {
//   registerUser,
//   loginUser,
//   getProfile,
//   updateProfile,      // ✅ now exists
//   bookAppointment,
//   listAppointment,
//   cancelAppointment,
//   paymentRazorpay,
//   verifyRazorpay,
// };

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";

// ================= RAZORPAY INSTANCE =================
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.log("❌ Razorpay keys missing");
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Detail" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Missing data" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      await userModel.findByIdAndUpdate(userId, {
        image: upload.secure_url,
      });
    }

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= BOOK APPOINTMENT =================
export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const doc = await doctorModel.findById(docId);

    if (!doc.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots = doc.slots_booked;

    if (slots[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    slots[slotDate] = slots[slotDate] || [];
    slots[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");

    const appointment = await new appointmentModel({
      userId,
      docId,
      userData,
      docData: doc,
      amount: doc.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    }).save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slots });

    res.json({ success: true, appointment });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LIST =================
export const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const data = await appointmentModel.find({ userId });

    res.json({ success: true, appointments: data });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= CANCEL =================
export const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Not found" });
    }

    if (appointment.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const doctor = await doctorModel.findById(appointment.docId);

    if (doctor.slots_booked[appointment.slotDate]) {
      doctor.slots_booked[appointment.slotDate] =
        doctor.slots_booked[appointment.slotDate].filter(
          (e) => e !== appointment.slotTime
        );
    }

    await doctor.save();

    res.json({ success: true, message: "Cancelled" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= PAYMENT =================
export const paymentRazorpay = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();

    if (!razorpay) {
      return res.json({ success: false, message: "Payment not configured" });
    }

    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const order = await razorpay.orders.create({
      amount: Number(appointment.amount) * 100,
      currency: "INR",
      receipt: appointmentId.toString(),
    });

    res.json({ success: true, order });

  } catch (error) {
    console.log("RAZORPAY ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ================= VERIFY =================
export const verifyRazorpay = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();

    const { razorpay_order_id } = req.body;

    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (order.status === "paid") {
      await appointmentModel.findByIdAndUpdate(order.receipt, {
        payment: true,
      });

      res.json({ success: true, message: "Payment successful" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
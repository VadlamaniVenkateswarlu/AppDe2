// let mongoose = require("mongoose");
// let express = require("express");
// let cors = require("cors");
// let multer =require("multer");




// const storage = multer.diskStorage({
//     destination:  (req, file, cb)=> {
//       cb(null, 'profilePic');
//     },
//     filename:  (req, file, cb)=> {
//      console.log(file);
//       cb(null,`${Date.now()}_${file.originalname}`)
//     },
//   })
  
//   const upload = multer({ storage: storage })
  

// let app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());

// app.post("/signUp",upload.single("profilePic"), async(req,res)=>{

//     console.log(req.files);
//     try{
//         let signedUpUser = new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             age: req.body.age,
//             email: req.body.email,
//             password: req.body.password,
//             phoneNumber: req.body.phoneNumber,
//             gender: req.body.gender,
//             profilePic:req.body.profilePic,
//             country: req.body.country,
//         });
    
//         await signedUpUser.save();
//         res.json({status: "Success",msg:"Successfully Signup Your Account."});

//     }catch(err){

//         res.json({status: "Unable Your Account",msg:"Unable To Your Account."});

//     }


    


// })

// let userSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     age: Number,
//     email: String,
//     password: String,
//     phoneNumber: String,
//     gender: String,
//     profilePic: String,
//     country: String,
// });

// let User = mongoose.model("User", userSchema, "User");
// app.listen(2727, () => {
//     console.log("Server running on port 2727");
// });


// let connectToMDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://venkateshwarluvadlamani233:venky207@cluster0.xmqckkr.mongodb.net/employeeDetails?retryWrites=true&w=majority&appName=Cluster0");
//         console.log("Successfully connected to MongoDB");
//     } catch (err) {
//         console.error("Unable to connect to MongoDB:", err);
//     }
// };

// connectToMDB();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 2727;

// ✅ Ensure profilePic folder exists
const uploadDir = path.join(__dirname, "profilePic");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// ✅ Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve React static build (only for production)
app.use(express.static(path.join(__dirname, "client", "build")));

// ✅ Mongoose Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    phoneNumber: String,
    gender: String,
    profilePic: String,
    country: String,
});
const User = mongoose.model("User", userSchema, "User");

// ✅ SignUp Route
app.post("/signUp", upload.single("profilePic"), async (req, res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            profilePic: req.file.filename,
            country: req.body.country,
        });
        await newUser.save();
        res.json({ status: "Success", msg: "Successfully Signed Up" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", msg: "Failed to Sign Up" });
    }
});

// ✅ Catch-all route for React frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToMDB();
});

// ✅ Connect to MongoDB
const connectToMDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://venkateshwarluvadlamani233:venky207@cluster0.xmqckkr.mongodb.net/employeeDetails?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
};

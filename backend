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

let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");
let fs = require("fs");

if (!fs.existsSync("profilePic")) {
    fs.mkdirSync("profilePic");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profilePic');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userSchema = mongoose.Schema({
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

let User = mongoose.model("User", userSchema, "User");

app.post("/signUp", upload.single("profilePic"), async (req, res) => {
    console.log(req.file); // ✅ log uploaded file

    try {
        let signedUpUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            profilePic: req.file.filename, // ✅ save uploaded file name
            country: req.body.country,
        });

        await signedUpUser.save();
        res.json({ status: "Success", msg: "Successfully Signed Up" });
    } catch (err) {
        console.error(err);
        res.json({ status: "Error", msg: "Failed to Sign Up" });
    }
});

app.listen(2727, () => {
    console.log("Server running on port 2727");
});

let connectToMDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://venkateshwarluvadlamani233:venky207@cluster0.xmqckkr.mongodb.net/employeeDetails?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
};

connectToMDB();

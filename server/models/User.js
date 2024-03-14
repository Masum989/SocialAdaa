import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(  
 {
   firstName:{
    type: String,
    required: true,
    min:2,
    max:50
   },
   lastName:{
    type: String,
    required: true,
    min:2,
    max:50,
   },
   email:{
    type: String,
    required: true,
    max:50,
    unique: true
   },
   password:{
    type: String,
    required: true,
    min:5
   },
   picturePath:{
    type: String,
    defualt: "",
   },
   friends:{
    type: Array,
    defualt: []
   },
   location: String,
    occupation: String,
    viewedProfile : Number,
    impressions: Number
   
 },
 {timestamps: true}  // it will give the dates automatically like when created or whatever
)

const User = mongoose.model("User",UserSchema);  // first we will create the shcema then pass here to mongosse
export default User;
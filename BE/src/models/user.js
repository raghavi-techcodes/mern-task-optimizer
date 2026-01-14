import mongoose from "./index.js"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },

    mobile: {
        type: Number,
        required: false,
    },
     work: {
         type: String,
        
       trim: true
    },
    role:{
        type:String,
        default:'user'
    },
    add:{
        type:String,
        
    },
       status: {
            type: String,
            required:[false,"Status is Required"],
            enum: ['Active' , 'InActive'],
            default: 'Active',
           
        },
    
    desc: {
        type: String,
        required: false,
    },
    owner_id: {
        type: String,
    },
    datecreated:Date,
    dateUpdated:Date
},{
    collection:'users',
    versionKey:false,
    timestamps:true
})
const userModel = mongoose.model('users',userSchema)

export default userModel
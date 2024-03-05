import mongoose  from "mongoose";


const convsersationSchema=new mongoose.Schema({

    participants :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],

    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ]
},{timestamps:true});

const Conversation = mongoose.model("Conversation",convsersationSchema);

export default Conversation;
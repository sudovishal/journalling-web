const mongoose =  require('mongoose')

const journalSchema = new mongoose.Schema ({
    title : {
        type : String,
        required : true
    },
    summary : {
        type : String,
    },
    markdown : {
        type : String,
        required: true
    },
    createdAt : {
      type : Date,
      default : Date.now()
},
    updatedAt :  {
        type : Date,
        default : Date.now()
},
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
}
},{timestamps : true});
const Journal = mongoose.model('Journal', journalSchema)
module.exports = Journal;
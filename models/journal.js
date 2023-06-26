const mongoose =  require('mongoose')
const slugify = require('slugify')
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
    slug : {
    type : String,
    required : true,
    unique : true
},
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
}
},{timestamps : true});

journalSchema.pre('validate',function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
      }
      next();
})
const Journal = mongoose.model('Journal', journalSchema)
module.exports = Journal;
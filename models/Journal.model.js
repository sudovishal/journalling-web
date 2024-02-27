import slugify from 'slugify'
import mongoose from 'mongoose'

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
    isPublic : {
        type: Boolean,
        default: false
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
      
      journalSchema.pre('findOneAndUpdate', async function (next) {
        try {
          const update = this.getUpdate();
          if (update.title) {
            const slug = slugify(update.title, { lower: true, strict: true });
            this._update.slug = slug;
        }
        next();
        } catch (error) {
          next(error);
        }
      });
      next();  
})
const Journal = mongoose.model('Journal', journalSchema)
export default Journal;
// export default Journal = mongoose.model('Journal', journalSchema)
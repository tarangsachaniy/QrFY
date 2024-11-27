// models/Url.js
import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  count : {
    type : String,
    default : 0
  },
  slug : {
    type : String,
    unique : true,
    lowercase : true,
    trim : true,
    index : true,
    sparse : true,
    default : function() {
      return this.text.toLowerCase().replace(/\s+/g, '-');
    }
  }
});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);

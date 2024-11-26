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
  }
});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);

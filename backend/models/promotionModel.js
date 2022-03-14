import mongoose from 'mongoose';



const promotionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
   
    code: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;
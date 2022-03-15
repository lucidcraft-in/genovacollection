import mongoose from 'mongoose';

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },

    category: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
      // ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;

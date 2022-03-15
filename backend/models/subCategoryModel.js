import mongoose from 'mongoose'

const subCategorySchema = mongoose.Schema({
    subCategoryName: { type: String, required: true },
    title: { type: String },
    categoryId:{type:String},
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
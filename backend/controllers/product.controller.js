import Product from "../models/product.model.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        console.log("Error in fetching products", error.meessage);
        res.status(500).json({ success: false, message : "Server error"});
    }
}


export const createProduct = async (req, res) => {
    const product = req.body;

if(!product.name || !product.price || !product.image) {
    return res.status(400).json({error: "Please add all the fields"});
}
const newProduct = new Product(product);

try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct});
} catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, message : "Server error"});
}
}


export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, error: "Invalid product ID"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ success: false, message : "Server error"});
    }
}


export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ success: false, message : "Server error"});
    } 
}
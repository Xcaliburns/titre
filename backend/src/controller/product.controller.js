const { findAll, findOne, addOne ,updateOne,deleteOne} = require("../model/product.model.js");

const getAll = async(req,res, next)=>{
    try{ 
        const products = await findAll();
        
        res.send(products);
    } catch(e){
        next(e);
    }

};

const getOne = async(req,res,next) =>{
    
    try{
        const productId= parseInt(req.params.id);

        if (isNaN(productId)) throw new Error();

        const [product] = await findOne(productId);
        res.send(product);
    }catch(e){
        next(e);
    }
};



const createOne = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await addOne(product);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const editOne = async (req, res) => {
  try {
    const product = req.body;
    product.id = parseInt(req.params.id, 10);

    const [result] = await updateOne(product);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const eraseOne = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    const result = await deleteOne(productId);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};







module.exports ={getAll, getOne,createOne,editOne,eraseOne};
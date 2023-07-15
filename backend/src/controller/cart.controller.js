const {findOne,findAll,  addOne } = require("../model/cart.model.js");


const getOne = async(req,res,next) =>{
    
    try{
        const cartId= parseInt(req.params.id);

        if (isNaN(cartId)) throw new Error();

        const [cart] = await findOne(cartId);
        res.send(cart);
    }catch(e){
        next(e);
    }
};
const getAll = async(req,res, next)=>{
    try{ 
        const movies = await findAll();
        
        res.send(movies);
    } catch(e){
        next(e);
    }

};

const createOne = async (req, res, next) => {
    try {
      const cart = req.body;
      const newCart = await addOne(cart);
      res.status(201).json(newCart);
    } catch (error) {
      next(error);
    }
  };


  module.exports ={ getOne,createOne,getAll};
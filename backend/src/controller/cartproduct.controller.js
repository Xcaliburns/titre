const {addOne, findAll,findOne} = require("../model/cartproduct.model.js");

const getAll = async(req,res, next)=>{
    try{ 
        const cartproducts = await findAll();
        
        res.send(cartproducts);
    } catch(e){
        next(e);
    }

};

const createOne = async (req, res, next) => {
    try {
      const cartproduct = req.body;
      const newCartProduct = await addOne(cartproduct);
      res.status(201).json(newCartProduct);
    } catch (error) {
      next(error);
    }
  };

  const getOne = async(req,res,next) =>{
    
    try{
        const cartproductId= parseInt(req.params.id);

        if (isNaN(cartproductId)) throw new Error();

        const [cartproduct] = await findOne(cartproductId);
        res.send(cartproduct);
    }catch(e){
        next(e);
    }
};

  


module.exports ={getAll,createOne,getOne};
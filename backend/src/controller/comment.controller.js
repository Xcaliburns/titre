const { findAll, findOne, addOne ,updateOne,deleteOne} = require("../model/comment.model.js");

const getAll = async(req,res, next)=>{
    try{ 
        const comments = await findAll();
        
        res.send(comments);
    } catch(e){
      res.sendStatus(500);
    }

};

const getOne = async(req,res,next) =>{
    
    try{
        const commentId= parseInt(req.params.id);

        if (isNaN(commentId)) throw new Error();

        const [comment] = await findOne(commentId);
        res.send(comment);
    }catch(e){
      res.sendStatus(500);
    }
};



const createOne = async (req, res, next) => {
  try {
    const comment = req.body;
    const newcomment = await addOne(comment);
    res.status(201).json(newcomment);
  } catch (error) {
    res.sendStatus(500);
  }
};

const editOne = async (req, res) => {
  try {
    const comment = req.body;
    comment.id = parseInt(req.params.id, 10);

    const [result] = await updateOne(comment);

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
    const commentId = parseInt(req.params.id, 10);

    const result = await deleteOne(commentId);

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
const { findAll, findOne } = require("../model/movie.model.js");

const getAll = async(req,res, next)=>{
    try{ 
        const movies = await findAll();
        
        res.send(movies);
    } catch(e){
        next(e);
    }

};

const getOne = async(req,res,next) =>{
    
    try{
        const movieId= parseInt(req.params.id);

        if (isNaN(movieId)) throw new Error();

        const [movie] = await findOne(movieId);
        res.send(movie);
    }catch(e){
        next(e);
    }
};

module.exports ={getAll, getOne};
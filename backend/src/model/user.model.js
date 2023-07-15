const db = require("./db.js");



const findOne= async (userId)=> {
    try{
        const [user] = await db.query("select * from `user` where id = ? ", [userId]);
       
        return user;
    }catch(e){
        console.log(e);
    }
};

const findByEmail = async (email) => {
  try {
    const [user] = await db.query("select * from `user` where email = ?", [
      email,
    ]);

    return user;
  } catch (e) {
    console.log(e);
    throw new SQLGenericError();
  }
};


//creation d'un user

const addOne = async (user) => {

    try{

        const{ name, email, password } = user
        const [result] = await db.query("insert into `user` (name, email, password) values (?,?,?)", [name, email, password]
        );

    return { id: result.insertId, name, email };  /*id: result.insertId clé SQL2 qui renvoie l'id de lutilisateur crée */
    } catch(e) {
         console.log(e);
    }
}
  
module.exports= { findOne, addOne,findByEmail };

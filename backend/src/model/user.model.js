const db = require("./db.js");



const findOne= async (userId)=> {
    try{
        const [user] = await db.query("select * from `user` where id = ? ", [userId]);
       
        return user;
    }catch(error){
      throw new Error(`utilisateur introuvable: ${error}`);
    }
};

const findByEmail = async (email) => {
  try {
    const [user] = await db.query("select * from `user` where email = ?", [
      email,
    ]);

    return user;
  } catch (error) {
    throw new Error(`email introuvable: ${error}`);
  }
};
const findAll = async () => {
  try {
    const [users] = await db.query("select * from `user`");

    return users;
  } catch (error) {
    throw new Error(`Impossible de trouver les utilisateurs: ${error}`);
  }
};


//creation d'un user

const addOne = async (user) => {

    try{

        const{ name, email, password } = user
        const [result] = await db.query("insert into `user` (name, email, password) values (?,?,?)", [name, email, password]
        );

    return { id: result.insertId, name, email };  /*id: result.insertId clé SQL2 qui renvoie l'id de lutilisateur crée */
    } catch(error) {
      throw new Error(`impossible de creer l'utilisateur: ${error}`);
    }
}
  
module.exports= { findOne, addOne,findByEmail,findAll };

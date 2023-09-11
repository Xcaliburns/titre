const db =require("./db.js");

const findAll= async ()=> {
    try{
        const [comments] = await db.query("SELECT c.*, u.name FROM `comment` c LEFT JOIN user u ON c.user_id = u.id ");

        return comments;
    }catch(error){
      throw new Error(`commentaires introuvables: ${error}`);
    }
};

const findOne= async (id)=> {
    try{
        const [comment] = await db.query("select * from `comment` where id = ? ", [id]);

        return comment;
    }catch(error){
      throw new Error(`commentaire introuvable: ${error}`);
    }
};

const addOne = async (comment) => {

    try{

        const{ text,user_id,product_id} = comment
        const [result] = await db.query("insert into comment (text, user_id,product_id) values (?,?,?)", [comment.text, comment.user_id, comment.product_id,]
        );

    return { id: result.insertId,text, user_id, product_id  };  
    } catch (error) {
        throw new Error(`Impossible de créer le commentaire: ${error}`);
    }
}

const updateOne = async function (comment) {
    try {
      const result = await db.query(
         `UPDATE \`comment\` SET text = ?, user_id = ?, product_id = ? WHERE id = ?`,
        [comment.text, comment.user_id, comment.product_id, comment.id,]
      );
      return result;
    } catch (error) {
      throw new Error(`Impossible de mettre à jour le commentaire : ${error}`);
    }
  };

const deleteOne = async function (commentId) {
  try {
    const result = await db.query(
      `DELETE FROM \`comment\` WHERE id = ?`,
      [commentId]
    );
    return result;
  } catch (error) {
    throw new Error(`Impossible de supprimer le commentaire : ${error}`);
  }
};



module.exports = { findAll, findOne, addOne,updateOne,deleteOne };
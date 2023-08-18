const db = require("./db.js");

const findAll = async () => {
  try {
    const [products] = await db.query("select * from `product`");

    return products;
  } catch (e) {
    console.log(e);
  }
};

const findOne = async (id) => {
  try {
    const [product] = await db.query("select * from `product` where id = ? ", [
      id,
    ]);

    return product;
  } catch (e) {
    console.log(e);
  }
};

const addOne = async (product) => {
  try {
    const {
      short_description,
      description,
      price,
      photo,
      title,
      studio,
      genre,
      release,
    } = product;
    const [result] = await db.query(
      "INSERT INTO product (`short_description`, `description`, `price`, `photo`, `title`, `studio`, `genre`, `release`) VALUES (?,?,?,?,?,?,?,?)",
      [
        product.shortDescription,
        product.description,
        product.price,
        product.photo,
        product.title,
        product.studio,
        product.genre,
        product.release,
      ]
    );

    return {
      id: result.insertId,
      short_description,
      description,
      price,
      photo,
      title,
      studio,
      genre,
      release,
    };
    /id: result.insertId clé SQL2 qui renvoie l'id de lutilisateur crée/;
  } catch (error) {
    throw new Error(`Impossible de créer le produit: ${error}`);
  }
};

const updateOne = async function (product) {
  try {
    const result = await db.query(
      `UPDATE \`product\` SET short_description = ?,description = ?, price = ?, photo = ?,title = ?, studio = ?, genre = ?, \`release\` = ? WHERE id = ?`,
      [
        product.shortDescription,
        product.description,
        product.price,
        product.photo,
        product.title,
        product.studio,
        product.genre,
        product.release,
        product.id,
      ]
    );
    return result;
  } catch (error) {
    throw new Error(`Impossible de mettre à jour le produit : ${error}`);
  }
};

const deleteOne = async function (productId) {
  try {
    await db.query(`DELETE FROM comment WHERE product_id = ?`, [productId]);

    const result = await db.query(`DELETE FROM product WHERE id = ?`, [
      productId,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Impossible de supprimer le produit : ${error}`);
  }
};

module.exports = { findAll, findOne, addOne, updateOne, deleteOne };

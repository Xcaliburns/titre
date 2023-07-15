const {  findOne, addOne } = require ("../model/user.model.js");
const validateUser = require("../validator/user.validator.js");
const { hashPassword}  = require("../helper/argon.helper.js");

const getOne = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) throw new Error();

    const [user] = await findOne(userId);

    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
};

const createOne = async (req, res) => {
  try {
    // const { name, email, password } = req.body;
    const errors = validateUser(req.body);

    if (errors) return res.stauts(401).send(errors);

    const hashedPassword = await hashPassword(req.body.password);

    const result = await addOne ({...req.body, password: hashedPassword});  //injecte le hashedPassword dans la bdd

    res.status(201).send (result);  // renvoie le result de la ligne 25 du user.model.js

  } catch {
    res.sendStatus(500);
  }
};

module.exports = {  getOne, createOne };
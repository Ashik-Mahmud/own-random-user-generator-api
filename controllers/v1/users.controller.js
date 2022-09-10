const { getDb } = require("../../utils/dbConnection");
const {usersExceptDeletedItem} = require("../../utils/FileSystem");

// getting random user
const randomUser =async(req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    const userLength = users.length;
    const randomUser = users[Math.floor(Math.random() * userLength)];

    res.send(randomUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// getting all user with limit
const allUser = async(req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    const limit = req.query.s;
    const userLength = users.length;

    if (limit > userLength) {
      return res.send({ message: "Limit Exceeded" });
    }

    if (limit) {
      return res.send(users.slice(0, limit));
    }
    res.send(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Save User Controller
const saveUser = async (req, res) => {
  try {
    const { id, name, gender, contact, address, photoURL } = req.body;

    /* validations for required all the fields */
    if (!name || !gender || !contact || !address || !photoURL) {
      return res.send({ message: "Please provide required fields" });
    }

    /*  push the new user to the user to the mongodb database  */
    
    const db = getDb();
    const result  = await db.collection("users").insertOne(req.body);

    if(result.acknowledged){
        res.send({ message: "User added successfully" });
    }
    
    
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* update user by the id */
const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const isHasThisUser = users.find((user) => user.id == id);
    if (!isHasThisUser) {
      return res.json({ message: "User not found" });
    }

    const { id: newId, name, gender, contact, address, photoURL } = req.body;
    let updatedData = users.find((user) => user.id == id);

    /* validation for ID  */
    if (newId) return res.json({ message: "You can't change ID" });

    updatedData.name = name ? name : updatedData.name;
    updatedData.gender = gender ? gender : updatedData.gender;
    updatedData.contact = contact ? contact : updatedData.contact;
    updatedData.address = address ? address : updatedData.address;
    updatedData.photoURL = photoURL ? photoURL : updatedData.photoURL;

    addingNewUser(updatedData);
    res.send({ message: "User updated successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* delete user by the id */
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const isHasThisUser = users.find((user) => user.id == id);
    if (!isHasThisUser) return res.json({ message: "User not found" });

    const usersExceptDeleted = users.filter((user) => user.id != id);

    usersExceptDeletedItem(usersExceptDeleted);
    res.send({ message: "Delete user successfully done" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* bulk user delete  */
const bulkUserDelete = (req, res) => {
  try {
    const deleteIDs = req.body;
    const remainingItems = users.filter((user) => !deleteIDs.includes(user.id));
    usersExceptDeletedItem(remainingItems);
    res.send("Deleted All selection Items");
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  randomUser,
  allUser,
  saveUser,
  updateUser,
  deleteUser,
  bulkUserDelete,
};

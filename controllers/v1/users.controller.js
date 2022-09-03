const {users, addingNewUser} = require("../../utils/FileSystem");

// getting random user
const randomUser = (req, res) => {
  try {
    const userLength = users.length;
    const randomUser = users[Math.floor(Math.random() * userLength)];

    res.send(randomUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// getting all user with limit
const allUser = (req, res) => {
  try {
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
const saveUser =  (req, res) => {
    try {
        
        const {id, name, gender, contact, address, photoURL} = req.body;

        /* validations for required all the fields */
        if(!id || !name || !gender || !contact || !address || !photoURL) {
            return res.send({message: "Please provide required fields"});
        };

        /* validations for id */
        if(typeof id !== "number") {
            return res.send({message: "Id must be number"});
        }

       /*  validation for repetitive ID */
        const isID = users.find(user => user.id == id);
        if(isID){
            return res.send({message: "ID already exists"});
        }

       /*  push the new user to the users array */
        addingNewUser(req.body);

        res.send({message: "User added successfully"});
     

    } catch (error) {
        res.json({ message: error.message });        
    }
    
};


/* update user by the id */
const updateUser = (req, res) => {
    try {
        const {id} = req.params;
        const isHasThisUser = users.find(user => user.id == id);
        if(!isHasThisUser){
            return res.json({message: "User not found"});
        }
        
        const {id: newId, name, gender, contact, address, photoURL} = req.body;
        let updatedData = users.find(user => user.id == id);
        
        
        /* validation for ID  */
        if(newId) return res.json({message: "You can't change ID"})
        
        updatedData.name = name ? name : updatedData.name;
        updatedData.gender = gender ? gender : updatedData.gender;
        updatedData.contact = contact ? contact : updatedData.contact;
        updatedData.address = address ? address : updatedData.address;
        updatedData.photoURL = photoURL ? photoURL : updatedData.photoURL;;
 
        addingNewUser(updatedData)
        res.send({message: "User updated successfully"});
        
    }
    catch (error) {
        res.json({ message: error.message });        
    }
}



module.exports = { randomUser, allUser, saveUser, updateUser };

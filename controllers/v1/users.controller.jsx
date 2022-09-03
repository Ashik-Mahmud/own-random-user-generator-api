const users = require("../../utils/FileSystem");

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

module.exports = { randomUser, allUser };

const userController = require("../../controllers/v1/users.controller.js");
const users = require("../../utils/FileSystem");

const router = require("express").Router();

router
  .get("/random", userController.randomUser)
  .get("/all", userController.allUser)
  .post("/save", userController.saveUser)
  .patch("/update/:id", userController.updateUser)
  .delete("/delete/:id", userController.deleteUser)
  .delete(
    "/bulk-delete",
    /* for bulk delete you need to send array with IDs which ones you want to delete as body */
    userController.bulkUserDelete
  );
module.exports = router;

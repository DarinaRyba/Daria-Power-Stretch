const { Router } = require('express');
const usersController = require('./../controllers/userController');

function workoutRouter (userSchema) {
  const router = Router();
  const users = usersController(userSchema);

  router.route('/')
    .get(users.getUserMethod)
    .patch(users.patchUserMethod);

  return router;
}

module.exports = workoutRouter;
const { Router } = require('express');
const usersController = require('./../controllers/userController');

function workoutRouter (userSchema, scheduleSchema) {
  const router = Router();
  const users = usersController(userSchema, scheduleSchema);

  router.route('/')
    .patch(users.patchUserMethod)
    .put(users.putUserMethod);

  router.route('/:userId')
    .get(users.getUserMethod);

  return router;
}

module.exports = workoutRouter;

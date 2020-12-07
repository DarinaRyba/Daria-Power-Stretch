function usersController (userSchema) {
  function getUserMethod (req, res) {
    const query = {};
    userSchema.find(query, (usersError, users) => {
      if (usersError) {
        res.send(usersError);
      }
      res.json(users);
    });
  }

  function postUserMethod (req, res) {
    const query = req.body;
    userSchema.create(query, (usersError, user) => {
      if (usersError) {
        return res.send(usersError);
      }
      return res.json(user);
    });
  }

  function patchUserMethod ({ body }, res) {
    userSchema.findOneAndUpdate(body.displayName, body, (usersError, user) => {
      if (usersError) {
        return res.send(usersError);
      }
      return res.json(user);
    });
  }

  return {
    getUserMethod, patchUserMethod, postUserMethod
  };
}

module.exports = usersController;

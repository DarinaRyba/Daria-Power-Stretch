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

  function patchUserMethod ({ body }, res) {
    const query = { uid: body.uid };
    userSchema.findOneAndUpdate(query, body, { upsert: true, useFindAndModify: false }, (usersError, user) => {
      if (usersError) {
        return res.send(usersError);
      }
      return res.json(user);
    });
  }

  return {
    getUserMethod, patchUserMethod
  };
}

module.exports = usersController;

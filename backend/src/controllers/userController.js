function usersController (userSchema) {
  function getUserMethod (req, res) {
    const query = {};
    userSchema.find(query, (usersError, user) => {
      if (usersError) {
        res.send(usersError);
      }
      res.json(user);
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

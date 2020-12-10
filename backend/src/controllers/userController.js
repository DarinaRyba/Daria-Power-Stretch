function usersController (userSchema, scheduleSchema) {
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

  function putUserMethod ({ body }, res) {
    const query = { _id: body.user._id };
    userSchema.findOne(query, (userError, user) => {
      if (userError) {
        res.send(userError);
      } else {
        user.days.push(body.days._id);
        user.save();
      }
    });
    const queryFound = { _id: body.days._id };
    scheduleSchema.findOne(queryFound, (daysError, days) => {
      if (daysError) {
        res.send(daysError);
      } else {
        days.participants.push(body.participants._id);
        days.save();
      }
    });
  }

  return {
    getUserMethod, patchUserMethod, putUserMethod
  };
}

module.exports = usersController;

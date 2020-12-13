function usersController (userSchema, scheduleSchema) {
  function getUserMethod (req, res) {
    const query = {};
    userSchema.find(query)
      .populate({ path: 'days' })
      .exec((usersError, user) => {
        if (usersError) {
          res.send(usersError);
        }
        res.json(user);
      });
  }

  function patchUserMethod ({ body }, res) {
    const query = { email: body.email };
    console.log('este es patch method', query);
    userSchema.findOneAndUpdate(query, body, { new: true, upsert: true, useFindAndModify: false }, (usersError, user) => {
      if (usersError) {
        return res.send(usersError);
      }
      return res.json(user);
    });
  }

  async function putUserMethod ({ body }, res) {
    const userId = body.user._id;
    const query = { _id: userId };

    const queryFound = { date: body.day };

    let dayFound;
    await scheduleSchema.findOne(queryFound, (daysError, days) => {
      if (daysError) {
        console.log(daysError);
      } else {
        dayFound = days;
        days.participants.push(userId);
        days.save();
      }
    });

    userSchema.findOne(query, (userError, user) => {
      if (userError) {
        res.send(userError);
      } else {
        user.days.push(dayFound._id);
        user.save();
        res.send(user);
      }
    });
  }

  return {
    getUserMethod, patchUserMethod, putUserMethod
  };
}

module.exports = usersController;

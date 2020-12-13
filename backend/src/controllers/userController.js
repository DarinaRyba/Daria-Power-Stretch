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
    const query = { email: body.email };
    console.log('este es patch method', query);
    userSchema.findOneAndUpdate(query, body, { new: true, upsert: true, useFindAndModify: false }, (usersError, user) => {
      if (usersError) {
        return res.send(usersError);
      }
      console.log(user);
      return res.json(user);
    });
  }

  async function putUserMethod ({ body }, res) {
    const userId = body.user._id;
    const queryFound = { date: body.day };

    let dayFound;
    await scheduleSchema.findOne(queryFound, (daysError, days) => {
      if (daysError) {
        return res.send(daysError);
      } else {
        dayFound = days;
        if (isUserAlreadyInSchedule(userId, dayFound)) {
          return res.send('You have already booked this workout');
        } else {
          days.participants.push(userId);
          days.save();
          const query = { _id: userId };
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
      }
    });
  }

  function isUserAlreadyInSchedule (userId, schedule) {
    const { participants } = schedule;
    return participants.includes(userId);
  }

  return {
    getUserMethod, patchUserMethod, putUserMethod
  };
}

module.exports = usersController;

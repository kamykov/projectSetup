const User = require('../models/user');

exports.userById = async (id, ctx, next) => {
  try {
    ctx.profile = await User.findById(id).exec();
    if (ctx.profile) {
      return next();
    }
    ctx.body = { error: 'User id not found' };
  } catch (err) {
    ctx.throw(401, {
      data: {
        error: 'NO USER FOUND',
        message: 'Invalid.User.ID',
      },
    });
  }
};

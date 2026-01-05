const User = require("../models/User");

/**
 * Generate sequential userId (USR###).
 */
async function generateUserId() {
  const lastUser = await User.findOne({
    userId: { $regex: /^USR\d{3,4}$/ },
  })
    .sort({ userId: -1 })
    .lean()
    .exec();

  if (!lastUser) return "USR001";

  const lastId = parseInt(lastUser.userId.replace("USR", ""), 10);
  return `USR${(lastId + 1).toString().padStart(3, "0")}`;
}

module.exports = { generateUserId };

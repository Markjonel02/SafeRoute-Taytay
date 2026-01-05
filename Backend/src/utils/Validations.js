/**
 * Validate required fields from request body.
 * Returns array of missing fields (empty if all present).
 */
function validateRequiredFields(body, requiredKeys) {
  return requiredKeys.filter((key) => !body[key]);
}

/**
 * Check if a field value already exists in User collection.
 */
async function checkDuplicate(User, field, value, message) {
  const existingUser = await User.findOne({ [field]: value });
  if (existingUser) {
    throw new Error(message);
  }
}

module.exports = { validateRequiredFields, checkDuplicate };

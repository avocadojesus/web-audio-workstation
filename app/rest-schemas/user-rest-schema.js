/**
 * getSchema
 * ------
 * returns a blank model for the API schema
 * @return schema
*/
exports.getSchema = function() {
  return {
    display_name: null,
    created: null,
    phone_number: null,
  }
}

/**
 * toAPI
 * ------
 * converts a user object to API speck
 * @param user
 * @return schema
*/
exports.toAPI = function(user) {
  var schema = this.getSchema();
  schema.phone_number = user.phone_number;
  schema.created = user.created;
  return schema;
}

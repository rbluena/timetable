/**
 * Redirecting to a different page
 *
 * @param {String} target
 * @param {Object} res
 */
function redirectTo(target, res) {
  res.writeHead(303, { Location: target });
  return res.end();
}

module.exports = {
  redirectTo,
};

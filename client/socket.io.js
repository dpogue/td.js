/**
 * AMD-define wrapper around the Socket.io client which isn't an AMD module.
 *
 * TODO: This adds an extra HTTP request to the initial client load.
 */
define(function () {
  return io;
});

// Dependencies
const path = require("path");
const ejs = require("ejs");

// Export
module.exports = function polkaEjs({
  // Global options that will be used in all calls
  // unless the render call overrides an option then that one is used
  ext: globalExt = "ejs",
  cache: globalCache = process.env.NODE_ENV === "production",
  views: globalViews = path.join(process.cwd(), "views"),
  contentType: globalContentType = "text/html",
  status: globalStatus = 200,
  options: globalOptions = {},
} = {}) {
  // The actual middleware that will be passed to app.use()
  return function middleware(req, res, next) {
    // Define the res.render function on response object
    res.render = function render(file, locals = {}, {
      // Per call options that overrides the global call
      cache = globalCache,
      status = globalStatus,
      contentType = globalContentType,
      ext = globalExt,
      views = globalViews,
      options = globalOptions
    } = {}) {
      // Add cache option
      options.cache = cache;
      // Validate and process input
      if(isNaN(status)) throw new Error("Status must be a number.");
      if(typeof file !== "string") throw new Error("File must be a string.");
      if(!file.endsWith(`.${ext}`)) file = file + `.${ext}`;
      // Render!
      return ejs.renderFile(path.join(views, file), locals, options, (err, html) => {
        if(err) throw err; // Handle error
        // Send the response
        res.writeHead(status, { "Content-Type": contentType });
        return res.end(html);
      });
    };
    // We are done.
    return next();
  };
};

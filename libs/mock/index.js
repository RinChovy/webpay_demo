const fs = require("fs");
const path = require("path");

module.exports = {
  middleware: function (req, res, next) {
    let CURR = process.cwd();
    let rExt = /\.[^\/\.]+$/;
    let rJSON = /\.json$/;
    let rParam = /^([^\?]*)(\?.*)?$/;
    let rNumber = /\/[\d\/]+$/;

    let rIco = /\.ico$/;

    let matchesParam = req.url.match(rParam);
    let pathname = matchesParam[1]
      .replace(".ashx", "")
      .replace(".aspx", "")
      .replace(".asp", "");

    let rJSONP = /[\?&]callback=([^\?&]+)/;
    let mathcesJson = req.url.match(rJSONP);
    let callback = mathcesJson && mathcesJson[1];

    let filepath;

    if (rIco.test(pathname)) {
      return res.end("{}");
    }

    if (!rExt.test(pathname) && !rJSON.test(pathname) && pathname !== "/") {
      req.url =
        "/mock" +
        pathname.replace(/\/$/, "").replace(rNumber, "/_Number") +
        ".json";

      filepath = path.join(CURR, req.url);

      try {
        fs.statSync(filepath).isFile();
      } catch (e) {
        filepath = path.join(CURR, "/mock/default.json");
      }

      if (callback) {
        return res.end(callback + "(" + fs.readFileSync(filepath) + ")");
      } else {
        return res.end(fs.readFileSync(filepath));
      }
    }

    if (/hot-update/.test(req.url)) {
      return "/" + req.url.replace(/.*\//, "");
    }

    if (typeof next === "function") {
      next();
    }
  },
};

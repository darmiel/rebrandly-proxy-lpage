const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const os = require("os");

const app = express();

app.use(helmet());
app.use(morgan("combined"));

const config = require(__dirname + "/../config.json");
console.log("📄 Config:");
console.log(config);

const hosts = config.host;

function getHost(req) {
  let host = req.get("host");
  if (host.includes(":")) {
    host = host.split(":")[0];
  }
  return host;
}

// No path -> Landing Page
app.get("/", (req, res) => {
  const host = getHost(req);

  let val = hosts[host];
  if (val == undefined) {
    return res.json({
      error: "Domain not specified",
    });
  }

  let landing = val.landing;
  if (landing == undefined) {
    return res.json({
      error: "Landing not specified",
    });
  }

  return res.status(302).redirect(landing);
});

// Path -> Rebrandly
app.get("*", (req, res) => {
  const host = getHost(req);

  let val = hosts[host];
  if (val == undefined) {
    return res.json({
      error: "Domain not specified",
    });
  }

  let short = val.short;
  if (short == undefined) {
    return res.json({
      error: "Short not specified",
    });
  }

  let path = req.path;

  return res.status(302).redirect(short.replace("{path}", path));
});

app.listen(config.server.port, config.server.bind, () => {
  console.log("✅ Server is up and running:");
  console.log(`✅ http://${os.hostname()}:${config.server.port}`);
});
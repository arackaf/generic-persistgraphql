import fs from "fs";
import { invert } from "lodash";
import parse from "url-parse";

export default (app, { url, mappingFile }) => {
  const jsonContent = eval("(" + fs.readFileSync(mappingFile) + ")");
  const queryMap = invert(jsonContent);

  app.get(url, (req, resp, next) => {
    if (req.query.query) {
      let realQuery = queryMap[req.query.query];
      //TODO: add allowUnrestricted option and reject in else
      if (realQuery) {
        let parsed = parse(req.url, true);
        parsed.query.query = realQuery;
        req.url = parsed.toString();
      }
    }
    next();
  });

  app.post(url, (req, resp, next) => {
    if (req.body.query) {
      let realQuery = queryMap[req.body.query];
      //TODO: add allowUnrestricted option and reject in else
      if (realQuery) {
        req.body.query = realQuery;
      }
    }
    next();
  });
};

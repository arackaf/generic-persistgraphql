import fs from "fs";
import { invert } from "lodash";

export default (app, { url, mappingFile }) => {
  const jsonContent = eval("(" + fs.readFileSync(mappingFile) + ")");
  const queryMap = invert(jsonContent);

  app.get(url, (req, resp, next) => {
    if (req.query.query) {
      let realQuery = queryMap[req.query.query];
      req.query.query = realQuery;
      req.url = req.url.replace(/query=.+/, "query=" + realQuery);
    }
    next();
  });
};

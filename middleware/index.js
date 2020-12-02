import fs from "fs";
import { invert } from "lodash";
import parse from "url-parse";

export default (app, { url, mappingFile, onQueryNotFound }) => {
  const jsonContent = JSON.parse(fs.readFileSync(mappingFile));
  const queryMap = invert(jsonContent);

  app.get(url, (req, resp, next) => {
    //this middleware may be used multiple times, ie with subdomains. Once processed, we're done
    if (req.__genericPersistGraphQLHandled) {
      return next();
    }
    
    if (req.query.query) {
      let realQuery = queryMap[req.query.query];
      //TODO: add allowUnrestricted option and reject in else
      if (realQuery) {
        //this middleware may be used multiple times, ie with subdomains. Once processed, we're done
        req.__genericPersistGraphQLHandled = true;
        req.query.query = realQuery;
        let parsed = parse(req.url, true);
        parsed.query.query = realQuery;
        req.url = parsed.toString();
        return next();
      } else if (onQueryNotFound) {
        return onQueryNotFound(req, resp, next);
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
        return next();
      } else if (onQueryNotFound) {
        return onQueryNotFound(req, resp, next);
      }
    }
    next();
  });
};

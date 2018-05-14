export default (app, { url }) => {
  app.get(url, (req, resp, next) => {
    if (req.query.query) {
      let realQuery = queryMap[req.query.query];
      req.query.query = realQuery;
      req.url = req.url.replace(/query=.+/, "query=" + realQuery);
    }
    next();
  });
};

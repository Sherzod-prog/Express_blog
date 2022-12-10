module.exports = (req, res, next) => {
  if (
    !(req.files && req.files.image) ||
    !req.body.title ||
    !req.body.username ||
    !req.body.content ||
    !req.body.description
  ) {
    return res.redirect("/posts/new");
  }
  next();
};

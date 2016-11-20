exports.render = function (req, res) {
  if (req.session.lastvisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.render('index',{
    title: 'Hello World',
    userFullName: req.user ? req.user.fullName : ''
  });
};

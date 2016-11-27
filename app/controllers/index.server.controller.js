exports.render = function (req, res) {
  if (req.session.lastvisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.render('index',{
    title: 'Hello World',
    user: req.user ? req.user.fullName : ''
    //user: JSON.stringify(re)
  });
};

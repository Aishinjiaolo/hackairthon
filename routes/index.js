exports.index = function(req, res){
  res.render('index');
};

exports.project = function(req, res, next){
  var name      = req.params.name;
  var html_name = name + '.html';
  res.render(html_name);
};

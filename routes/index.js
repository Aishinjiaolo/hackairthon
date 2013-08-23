exports.index = function(req, res){
  res.render('index');
};

exports.project = function(req, res, next){
  var name = req.params.name;
  var html_name = name + '.html';
  console.log("name is \'" + name + "\'"); 
  res.render(html_name);
};

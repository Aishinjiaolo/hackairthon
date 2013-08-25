var mongodb = require('mongodb');

var db         = mongodb.Db;
var connection = mongodb.Connection;
var server     = mongodb.Server;
var bson       = mongodb.BSON;
var objectID   = mongodb.ObjectID;

ProjectDB = function(host, port) {
  var new_server = new server(
          host, port,
          {safe: false}, {auto_reconnect: true}, {});
  this.db = new db('project', new_server);
  this.db.open(function(){});
};

ProjectDB.prototype.getCollection = function(callback) {
  var get_it = function(error, project_collection) {
      if (error) {
        callback(error);
      }
      else {
        callback(null, project_collection);
      }
  };
  this.db.collection('project', get_it);
};

ProjectDB.prototype.findAll = function(callback) {
  var get_result = function(error, project_collection) {
    if (error) {
      callback(error);
    }
    else {
      var find = function(error, results) {
        if (error) {
          callback(error);
        }
        else {
          callback(null, result);
        }
      };
      project_collection.find().toArray(find);
    }
  };
  
  this.getCollection(get_result(error, project_collection));
};

ProjectDB.prototype.save = function(projects, callback) {
  var save_projects = function(error, project_collection) {
    if (error) {
      callback(error);
    }
    else {
      if (!projects.isArray) projects = [projects];
      var create = function(project) {project.create_at = new Data();};
      projects.map(create(project));
      var projects_call_back = function() {callback(null, projects);};
      project_collection.insert(projects, projects_call_back);
    }
  };
  this.getCollection(save_projects(error, project_collection));
};

exports.ProjectDB = ProjectDB;

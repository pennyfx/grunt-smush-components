module.exports.findDependencies = function(dict){
  var files = {js:[], css:[]};

  var crawlDependencies = function(dict, parentLib){
    for (var key in dict){

      var entry = dict[key];

      if (entry.source && entry.source.main) {

        var main = Array.isArray(entry.source.main) ? entry.source.main : [entry.source.main];
        main.forEach(function(item){

          var m = item.match(/\.(\w+)$/);

          if (m){

            var ext = m[1];

            if (!files[ext]){
              files[ext] = [];
            }

            var existsAt = files[ext].indexOf(item),
              parentAt = files[ext].indexOf(parentLib);

            if (parentAt >= 0 && existsAt === -1){  //insert before
              files[ext].splice(parentAt,0, item);
            }
            else if (parentAt >= 0 && existsAt > parentAt){  // shuffle higher
              files[ext].splice(parentAt, 0, item);
              files[ext].splice(existsAt+1,1);
            }
            else if (existsAt === -1){  // doesn't exist yet and no parent
              files[ext].push(item);
            }
          }
          else {
            Console.log("Unknown file type");
          }

        });

      }

      if (entry.dependencies){
        crawlDependencies(entry.dependencies, files['js'][files['js'].length-1]);
      }
    }
  };

  crawlDependencies.call(this,dict);

  return files;

};

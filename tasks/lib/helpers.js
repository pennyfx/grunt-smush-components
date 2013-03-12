module.exports.findDependencies = function(dict){
  var depsJs = [],
      depsCss = [];

  var crawlDependencies = function(dict, parentLib){
    for (var key in dict){

      var entry = dict[key];

      if (entry.source && entry.source.main) { 

        var main = Array.isArray(entry.source.main) ? entry.source.main : [entry.source.main];
        main.forEach(function(item){

          if (item.match('.js$')){

            var existsAt = depsJs.indexOf(item),
              parentAt = depsJs.indexOf(parentLib);

            if (parentAt > 0 && existsAt === -1){  //insert before
              depsJs.splice(parentAt,0, item);
            }
            else if (parentAt > 0 && existsAt > parentAt){  // shuffle higher
              depsJs.splice(parentAt, 0, item);
              depsJs.splice(existsAt+1,1);
            }
            else if (existsAt === -1){  // doesn't exist yet and no parent
              depsJs.push(item);
            }

          }
          else if(item.match('.css$') && depsCss.indexOf(item) === -1){
            depsCss.push(item);
          }
          
        });

      }

      if (entry.dependencies){
        crawlDependencies(entry.dependencies, depsJs[depsJs.length-1]);
      }
    }
  };

  crawlDependencies.call(this,dict);

  return { js: depsJs, css: depsCss };

};

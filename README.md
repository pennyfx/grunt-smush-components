# grunt-smush-components

>Grunt multi-task for concatinating components assets into single files.  This task relies on the 'main' key in your bower.json to figure out which files are relevant.   With the fileMap option, you can then create a map between a files extension and the destination output file.  This project does not use requirejs or AMD It simply concatinates your files together.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-smush-components --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-smush-components');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependencies`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "smush-components" task

### Overview
In your project's Gruntfile, add a section named `smush-components` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'smush-components': {
    dist: {
      fileMap: {
        js: './public/js/components.js',
        css: './public/css/components.css'
      }
    }
  },
})
```

### Options

#### fileMap
Type: `Object`
Default value: `{ js: 'components.js', css: 'components.css' }`

Map all files of a specific extension to a destination file


### Usage Examples


#### Lazy Example

This will output to ./components.css and ./components.js

```js
grunt.initConfig({
  'smush-components': {}
})
```


#### Custom Options

Outputs files according to the fileMap

```js
grunt.initConfig({
  'smush-components': {
    fileMap: {
      js: './public/js/components.js',
      css: './public/css/components.js'

    }
  }
})
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
1.0.1 - Added packages key that allows package you to pick the packages you want

1.0.0 - Added multi-task support

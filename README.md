# grunt-x-tag

> Grunt tasks for managing concatinating components javascript and css.

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

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "smush-components" task

### Overview
In your project's Gruntfile, add a section named `smush-components` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'smush-components': {
    options: {
      out: './public/'  // Output location  
    }
  },
})
```

### Options

#### options.out
Type: `String`
Default value: `'./dist/'`

Location to output the files

#### options.fileName
Type: `String`
Default value: `'components'`

CSS and Javascript file name to use

### Usage Examples


#### Lazy Example

```js
grunt.initConfig({
  'smush-components': {}
})
```


#### Custom Options

```js
grunt.initConfig({
  'smush-components': {
    options: {
      out: './dist/public/',
      fileName: 'x-components'
    }
  }
})
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
_(Nothing yet)_

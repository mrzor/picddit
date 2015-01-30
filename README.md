# Picddit

A browser-based Reddit image browser. Hack of the Week - W5/2015.

Built with [React](http://facebook.github.io/react) and [Reflux](https://github.com/spoike/refluxjs).

Uses [Bootstrap](http://getbootstrap.com/) and the [Bootswatch Slate theme](http://bootswatch.com/slate/).

### Run it yourself

On the web : (TBD / I'm yet to deploy this)

On your workstation : Clone it, bake it with `npm install`, run it with `gulp dev`.

On a server of your own : (TBD)

### Note about the stack

There is some CoffeeScript, but I deliberately avoided the Coffee+JSX extensions and went with vanilla JavaScript.

The build system uses [Gulp](http://gulpjs.com/) and [Browserify](http://browserify.org/). I do not, however, indulge in a fat bundle of all my dependencies, because the build times get super long.

Therefore, the application layouts use a great many links to [CDNJs](https://cdnjs.com/), which are at this point maintained by hand (no `npm update --save`, which is sad, but not life-threatening).

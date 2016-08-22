# Wordpress Starter Kit

An enviroment framework for Wordpress Theme development.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisities

[Node.JS](https://nodejs.org/)

[Grunt](http://gruntjs.com/)

[composer](https://getcomposer.org/)

[PHPCS](https://github.com/squizlabs/PHP_CodeSniffer#installation)

[Wordpress CS](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards)


### Installing

Fork/Checkout this project from Github and rename the values to make the projects details in 'composer.json' and 'package.json'. 

Ensure you're not working on the same git origion url as this project.

```
git config remote.origin.url
```

Open Terminal in this directory and use composer to install Wordpress and Plugin dependancies.

```
$ composer install
```

Install NPM/Grunt dependancies

```
$ npm install
```

To set up the Wordpress install, copy and edit the 'local-config-sample.php' and 'wp-config-edit-and-rename.php' with the correct database information, saving them as 'local-config.php' and 'wp-config.php'. These files will not be tracked to keep your information private. 

Delete this Readme.


### Building 

From your projects directory, in Terminal, you can run a build of the project with the command below. This will process all the files from your 'scr/' directory, and bump up the version as a pre-patch. 

```
$ grunt dev
```

When you're activly working on a project and wish to continuously update the build files, seeing the changes in the browser as they are made, run the below command. You will need to have run the previous command before starting to ensure all the nessicary files are present. The following command will only update changed files.

```
$ grunt watch
```

To initiate a full build and a minor version bump run the below command. This will run more comprehensive linting options and remove development flags from your files. You'll usualy only run this durring deploy stages.

```
$ grunt build
```







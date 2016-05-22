## A Yeoman generator for Exercism R problems

What it says: this is a `yo` generator for creating boilerplate R problems on [exercism](http://exercism.io). Useful for people who want to quickly create a new problem to contribute to the track.

### Installation

Get the Yeoman CLI tool:
```
npm i -g yo
```

I don't intend on making this 'public' on the Yeoman website anytime soon, so you'll need to download or clone this repo one your computer and `npm link` it (which will cause the `yo` CLI to look for this generator locally instead of on the internet).
```
git clone git@github.com:jonboiser/generator-xr-problem
cd generator-xr-problem
npm link
```

### Generating R problem boilerplate

```
yo xr-problem problem_name [path_to_cases_json]
```

### Gotchas

Currently, I haven't put in a way to encode JSON as R code (e.g. arrays to vectors, and objects to lists). Thus, you may need to have to do some manual conversion of the test suite.

Here is a substitution rule I've been using in Atom for converting JS arrays to R vectors:

```
\[($.*)\] -> c($1)
```

### License

MIT

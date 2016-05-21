const generators = require('yeoman-generator');
const R = require('ramda');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.argument('problemName', {
          type: String,
          required: true,
        });

        this.argument('solutionJson', {
          type: String,
          required: true,
        });

        this.funcName = this.problemName.replace(/-/g, '_')
    },

    // Stub solution
    writeStub: function() {
      this.fs.copyTpl(
        this.templatePath('stub_solution.ejs'),
        this.destinationPath(`./${this.problemName}/${this.problemName}.R`),
        {
          funcName: this.funcName
        }
      )
    },

    // Example solution
    writeExample: function() {
      this.fs.copyTpl(
        this.templatePath('stub_solution.ejs'),
        this.destinationPath(`./${this.problemName}/example.R`),
        {
          funcName: this.funcName
        }
      )
    },

    // Parse JSON file of test cases
    parseJson: function() {
      if (this.solutionJson) {
        const solution = this.fs.readJSON(this.solutionJson)
        this.cases = solution.cases
      }
    },

    // Figure out which key is the input
    _whichKeyIsInput: function(keys) {
        // Filter out description and expected. Seems consistent.
        return R.difference(keys, ['description', 'expected']);
    },

    // Convert to R
    // i.e. [1,2,3] -> c(1,2,3)
    // ["a","b","c"] -> c("a","b","c")
    // { a: 1, b: 2 } = list(a=1, b=2)
    _convertToR: function(obj) {

    },

    // Create test suite
    writeTestSuite: function () {
      this.fs.copyTpl(
        this.templatePath('test_suite.ejs'),
        this.destinationPath(`./${this.problemName}/test_${this.problemName}.R`),
        {
          problemName: this.problemName,
          funcName: this.funcName,
          args: this._whichKeyIsInput(Object.keys(this.cases[0])),
          cases: this.cases
        }
      )
    }
});

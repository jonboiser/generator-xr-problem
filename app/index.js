const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.argument('problemName', {
          type: String,
          required: true,
        });

        this.argument('solutionJson', {
          type: String,
          required: false,
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
    },

    // Create test suite
    writeTestSuite: function () {
      this.fs.copyTpl(
        this.templatePath('test_suite.ejs'),
        this.destinationPath(`./${this.problemName}/test_${this.problemName}.R`),
        {
          problemName: this.problemName,
          numTests: 5,
          funcName: this.funcName,
          cases: this.cases
        }
      )
    }
});

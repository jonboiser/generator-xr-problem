const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.argument('problemName', {
          type: String,
          required: true,
        });

        this.argument('problemName', {
          type: String,
          required: false,
        });
    },

    // Stub solution
    writeStub: function() {
      this.fs.copyTpl(
        this.templatePath('stub_solution.ejs'),
        this.destinationPath(`./${this.problemName}/${this.problemName}.R`),
        {
          funcName: this.problemName.replace(/-/g, '_')
        }
      )
    },

    // Example solution
    writeExample: function() {
      this.fs.copyTpl(
        this.templatePath('stub_solution.ejs'),
        this.destinationPath(`./${this.problemName}/example.R`),
        {
          funcName: this.problemName.replace(/-/g, '_')
        }
      )
    },

    // Test suite
    writeTestSuite: function () {
      this.fs.copyTpl(
        this.templatePath('test_suite.ejs'),
        this.destinationPath(`./${this.problemName}/test_${this.problemName}.R`),
        {
          problemName: this.problemName,
          numTests: 5,
          funcName: 'fooBar'
        }
      )
    }
});

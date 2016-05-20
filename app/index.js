const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.problemName = 'foo-bar';
    },

    // Stub solution
    writeStub: function() {
      this.fs.copyTpl(
        this.templatePath('stub_solution.ejs'),
        this.destinationPath(`${this.problemName}.R`),
        {
          funcName: this.problemName.replace(/-/g, '_')
        }
      )
    },

    // Example solution
    writeExample: function() {
      this.fs.copyTpl(
        this.templatePath('stub_solution.ejs'),
        this.destinationPath('example.R'),
        {
          funcName: this.problemName.replace(/-/g, '_')
        }
      )
    },

    // Test suite
    writeTestSuite: function () {
      this.fs.copyTpl(
        this.templatePath('test_suite.ejs'),
        this.destinationPath(`test_${this.problemName}.R`),
        {
          problemName: this.problemName,
          numTests: 5,
          funcName: 'fooBar'
        }
      )
    }
});

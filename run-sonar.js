const scanner = require('sonarqube-scanner').default;  // Add .default here

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqa_9ffe45db5b0c1423094d003addd4599ceaa7b2bf',
    options: {
      'sonar.projectKey': 'bigleap',
      'sonar.projectName': 'BigLeap',
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': '.',
      'sonar.exclusions': 'node_modules/**,coverage/**,**/*.test.js',
      'sonar.tests': '.',
      'sonar.test.inclusions': '**/*.test.js',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
      'sonar.sourceEncoding': 'UTF-8'
    }
  },
  () => process.exit()
);
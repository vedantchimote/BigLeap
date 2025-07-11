const { execSync } = require('child_process');
const fs = require('fs');

// Create a temporary sonar-project.properties file
const propertiesContent = `
sonar.host.url=http://sonarqube:9000
sonar.login=sqa_9ffe45db5b0c1423094d003addd4599ceaa7b2bf
sonar.projectKey=bigleap
sonar.projectName=BigLeap
sonar.projectVersion=1.0.0
sonar.sources=.
sonar.exclusions=node_modules/**,coverage/**,**/*.test.js
sonar.tests=.
sonar.test.inclusions=**/*.test.js
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=coverage/test-reporter.xml
sonar.sourceEncoding=UTF-8
`;

fs.writeFileSync('sonar-project.properties', propertiesContent);

try {
  // Check if sonar-scanner is available
  try {
    execSync('which sonar-scanner || npm install -g sonar-scanner', { stdio: 'inherit' });
  } catch (e) {
    console.log('Installing sonar-scanner...');
    execSync('npm install -g sonar-scanner', { stdio: 'inherit' });
  }

  // Run sonar-scanner
  console.log('Running SonarQube analysis...');
  execSync('sonar-scanner', { stdio: 'inherit' });
  console.log('SonarQube analysis completed successfully!');
} catch (error) {
  console.error('Error running SonarQube analysis:', error.message);
  process.exit(1);
}
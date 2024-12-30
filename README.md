
# Daniel Morgan anwsers to the BBC API Test

This is my answers to the questions in the BBC API Test

## Features

- SuperTest for making HTTP requests and assertions
- Cucumber for behavior-driven development (BDD) testing
- Jest as the test runner
- HTML report generation for test results

## Project Structure

- `features/`: Contains Cucumber feature files
- `features/stepDefs/`: Contains step definitions and support files for Cucumber
- `report.js`: Script to generate HTML reports

## Configuration Files

- `jest.config.js`: Jest configuration
- `cucumber.js`: Cucumber configuration (if needed)

## Project Setup

Making sure you have latest version of Node.js which can be found at https://nodejs.org/en/download

Run the following command to install all the project dependencies:

```shell
npm install
```
## Running Tests

### Run All Tests

To execute the end-to-end tests using Cucumber:

```shell
npx cucumber-js
```

### Generate HTML Report

After running the Cucumber tests, generate an HTML report:

```shell
npm run generate:report
```


##  License

Copyright © 2024 Daniel Morgan. <br />












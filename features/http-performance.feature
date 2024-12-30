Feature: HTTP Response and Performance Tests

  Scenario: Scenario 1
    Given I am a user
    When I send a GET request to "/api/RMSTest/ibltest"
    Then the HTTP status code of the response is "200"
    And the response time of the request is below "1000" milliseconds

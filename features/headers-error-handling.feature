Feature: Response Headers and Error Handling

  Scenario: Scenario 6
    Given I am a user
    When I send a GET request to "/api/RMSTest/ibltest"
    Then the response headers verify the Date value

  Scenario: Scenario 7
    Given I am a user
    When I make a GET request to "/api/RMSTest/ibltest/2023-09-11"
    Then the HTTP status code of the response is "404"
    And the error object had the properties "details" and "http_response_code"
Feature: Episode Validation

  Scenario: Scenario 4
    Given I am a user
    When I send a GET request to "/api/RMSTest/ibltest"
    Then the only one episode in the list has Live field in Episode as true

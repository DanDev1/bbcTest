Feature: Data Validation (ID, Type, Title)

  Scenario: Scenario 2
    Given I am a user
    When I send a GET request to "/api/RMSTest/ibltest"
    Then the ID field is never null or empty for all 4 items present in the data array
    And the Type in Episode for every item is always Episode

  Scenario: Scenario 3
    Given I am a user
    When I send a GET request to "/api/RMSTest/ibltest"
    Then the Title field in Episode is never null or empty for any schedule item
Feature: Date Validation

  Scenario: Scenario 5
    Given I am a user
    When I send a GET request to "/api/RMSTest/ibltest"
    Then the Transmission_start date value is before the Transmission_end date

# Feature: Functional Manual Testing

#   Scenario: Verify Content-Type header is application/json
#     Given I am a user
#     When I send a GET request to "/api/RMSTest/ibltest"
#     Then the response header "Content-Type" should be "application/json"

#   Scenario: Verify all episode fields are present
#     Given I am a user
#     When I send a GET request to "/api/RMSTest/ibltest"
#     Then each episode should have the fields "id", "type", "title", "synopses", and "guidance"
#     And no episode field should be null or empty

#   Scenario: Verify response when no data is available
#     Given I am a user
#     When I send a GET request to "/api/RMSTest/ibltest"
#     Then the response should not be empty
#     And the "schedule" object should contain at least one element
Feature: Lift Status
  As a ski patrol
  I want to update the lift status with an app
  So that skiers can be notified in real time of a lift status change

  Scenario: View Lift Status
    When I load "http://localhost:3000"
    Then I should see a list of 11 chairlifts
    And I should see their current status

  Scenario: Change Lift Status
    When I load "http://localhost:3000"
    And I set the following lift status
      | lift | status |
      | Astra Express | closed |
      | Jaxx Cat | closed |
      | Wally's | open |
      | Neptune Rope | hold |
    And I refresh the page
    Then The status should reflect the change

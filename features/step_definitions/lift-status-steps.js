module.exports = function() {

    this.When(/^I load "([^"]*)"$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^I should see a list of (\d+) chairlifts$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^I should see their current status$/, function (callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.When(/^I set the following lift status$/, function (table, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.When(/^I refresh the page$/, function (callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^The status should reflect the change$/, function (callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

};
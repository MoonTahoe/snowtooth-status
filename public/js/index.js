YUI().use("Chairlift", function(Y) {

    var statusView,
        allLifts = new Y.AllChairs();

    statusView = new Y.LiftStatusView({ model: {
        title: 'Snowtooth Lift Status',
        id: 'lift-status-view',
        items: allLifts
    }});

    allLifts.load(function() {
        statusView.render();
    });

});
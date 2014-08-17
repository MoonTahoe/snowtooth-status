YUI({
    modules: {
        StopLight: {
            fullpath: 'http://localhost:3000/js/widget-stoplight.js',
            requires: ['base-build', 'widget']
        },
        Chairlift: {
            fullpath: 'http://localhost:3000/js/module-chairlift.js',
            requires: ['model','model-sync-rest','view','model-list', 'StopLight']
        }
    }
}).use("Chairlift", "router", function(Y) {

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
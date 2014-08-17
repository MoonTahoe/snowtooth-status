YUI.add("Chairlift", function(Y) {

    Y.Chairlift = Y.Base.create('chairlift', Y.Model, [Y.ModelSync.REST], {
        root: 'http://localhost:3000/lift/Jazz-Cat'
    });

}, "0.0.0", { requires: ['model','model-sync-rest'] });

YUI.add("StopLight", function(Y) {

    Y.StopLight = Y.Base.create('stopLight', Y.Widget, [], {
        renderUI: function() {
            this.get('contentBox').append('<p>' + this.get('title') + '<p>')
                .append('<span data-status="go" class="empty"></span>')
                .append('<span data-status="slow" class="empty"></span>')
                .append('<span data-status="stop" class="empty"></span>');
        },
        bindUI: function() {
            if (this.get("setable")) {
                this.get("contentBox").all("span").setStyle('cursor','pointer').on('click', function(e) {
                    this.set("status", e.currentTarget.getAttribute('data-status'));
                }, this);
            }
            this.after('statusChange', this.syncUI, this);
        },
        syncUI: function() {
            var status = this.get('status');
            this.get('contentBox').one('p').setHTML( this.get('title') );
            this.get('contentBox').all('span').set('className', 'empty');
            this.get('contentBox').one('span[data-status="' + status + '"]').removeClass("empty").addClass(status);
        }
    }, {
        ATTRS: {
            title: {
                value: "",
                validator: function(s) {
                    return Y.Lang.isString(s);
                }
            },
            setable: {
                value: false,
                validator: function(s) {
                    return Y.Lang.isBoolean(s);
                }
            },
            status: {
                value: "go",
                validator: function(s) {
                    return (/go|stop|slow/).test(s);
                }
            }
        }
    });

}, "0.0.0", { requires: ['base-build', 'widget'] });

YUI().use("StopLight", "Chairlift", function(Y) {

    var JazzCat = new Y.Chairlift({
        "name": "Jazz Cat",
        "type": "chair",
        "capacity": 6,
        "status": "open"
    });

    JazzCat.on("change", function() {
        JazzCat.save();
    });

    JazzCat.load(function() {

        var ChairStatus = new Y.StopLight({
            setable: true,
            title: JazzCat.get('name'),
            status: (JazzCat.get('status') == 'hold') ? 'slow' : (JazzCat.get('status') == 'open' ) ? 'go' : 'stop'
        });

        ChairStatus.render("#target");

        ChairStatus.after('statusChange', function() {
            JazzCat.set('status', (this.get('status') == 'go') ? 'open' : (this.get('status') == 'slow') ? 'hold' : 'closed');
        });

    });

});
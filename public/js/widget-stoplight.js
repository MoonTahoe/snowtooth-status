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
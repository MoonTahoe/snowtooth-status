YUI.add("Chairlift", function(Y) {

    Y.Chairlift = Y.Base.create('chairlift', Y.Model, [Y.ModelSync.REST], {
        root: 'http://localhost:3000/lift'
    });

    Y.AllChairs = Y.Base.create('allChairs', Y.ModelList, [Y.ModelSync.REST], {
        url: 'http://loicalhost:3000/lifts'
    });

    Y.LiftStatusView = Y.Base.create("liftStatusView", Y.View, [], {
        template: '<div id="{id}"><h1>{title}</h1></div>',
        render: function() {
            var model = this.get('model'),
                content  = Y.Lang.sub(this.template, model),
                container = this.get('container');

            container.setHTML(content);

            model.items.each(function(item) {

                var ChairStatus = new Y.StopLight({
                    title: item.get('name'),
                    status: (item.get('status') == 'hold') ? 'slow' : (item.get('status') == 'open' ) ? 'go' : 'stop'
                });

                ChairStatus.render(container);

            });

            if (!container.inDoc()) {
                Y.one('body').append(container);
            }
        }
    }, {
        ATTRS: {
            container: { value: Y.Node.create('<div></div>') }
        }
    });

}, "0.0.0", { requires: ['model','model-sync-rest','view','model-list', 'StopLight'] });

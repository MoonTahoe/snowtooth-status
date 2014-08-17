YUI.add("Chairlift", function (Y) {

    Y.Chairlift = Y.Base.create('chairlift', Y.Model, [Y.ModelSync.REST], {
        root: '/lift'
    });

    Y.AllChairs = Y.Base.create('allChairs', Y.ModelList, [Y.ModelSync.REST], {
        url: '/lifts',
        parseIOResponse: function (response) {
            var lifts = new Y.ModelList(),
                data = JSON.parse(response.responseText);

            Y.Array.forEach(data, function (l) {
                var lift = new Y.Chairlift(l);
                lift.set('id', l.name.replace(/ /g, '-'));
                lifts.add(lift);
            });

            return lifts;
        }
    });

    Y.LiftStatusView = Y.Base.create("liftStatusView", Y.View, [], {
        template: '<div id="{id}"><h1>{title}</h1></div>',
        render: function () {
            var model = this.get('model'),
                content = Y.Lang.sub(this.template, model),
                container = this.get('container');

            container.setHTML(content);

            model.items.each(function (item) {

                var ChairStatus = new Y.StopLight({
                    setable: true,
                    title: item.get('name'),
                    status: (item.get('status') == 'hold') ? 'slow' : (item.get('status') == 'open' ) ? 'go' : 'stop'
                });

                ChairStatus.after('statusChange', function () {
                    item.set('status', (ChairStatus.get('status') == 'go') ? 'open' : (ChairStatus.get('status') == 'slow') ? 'hold' : 'closed');
                    item.save();
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

}, "0.0.0", { requires: ['model', 'model-sync-rest', 'view', 'model-list', 'StopLight'] });

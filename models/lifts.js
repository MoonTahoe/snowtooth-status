var fs = require('fs');

//
//  TODO: Comment Code
//

module.exports = function (data) {

    if (typeof data == "string") {
        lifts = JSON.parse(data);
    } else {
        lifts = data;
    }

    return {

        fetch: function () {

            var opts, done, filtered;

            if (arguments.length == 2) {
                opts = arguments[0];
                done = arguments[1];
            } else {
                opts = null;
                done = arguments[0];
            }

            if (!opts) {
                return done(lifts);
            } else if (opts.name) {
                filtered = lifts.filter(function (lift) {
                    return lift.name.toLowerCase() == opts.name.toLowerCase();
                })[0];
                return done(filtered);
            } else {

                var filtered = lifts;

                if (opts.status) {
                    filtered = filtered.filter(function (lift) {
                        return lift.status == opts.status;
                    });
                }

                if (opts.type) {
                    filtered = filtered.filter(function (lift) {
                        return lift.type == opts.type;
                    });
                }

                if (opts.capacity) {
                    filtered = filtered.filter(function (lift) {
                        return lift.capacity == opts.capacity;
                    });
                }

                return done(filtered);
            }

        },

        close: function (liftName) {
            this.fetch({ name: liftName }, function (lift) {
                lift.status = 'closed';
            });
        },

        hold: function (liftName) {
            this.fetch({ name: liftName }, function (lift) {
                lift.status = 'hold';
            });
        },

        open: function (liftName) {
            this.fetch({ name: liftName }, function (lift) {
                lift.status = 'open';
            });

        }

    };

};




var expect = require('chai').expect,
    model = require('../../models/lifts');

describe("Lift Model", function () {

    function steps(steps, done) {
        var i = 0;
        return function () {
            if (++i == steps) {
                done();
            }
        }
    }

    beforeEach(function () {
        this.data = [
            {
                "name": "Chairlift One",
                "type": "chair",
                "capacity": 2,
                "status": "open"
            },
            {
                "name": "Chairlift Two",
                "type": "chair",
                "capacity": 4,
                "status": "open"
            },
            {
                "name": "Gondola",
                "type": "gondola",
                "capacity": 8,
                "status": "hold"
            },
            {
                "name": "Rope Tow",
                "type": "tow",
                "capacity": 1,
                "status": "closed"
            }
        ];
        this.liftModel = model(this.data);
    });

    it("should fetch all lifts", function (done) {
        this.liftModel.fetch(function (allLifts) {
            expect(allLifts).to.be.an.instanceof(Array);
            expect(allLifts.length).to.equal(4);
            done();
        });
    });

    it("should fetch a single lift by name", function () {
        var self = this;
        this.liftModel.fetch({ name: 'Gondola'}, function (lift) {
            expect(lift).to.deep.equal(self.data[2]);
        });
    });
    it("should fetch lifts by status", function (done) {

        var self = this,
            finished = steps(3, done);

        this.liftModel.fetch({ status: 'closed' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[3]);
            finished();
        });

        this.liftModel.fetch({ status: 'hold' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[2]);
            finished();
        });

        this.liftModel.fetch({ status: 'open' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(2);
            expect(lifts[0]).to.deep.equal(self.data[0]);
            finished();
        });

    });
    it("should fetch lifts by type", function (done) {

        var self = this,
            finished = steps(3, done);

        this.liftModel.fetch({ type: 'chair' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(2);
            expect(lifts[0]).to.deep.equal(self.data[0]);
            finished();
        });

        this.liftModel.fetch({ type: 'tow' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[3]);
            finished();
        });

        this.liftModel.fetch({ type: 'gondola' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[2]);
            finished();
        });
    });
    it("should fetch lifts by capacity", function (done) {

        var self = this,
            finished = steps(3, done);

        this.liftModel.fetch({ capacity: 1 }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[3]);
            finished();
        });

        this.liftModel.fetch({ capacity: 2 }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[0]);
            finished();
        });

        this.liftModel.fetch({ capacity: 8 }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[2]);
            finished();
        });

    });
    it("should fetch lifts by a combination of filters", function (done) {

        var self = this;

        this.liftModel.fetch({ status: 'open', capacity: 4, type: 'chair' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[1]);
            done();
        });

    });
    it("should set lift status to closed", function () {
        this.liftModel.close('Chairlift One');
        this.liftModel.fetch({ name: 'Chairlift One' }, function (chair) {
            expect(chair.status).to.equal("closed");
        });
    });
    it("should set lift status to open", function () {
        this.liftModel.open('Rope Tow');
        this.liftModel.fetch({ name: 'Rope Tow' }, function (chair) {
            expect(chair.status).to.equal("open");
        });
    });
    it("should set lift status to hold", function () {
        this.liftModel.hold('Chairlift Two');
        this.liftModel.fetch({ name: 'Chairlift Two' }, function (chair) {
            expect(chair.status).to.equal("hold");
        });
    });

});
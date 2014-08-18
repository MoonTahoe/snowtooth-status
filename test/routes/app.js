var request = require('supertest'),
    app = require('../../app'),
    model = require('../../models/lifts');

describe("API Routes", function () {

    it("should load all lifts", function(done) {

        request(app)
            .get('/lifts')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load a lift by name", function(done) {

        request(app)
            .get('/lift/Jazz-Cat')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all chairlifts", function(done) {

        request(app)
            .get('/lifts/chair')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all rope tows", function(done) {

        request(app)
            .get('/lifts/tow')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all gondolas", function(done) {

        request(app)
            .get('/lifts/gondola')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all open lifts", function(done) {

        request(app)
            .get('/lifts/status/open')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all closed lifts", function(done) {

        request(app)
            .get('/lifts/status/closed')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all lifts on wind hold", function(done) {

        request(app)
            .get('/lifts/status/hold')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should load all lifts by capacity", function(done) {

        request(app)
            .get('/lifts/capacity/6')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);

    });

    it("should set lift status", function(done) {

        request(app).put('/lift/Chairlift-One')
            .set('Accept', 'application/json')
            .send({ 'status': 'closed' })
            .expect(200)
            .end(done);

    });

});

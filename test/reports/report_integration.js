process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Add order', () => {
    describe('POST /reports', () => {
        it('should get 200 HAPPY PATH', (done) => {
            var payload = {
            name: 1,
            description: "komom test",
            texten: "test text"
            };

            chai.request(server)
                .post("/reports")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Your report has been added");
                    done();
                });
        });
    });
});

describe('Get order', () => {
    describe('GET /reports', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });
});

describe('Revidate reports', () => {
    describe('PUT /reports', () => {
        it('should get 200 HAPPY PATH', (done) => {
            var payload = {
            name: 1,
            description: "komom test nytt",
            texten: "test text nytt",
            id: 1
            };

            chai.request(server)
                .put("/reports")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.type.should.be.an("string");
                    res.body.data.week.should.equal(1);
                    res.body.data.description.should.equal("komom test nytt");
                    res.body.data.texten.should.equal("test text nytt");
                    // console.log(res.body.data);
                    done();
                });
        });
    });

    describe('PUT /reports id error', () => {
        it('should get 400 PATH', (done) => {
            var payload = {
            name: 1,
            description: "komom test nytt",
            texten: "test text nytt",
            // id: 1
            };

            chai.request(server)
                .put("/reports")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.errors.detail.should.equal("Required attribute reports id (id) " +
                    " was not included in the request.");
                    done();
                });
        });
    });

});

describe('Get me', () => {
    describe('GET /me', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/me")
                .end((err, res) => {
                    // res.should.have.status(200);
                    // console.log(res.body.description);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    res.body.description.length.should.be.above(0);
                    done();
                });
        });
    });
});

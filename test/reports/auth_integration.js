process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Registrer', () => {
    describe('POST /registrer', () => {
        it('should get 201 HAPPY PATH', (done) => {
            var payload = {
            name: "framtiden",
            email: "dd@dd.dd",
            year: "2018",
            month: "05",
            day: "19",
            password: "1!Password"
        };

            chai.request(server)
                .post("/register")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    console.log(res.body);
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User successfully registered.");
                    done();
                });
        });
    });
});

describe('Registrer', () => {
    describe('POST /registrer missing email', () => {
        it('should get status 401', (done) => {
            var payload = {
            name: "framtiden",
            // email: "dd@dd.dd",
            year: "2018",
            month: "05",
            day: "19",
            password: "1!Password"
        };

            chai.request(server)
                .post("/register")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    console.log(res.body);
                    res.body.errors.detail.should.equal("Email or password missing in request");
                    done();
                });
        });
    });
});

describe('Registrer', () => {
    describe('POST /registrer missing name', () => {
        it('should get status 500', (done) => {
            var payload = {
            // name: "framtiden",
            email: "dd@dd.dd",
            year: "2018",
            month: "05",
            day: "19",
            password: "1!Password"
        };

            chai.request(server)
                .post("/register")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    console.log(res.body);
                    res.body.errors.detail.should.equal('SQLITE_CONSTRAINT: NOT NULL constraint failed: users.name');
                    done();
                });
        });
    });
});

describe('login', () => {
    describe('POST /login', () => {
        it('should get status 200', (done) => {
            var payload = {
            email: "dd@dd.dd",
            password: "1!Password"
        };

            chai.request(server)
                .post("/login")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    console.log(res.body);
                    res.body.data.message.should.equal('User logged in');
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('Missing email should get status 401', (done) => {
            var payload = {
            // email: "dd@dd.dd",
            password: "1!Password"
        };

            chai.request(server)
                .post("/login")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.detail.should.equal("Email or password missing in request");

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('Wrong password should get status 401', (done) => {
            var payload = {
            email: "dd@dd.dd",
            password: "1!Passwor"
        };

            chai.request(server)
                .post("/login")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.detail.should.equal("Password is incorrect.");

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('Wrong user should get status 401', (done) => {
            var payload = {
            email: "dd@dd.ddnnann",
            password: "1!Password"
        };

            chai.request(server)
                .post("/login")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.equal("User not found");

                    done();
                });
        });
    });



});

// describe('Get reports', () => {
//     describe('GET /reports', () => {
//         it('200 HAPPY PATH', (done) => {
//             chai.request(server)
//                 .get("/reports/")
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an("object");
//                     res.body.data.should.be.an("array");
//                     res.body.data.length.should.be.above(0);
//                     done();
//                 });
//         });
//     });
// });
//
// describe('Revidate reports', () => {
//     describe('PUT /reports', () => {
//         it('should get 200 HAPPY PATH', (done) => {
//             var payload = {
//             name: 1,
//             description: "komom test nytt",
//             texten: "test text nytt",
//             id: 1
//             };
//
//             chai.request(server)
//                 .put("/reports")
//                 .send(payload)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an("object");
//                     res.body.data.should.be.an("object");
//                     res.body.data.type.should.be.an("string");
//                     res.body.data.week.should.equal(1);
//                     res.body.data.description.should.equal("komom test nytt");
//                     res.body.data.texten.should.equal("test text nytt");
//                     // console.log(res.body.data);
//                     done();
//                 });
//         });
//     });
//
//     describe('PUT /reports id error', () => {
//         it('should get 400 PATH', (done) => {
//             var payload = {
//             name: 1,
//             description: "komom test nytt",
//             texten: "test text nytt",
//             // id: 1
//             };
//
//             chai.request(server)
//                 .put("/reports")
//                 .send(payload)
//                 .end((err, res) => {
//                     res.should.have.status(400);
//                     res.body.errors.detail.should.equal("Required attribute reports id (id) " +
//                     " was not included in the request.");
//                     done();
//                 });
//         });
//     });
//
//     // describe('POST /reports database error', () => {
//     //     it('should get 500 PATH', (done) => {
//     //         var payload = {
//     //         // name: 1,
//     //         // description: "komom test nytt",
//     //         // texten: "test text nytt",
//     //         // id: 1
//     //         };
//     //
//     //         chai.request(server)
//     //             .post("/reports")
//     //             .send(payload)
//     //             .end((err, res) => {
//     //                 res.should.have.status(500);
//     //                 res.body.errors.titel.should.equal("Database error");
//     //                 done();
//     //             });
//     //     });
//     // });
// });

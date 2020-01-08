const db = require("../db/database.js");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


const reports = {

    // getReports: function(res) {
    //     db.all("SELECT * FROM reports",
    //     (err, rows) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 errors: {
    //                     status: 500,
    //                     source: "/reports",
    //                     title: "Database error",
    //                     detail: err.message
    //                 }
    //             });
    //         }
    //
    //         return res.json( { data: rows } );
    //     });
    // },

    getReports: function(res, req) {
        // res.send('please select a collection, e.g., /collections/messages')
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("market");
          var query = { name: "jj@jj.co" };
          dbo.collection("customers").find(query).sort({_id:-1}).limit(1).toArray(function(err,  documents) {
            if (err) throw err;
            console.log(documents);
            return res.send(documents);
            // res.json(res);
            db.close();
            // return res;
            // res.json(result)

          });
          // return res.json({
          //
          //     data: { type: res
          //         // type: "falure",
          //         // message: "Your report has been added",
          //     }
          // });


        });

  },

  getReport: function(res, userId) {
      // res.send('please select a collection, e.g., /collections/messages')
      console.log(userId);
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("market");
        var query = { name: userId };
        dbo.collection("customers").find(query).sort({_id:-1}).toArray(function(err,  documents) {
          if (err) throw err;
          console.log(documents);
          return res.send(documents);
          // res.json(res);
          db.close();
          // return res;
          // res.json(result)

        });
        // return res.json({
        //
        //     data: { type: res
        //         // type: "falure",
        //         // message: "Your report has been added",
        //     }
        // });


      });

},

    // getReport: function(res, reportId) {
    //     db.get("SELECT * FROM reports" +
    //         " WHERE reportId = ?",
    //     reportId, (err, report) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 errors: {
    //                     status: 500,
    //                     source: "/report/" + reportId,
    //                     title: "Database error",
    //                     detail: err.message
    //                 }
    //             });
    //         }
    //         return res.json( { data: report } );
    //         });
    //     },

    // addReport: function(res, body) {
    //     db.run("INSERT INTO reports (name, description, texten) VALUES (?, ?, ?)",
    //     body.name,
    //     body.description,
    //     body.texten,
    //     function(err) {
    //         if (err) {
    //             return res.status(500).json({
    //                 errors: {
    //                     status: 500,
    //                     source: "POST /reports",
    //                     title: "Database error",
    //                     detail: err.message
    //                 }
    //             });
    //         }
    //         return res.json({
    //
    //             data: {
    //                 type: "success",
    //                 message: "Your report has been added",
    //                 week: body.name,
    //                 description: body.description,
    //                 texten: body.texten,
    //             }
    //         });
    //     });
    // },

    addReport: function(res, body) {

        // console.log(body);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("market");
            var myobj = body;
            dbo.collection("customers").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
            return res.json({

                data: {
                    type: "success",
                    message: "Your report has been added",
                }
            });
        });
        // db.run("INSERT INTO reports (name, description, texten) VALUES (?, ?, ?)",
        // body.name,
        // body.description,
        // body.texten,
        // function(err) {
        //     if (err) {
        //         return res.status(500).json({
        //             errors: {
        //                 status: 500,
        //                 source: "POST /reports",
        //                 title: "Database error",
        //                 detail: err.message
        //             }
        //         });
        //     }
        //     return res.json({
        //
        //         data: {
        //             type: "success",
        //             message: "Your report has been added",
        //             week: body.name,
        //             description: body.description,
        //             texten: body.texten,
        //         }
        //     });
        // });


    },

    updateReport: function(res, body) {
        // console.log(body);
        if (Number.isInteger(parseInt(body.id))) {
            // console.log(body);
            db.run("UPDATE reports SET name = ?, description = ?, texten = ? WHERE id = ?",
            body.name,
            body.description,
            body.texten,
            body.id, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "PUT /reports",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                return res.json({

                    data: {
                        type: "success",
                        message: "Your report has been revidated",
                        week: body.name,
                        description: body.description,
                        texten: body.texten,
                    }
                });
                // return res.json( { data: report } );
                // return res.status(204).send();
            });
        } else {
            return res.status(400).json({
                errors: {
                    status: 400,
                    detail: "Required attribute reports id (id) " +
                        " was not included in the request."
                }
            });
        }
    },

};

module.exports = reports;

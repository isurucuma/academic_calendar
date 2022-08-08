const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");

describe("DB CRUD Operations", () => {
    // get all events
    test("GET -> /events --> array of events", () => {
        return request(app)
            .get("/api/events")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            event: expect.objectContaining({
                                _id: expect.any(String),
                                eventTitle: expect.any(String),
                                startDate: expect.any(String),
                                endDate: expect.any(String),
                                description: expect.any(String),
                                batch: expect.any(String),
                                __v: expect.any(Number),
                            }),
                        }),
                    ])
                );
            });
    });

    let newId;

    // create new event
    test("POST -> /events/create --> ", () => {
        return (
            request(app)
                .post("/api/events/create")
                .send({
                    title: "62e0226ae94516d45d442f16",
                    startDate: "2020-01-01",
                    endDate: "2020-01-01",
                    description: "Test Event",
                    batch: "Test Batch",
                })
                //.expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            _id: expect.any(String),
                            title: "62e0226ae94516d45d442f16",
                            startDate: "2020-01-01T00:00:00.000Z",
                            endDate: "2020-01-01T00:00:00.000Z",
                            description: "Test Event",
                            batch: "Test Batch",
                            __v: expect.any(Number),
                        })
                    );

                    newId = response.body._id;
                })
        );
    });

    // update event
    test("PUT -> /api/events/update/:id --> ", () => {
        return (
            request(app)
                .put(`/api/events/update/${newId}`)
                .send({
                    title: "62e0226ae94516d45d442f16",
                    startDate: "2020-01-01T00:00:00.000Z",
                    endDate: "2020-01-01T00:00:00.000Z",
                    description: "Test Event: this going to be deleted",
                    batch: "Test Batch",
                })
                //.expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            _id: newId,
                            title: "62e0226ae94516d45d442f16",
                            startDate: "2020-01-01T00:00:00.000Z",
                            endDate: "2020-01-01T00:00:00.000Z",
                            description: "Test Event: this going to be deleted",
                            batch: "Test Batch",
                            __v: expect.any(Number),
                        })
                    );
                })
        );
    });

    // delete event
    test("DELETE -> /api/events/delete/:id --> ", () => {
        return request(app)
            .delete(`/api/events/delete/${newId}`)
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: newId,
                        title: "62e0226ae94516d45d442f16",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event: this going to be deleted",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );
            });
    });
    afterAll((done) => {
        // // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
        done();
    });
});

// testing for the notifications route
describe("Notifications", () => {
    // send notification
    test("POST -> /api/notifications/sendnotifications --> ", () => {
        return request(app)
            .post("/api/notifications/sendnotifications")
            .send({
                emails: ["2018e022@eng.jfn.ac.lk", "2018e031@eng.jfn.ac.lk"],
                message: "This message is from the test",
            })
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((data) => {
                // expect.objectContaining({
                //     message: "Notification sent successfully",
                // });
                console.log(data);
            });
    });
});

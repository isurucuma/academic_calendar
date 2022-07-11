const request = require("supertest");
const app = require("./app");

describe("DB CRUD Operations", () => {
    // get all events
    test("GET -> /events --> array of events", () => {
        return request(app)
            .get("/events")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(String),
                            title: expect.any(String),
                            startDate: expect.any(String),
                            endDate: expect.any(String),
                            description: expect.any(String),
                            batch: expect.any(String),
                            __v: expect.any(Number),
                        }),
                    ])
                );
            });
    });

    let newId;

    // create new event
    test("POST -> /events/create --> ", () => {
        return request(app)
            .post("/events/create")
            .send({
                title: "Test Event",
                startDate: "2020-01-01",
                endDate: "2020-01-01",
                description: "Test Event",
                batch: "Test Batch",
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        title: "Test Event",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );

                newId = response.body._id;
            });
    });

    // update event
    test("PUT -> /events/update/:id --> ", () => {
        return request(app)
            .put(`/events/update/${newId}`)
            .send({
                title: "Test Event updated",
                startDate: "2020-01-01T00:00:00.000Z",
                endDate: "2020-01-01T00:00:00.000Z",
                description: "Test Event: this going to be deleted",
                batch: "Test Batch",
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: newId,
                        title: "Test Event updated",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event: this going to be deleted",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );
            });
    });

    // delete event
    test("DELETE -> /events/update/:id --> ", () => {
        return request(app)
            .delete(`/events/update/${newId}`)
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: newId,
                        title: "Test Event updated",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event: this going to be deleted",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );
            });
    });

    // update event for the delete
    // update event for the updating event params

    afterAll((done) => {
        // // Closing the DB connection allows Jest to exit successfully.
        // mongoose.connection.close();
        done();
    });
});

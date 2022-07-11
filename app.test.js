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
                            title: expect.any(String),
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

    // create new event
    test("POST -> /events/create --> ", () => {
        return request(app)
            .post("/events/create")
            .send({
                _id: "5e9f8f8f8f8f8f8f8f8f8f8",
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
                        _id: "5e9f8f8f8f8f8f8f8f8f8f8",
                        title: "Test Event",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );
            });
    });

    // update event
    test("PUT -> /events/update/:id --> ", () => {
        return request(app)
            .put("/events/update/5e9f8f8f8f8f8f8f8f8f8f8")
            .send({
                title: "Test Event updated",
                startDate: "2020-01-01",
                endDate: "2020-01-01",
                description: "Test Event updated",
                batch: "Test Batch",
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        title: "Test Event updated",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event updated",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );
            });
    });

    // delete event
    test("DELETE -> /events/delete/:id --> ", () => {
        return request(app)
            .delete("/events/delete/5e9f8f8f8f8f8f8f8f8f8f8")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: "5e9f8f8f8f8f8f8f8f8f8f8",
                        title: "Test Event updated",
                        startDate: "2020-01-01T00:00:00.000Z",
                        endDate: "2020-01-01T00:00:00.000Z",
                        description: "Test Event updated",
                        batch: "Test Batch",
                        __v: expect.any(Number),
                    })
                );
            });
    });

    // update event for the delete
    // update event for the updating event params
});

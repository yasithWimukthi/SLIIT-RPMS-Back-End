import request from 'supertest'
import app from "../app.js"
import conn from "../db.js"




describe('GET /get-all', function () {
    it('respond with json containing a list of all students',  (done) =>{
        request(app)
            .get('/api/student/get-all')
            .expect(200, done)

    });
});


describe('POST /get-group', function () {
    it('respond with json containing a student group',  (done) =>{
        request(app)
            .post('/api/student/get-group')
            .set({"studentId":"629b021295d1b83d096cc3e1"})
            .expect(200, done)

    });


});


describe('GET /get-students-no-group', function () {
    it('respond with json containing a list of all students without a group',  (done) =>{
        request(app)
            .get('/api/student/get-students-no-group')
            .expect(200, done)

    });
});

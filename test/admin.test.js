import request from 'supertest'
import app from "../app.js"
import conn from "../db.js"




describe('GET /get-academicStaff', function () {
    it('respond with json containing a list of all staff',  (done) =>{
        request(app)
            .get('/api/admin/get-academicStaff')
            .expect(201, done)

    });
});


describe('GET /get-students', function () {
    it('respond with json containing a list of all students',  (done) =>{
        request(app)
            .get('/api/admin/get-students')
            .expect(201, done)

    });
});


describe('GET /get-submissions', function () {
    it('respond with json containing a list of all submissions',  (done) =>{
        request(app)
            .get('/api/admin/get-submissions')
            .expect(201, done)

    });
});


describe('GET /get-panel', function () {
    it('respond with json containing a list of all panels',  (done) =>{
        request(app)
            .get('/api/admin/get-panel')
            .expect(201, done)

    });
});
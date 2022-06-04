import request from 'supertest'
import app from "../app.js"
import conn from "../db.js"
import { expect,jest } from '@jest/globals'



describe('GET /get-all', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/api/student/get-all')
            .expect(200, done);
    });
});


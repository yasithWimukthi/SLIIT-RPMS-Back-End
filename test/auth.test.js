import request from 'supertest'
import app from "../app.js"
import conn from "../db.js"



describe('POST /login', function () {
    it('respond with 500 for wrong data',  (done) =>{


        let data = {
            email: "123@gmail.com",
            password: "1234",
        }

        request(app)
            .post('/api/auth/login')
            .set(data)
            .expect(500, done)

    });


});



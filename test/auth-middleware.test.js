const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/checkToken');
const sinon = require('sinon');

describe('AUTH MIDDLEWARE TESTS', function () {
    it('should throw an error if no authorization header is given', function () {
        const req = {
            headers: {
                authorization: undefined
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('No authorization token provided');
    })

    it('should throw an error if the authorization header is one string', function() {
        const req = {
            get: function (header) {
                return 'Bearer';
            }
        }

        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    })

    it('should throw an error if the token cannot be verified', function () {
        const req = {
            get: function (header) {
                return 'Hello'
            }
        }

        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    })

    it('should not throw an error in case of valid token', function() {
        const req = {
            headers: {
                authorization: 'Valid Token'
            },
            get: function (header) {
                return 'Valid Token'
            }
        }

        sinon.stub(jwt, 'verify'); //Use sinon stubs to override library methods used
        jwt.verify.returns({ test: "hello" }) // Return anything to simulate a valid token
        expect(authMiddleware.bind(this, req, {}, () => {})).to.not.throw();
        jwt.verify.restore(); //Restore the verify function to its original state
    })
})


/* eslint-disable node/no-callback-literal */
const userSchema = require('../models/userSchema');
const userController = require('./userController')(userSchema);

describe('userController', () => {
  describe('getMethod', () => {
    test('should call json', () => {
      const res = {
        json: jest.fn()
      };
      userSchema.find = jest.fn().mockImplementationOnce((query, callback) => {
        callback(false, {});
      });
      userController.getUserMethod(null, res);
      expect(res.json).toHaveBeenCalled();
    });

    test('should call json with error', () => {
      const res = {
        json: jest.fn(),
        send: jest.fn()
      };
      userSchema.find = jest.fn().mockImplementationOnce((query, callback) => {
        callback(true, {});
      });
      userController.getUserMethod(null, res);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('patchMethod', () => {
    test('should call json', () => {
      const res = {
        json: jest.fn()
      };
      const req = {
        body: { uid: 'uid' }
      };
      userSchema.findOneAndUpdate = jest.fn().mockImplementationOnce((query, body, upsert, callback) => {
        callback(false, {});
      });
      userController.patchUserMethod(req, res);
      expect(res.json).toHaveBeenCalled();
    });

    test('should call json with error', () => {
      const res = {
        json: jest.fn(),
        send: jest.fn()
      };
      const req = {
        body: { uid: 'uid' }
      };

      userSchema.findOneAndUpdate = jest.fn().mockImplementationOnce((query, body, upsert, callback) => {
        callback(true, {});
      });
      userController.patchUserMethod(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });
});

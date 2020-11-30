const workoutSchema = require('../models/workoutSchema');
const workoutController = require('./workoutController')(workoutSchema);

describe('workoutController', () => {
  describe('GetMethod', () => {
    test('should call json', () => {
      const res = {
        json: jest.fn()
      };

      const req = {
        params: { workoutId: '1' }
      };

      workoutSchema.findOne = jest.fn().mockImplementationOnce((query, callback) => {
        callback(false, {});
      });

      workoutController.getWorkoutMethod(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    test('should call json with an error', () => {
      const res = {
        json: jest.fn(),
        send: jest.fn()
      };

      const req = {
        params: { workoutId: '1' }
      };

      workoutSchema.findOne = jest.fn().mockImplementationOnce((query, callback) => {
        callback(true, {});
      });

      workoutController.getWorkoutMethod(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});

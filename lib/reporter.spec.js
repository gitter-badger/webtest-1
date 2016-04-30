'use strict';
var fs = require('fs');
var Scenario = require('./scenario');
var Status = require('./status');
var Reporter = require('./reporter');

describe('Reporter', () => {
  
  let reporter;
  
  beforeEach( () => {
    spyOn(fs, "accessSync").and.returnValue(true);
    spyOn(fs, "readFileSync").and.returnValue('123');
    spyOn(Scenario, "parse").and.returnValue({
      name: 'scenario 1',
      status: Status.PENDING,
      testCases: [
        {
          name: 'test case 1',
          status: Status.PENDING,
          testSteps: [
            {name: '1', status: Status.PENDING},
            {name: '2', status: Status.PENDING},
          ]
        },
        {
          name: 'test case 2',
          status: Status.PENDING,
          testSteps: [
            {name: '1', status: Status.PENDING},
            {name: '2', status: Status.PENDING},
          ]
        }
      ]
    });
    
    reporter = new Reporter('aFile');
  });
  
  describe('#init', () => {
    it('should init from a file', () => {
      expect(reporter.scenario.name).toBe('scenario 1');
    });
  });
  
  describe('#start', () => {
    it('should set a scenario started', () => {
      reporter.start(Scenario.SCENARIO);
      expect(reporter.scenario.status).toBe(Status.STARTED);
    });
    it('should set a testcase started', () => {
      reporter.start(Scenario.TESTCASE, 'test case 1');
      expect(reporter.scenario.testCases[0].status).toBe(Status.STARTED);
    });
    it('should set a teststep started', () => {
      reporter.start(Scenario.TESTSTEP);
      expect(reporter.scenario.testCases[0].testSteps[0].status).toBe(Status.STARTED);
      reporter.start(Scenario.TESTSTEP);
      expect(reporter.scenario.testCases[0].testSteps[1].status).toBe(Status.STARTED);
    });
  });

  describe('#success', () => {
    it('should set a scenario succeeded', () => {
      reporter.success(Scenario.SCENARIO);
      expect(reporter.scenario.status).toBe(Status.SUCCESS);
    });
    it('should set a testcase succeeded', () => {
      reporter.success(Scenario.TESTCASE, 'test case 1');
      expect(reporter.scenario.testCases[0].status).toBe(Status.SUCCESS);
    });
    it('should set a teststep succeeded', () => {
      reporter.success(Scenario.TESTSTEP);
      expect(reporter.scenario.testCases[0].testSteps[0].status).toBe(Status.SUCCESS);
      reporter.success(Scenario.TESTSTEP);
      expect(reporter.scenario.testCases[0].testSteps[1].status).toBe(Status.SUCCESS);
    });
  });

  describe('#fail', () => {
    it('should set a scenario error', () => {
      reporter.fail(Scenario.SCENARIO);
      expect(reporter.scenario.status).toBe(Status.ERROR);
    });
    it('should set a testcase error', () => {
      reporter.fail(Scenario.TESTCASE, 'test case 1');
      expect(reporter.scenario.testCases[0].status).toBe(Status.ERROR);
    });
    it('should set a teststep error', () => {
      reporter.fail(Scenario.TESTSTEP);
      expect(reporter.scenario.testCases[0].testSteps[0].status).toBe(Status.ERROR);
      reporter.fail(Scenario.TESTSTEP);
      expect(reporter.scenario.testCases[0].testSteps[1].status).toBe(Status.ERROR);
    });
  });
});
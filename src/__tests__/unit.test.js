import chai from 'chai';
import sinon from 'sinon';
import {
  describe, it,
} from 'mocha';
import CSVService from '../services/csv';

const { expect } = chai;
const sandbox = sinon.createSandbox();
describe('unit tests', () => {
  it('CSV', async () => {
    sandbox.stub(CSVService, 'toCSV').resolves('success');
    const res = await CSVService.toCSV([1, 2, 3]);
    expect(res).to.eql('success');
    sandbox.restore();
  });
});

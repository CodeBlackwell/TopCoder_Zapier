const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('My App', () => {
    it('should load active challenges', (done) => {
        const bundle = {};

        appTester(App.triggers.activeChallenge.operation.perform, bundle)
            .then(results => {
                should(results.length).above(1);
                done();
            })
            .catch(done);
    });

    it('should filter challenges by type', (done) => {
        const bundle = { inputData: { type: 'design'}};

        appTester(App.triggers.activeChallenge.operation.perform, bundle)
            .then(results => {
                should(results[0].challengeCommunity).equal('design');
                done();
            })
            .catch(done);
    });
});
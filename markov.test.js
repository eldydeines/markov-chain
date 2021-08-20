const { MarkovMachine } = require('./markov.js');


describe("Markov Class Tests", function () {

    let mm = new MarkovMachine("the cat in the hat");

    test('if chain is string', function () {

        let chain = mm.makeText();
        expect(chain).toEqual(expect.any(String));
    })

    test('Object is returned', function () {

        let chains = mm.chains;
        expect(chains).toEqual(expect.any(Object));

    });

});
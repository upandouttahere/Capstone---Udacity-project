var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

contract('Verifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const proof = {
        "proof": {
            "a": ["0x1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033", "0x04a81e18c8c57362b000213bce6d533055ba4f830dc76abf9c5bf37907ffbdd0"],
            "b": [["0x272c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e9560", "0x1535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc94"], ["0x26e8a26d9bd754c038c42bb9b5b32b91a0c1463aba53b03eb8e224f1230f853a", "0x2c080f65faca972f26229da56b338fc12d62261f8626ec42659bc1090e7a983d"]],
            "c": ["0x08c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f", "0x2f85944aef8c9f217463077e0d8f85fdf5546b3b570820ade0cf9c95a3feb440"]
        },
        "inputs": [9, 1]
    }

    describe('test solnSquareVerifier', function () {
        beforeEach(async function () { 
            let verifierContract = await Verifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: account_one});
        })

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

        it('ERC721 token can be minted for contract - SolnSquareVerifier', async function () { 
            await this.contract.mintNewNFT(account_two, 1, a, b, c, inputs); // error: a is not defined - is it not defined in line 10?
            assert.equal(await this.contract.ownerOf(1), account_two, "not the expected owner");
        })

 // Test if a new solution can be added for contract - SolnSquareVerifier

        it('Test if a new solution can be added for contract', async function () {
            const [a, b, c, inputs] = [proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs]; 
            let key = await this.contract.getVerifierKey.call(a, b, c, inputs);
            let result = await this.contract.addSolution(account_two, 2, key);

            // Test event is emitted
            // assert.equal(result.logs.length, 1, "No events were triggered.");
            let solutionAddedEmitted = false;
            let logs = result.logs;
            logs.forEach(log => {
                if (log.event == "solutionAdded") {
                    solutionAddedEmitted = true;
                }
            })
            assert.equal(solutionAddedEmitted,true, "solutionAdded was not emitted");
        });
    });
})
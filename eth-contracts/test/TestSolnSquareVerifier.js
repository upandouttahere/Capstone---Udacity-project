var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

contract('Verifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const proof = {
        "proof":
        {
            "A":["0x712a26513f243339aa792675965b0315ca7683cb5c67fc89b9a5a24cea98ce2", "0x2a7ab188cb5917dfe0d0a13ba9987e3686de407ac54d01d4d77379fd7ddbb407"],
            "B":[["0x23cf18b20ab000abd4115832a302c3cef49182df139bf86d0365d9f353e3303c", "0x109533641de4f8b475ecc189d4cb7b2eddbe715e39a5bfd7e48a959e3b0fdb26"], ["0x23b9cfeece4b12f98c23a0203231cc55043565e5cff6ca14b3167fb4c6ccd5d0", "0x194d83bdaade1cf929374d69b3d7ecd6722ac89f4bff10a3bc468d0fd8e9c1c9"]],
            "C":["0x28db031ef06c2592e0bb867b6a3c41c6fb43aeb9792ed2b41f27df24c7ee4d01", "0x21a88b8aa8f9da91588167d3528139307050dec98b9377089c83549f827e0046"],
        },
        "input":[3,1]
    }

    describe('test solnSquareVerifier', function () {
        beforeEach(async function () { 
            let verifierContract = await Verifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: account_one});
        })

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

        it('ERC721 token can be minted for contract - SolnSquareVerifier', async function () { 
            console.log("proof",proof)
            let v = await this.contract.mint.call(account_two, 1);
            assert.equal(v, true, "not valid proof");
        })

 // Test if a new solution can be added for contract - SolnSquareVerifier

        it('Test if a new solution can be added for contract', async function () {
            const { proof: { a, b, c }, inputs: input } = proof;  
            let key = await this.contract.getVerifierKey.call(a, b, c, input);
            let result = await this.contract.addSolution(2, account_two, key);

            // Test event is emitted
            assert.equal(result.logs.length, 1, "No events were triggered.");
        });
    });
})
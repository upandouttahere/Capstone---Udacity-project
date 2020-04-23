pragma solidity >=0.4.21 <0.6.0;

// Define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";

// Define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is RealEstateERC721Token {

    // Define a solutions struct that can hold an index & an address
    struct Solutions {
        uint256 index;
        address Address;
    }

    // Define an array of the above struct
    Solutions[] solutionsArray;

    // Define a mapping to store unique solutions submitted
    mapping(bytes32 => Solutions) private uniqueSolutions;

    // Create an event to emit when a solution is added
    event solutionAdded(uint256 index, address Address);

    function getVerifierKey(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) pure public returns(bytes32) {
        return keccak256(abi.encodePacked(a, b, c, input));
    }

    // Create a function to add the solutions to the array and emit the event
    function addSolution(address Address, uint256 index, bytes32 solutionKey) public {
        uniqueSolutions[solutionKey] = Solutions({
            index: index,
            Address: Address
        });
        emit solutionAdded(index, Address);
    }

    Verifier public VerifierContract;
    constructor(address VerifierContractAddress) public {
        VerifierContract = Verifier(VerifierContractAddress);
    }

    // Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(address Address, uint256 index, uint[2] memory a, uint[2][2] memory b, uint[2] memory c,
        uint[2] memory input) public returns (bool) {
            require(VerifierContract.verifyTx(a, b, c, input), "Not the valid solution");
            bytes32 solutionKey = keccak256(abi.encodePacked(a, b, c, input));
            require(uniqueSolutions[solutionKey].Address == address(0), "Solution exists");
            addSolution(Address, index, solutionKey);
            super.mint(Address, index);
        }
}

pragma solidity 0.4.24;
pragma experimental "v0.5.0";
pragma experimental ABIEncoderV2;


contract EventContract {

    uint256 public testNumber;

    event TestEvent(
        address hello,
        uint256 number
    );

    function emitEvent(uint256 newNumber) public {
        testNumber = newNumber;

        emit TestEvent(
            msg.sender,
            newNumber
        );
    }
}
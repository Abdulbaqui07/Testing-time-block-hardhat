//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestingTime {
    uint256 startTime;
    uint256 endTime;
    uint256 startBlockNumber;
    uint endBlockNumber;

    constructor(uint256 _startTime, uint256 _endTime, uint256 _startBlockNumber, uint _endBlockNumber) {
        startTime = _startTime;
        endTime = _endTime;
        startBlockNumber =_startBlockNumber;
        endBlockNumber = _endBlockNumber;
    }

    function hasStarted() public view returns (bool) {
        return (block.timestamp >= startTime);
    }

    function hasEnded() public view returns (bool) {
        return (block.timestamp >= endTime);
    }

    function currentBlockTimestamp() public view returns (uint) {
        return block.timestamp;
    }

    function currentBlockNumber() public view returns (uint) {
        return block.number;
    }

    function hasBlockStarted() public view returns (bool) {
        return (block.number >= startBlockNumber);
    }

    function hasBlockEnded() public view returns (bool) {
        return (block.number >= endBlockNumber);
    }

}

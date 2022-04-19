// SPDX-License-Identifier: CAL
pragma solidity =0.8.10;

import "../VMMeta.sol";
import "./AllStandardOps.sol";

contract AllStandardOpsMeta is VMMeta {
    /// @inheritdoc VMMeta
    function stackIndexMoveFnPtrs()
        public
        pure
        override
        returns (bytes memory)
    {
        return AllStandardOps.stackIndexMoveFnPtrs();
    }
}
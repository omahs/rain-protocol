// SPDX-License-Identifier: CAL
pragma solidity ^0.8.15;

import "../../../../math/FixedPointMath.sol";
import "../../../run/LibStackPointer.sol";
import "../../../run/LibInterpreterState.sol";
import "../../../deploy/LibIntegrityCheck.sol";

/// @title OpFixedPointScaleBy
/// @notice Opcode for scaling a number by some OOMs.
library OpFixedPointScaleBy {
    using FixedPointMath for uint256;
    using LibStackPointer for StackPointer;
    using LibIntegrityCheck for IntegrityCheckState;

    function _scaleBy(
        Operand operand_,
        uint256 a_
    ) internal pure returns (uint256) {
        return a_.scaleBy(int8(uint8(Operand.unwrap(operand_))));
    }

    function integrity(
        IntegrityCheckState memory integrityState_,
        Operand,
        StackPointer stackTop_
    ) internal pure returns (StackPointer) {
        return integrityState_.applyFn(stackTop_, _scaleBy);
    }

    function scaleBy(
        InterpreterState memory,
        Operand operand_,
        StackPointer stackTop_
    ) internal view returns (StackPointer) {
        return stackTop_.applyFn(_scaleBy, operand_);
    }
}

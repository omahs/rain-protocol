// SPDX-License-Identifier: CAL
pragma solidity ^0.8.15;

import "../../../../math/FixedPointMath.sol";
import "../../../run/LibStackPointer.sol";
import "../../../run/LibInterpreterState.sol";
import "../../../deploy/LibIntegrityCheck.sol";

/// @title OpFixedPointScale18Div
/// @notice Opcode for performing scale 18 fixed point division.
library OpFixedPointScale18Div {
    using FixedPointMath for uint256;
    using LibStackPointer for StackPointer;
    using LibIntegrityCheck for IntegrityCheckState;

    function _scale18Div(
        Operand operand_,
        uint256 a_,
        uint256 b_
    ) internal pure returns (uint256) {
        return a_.scale18(Operand.unwrap(operand_)).fixedPointDiv(b_);
    }

    function integrity(
        IntegrityCheckState memory integrityState_,
        Operand,
        StackPointer stackTop_
    ) internal pure returns (StackPointer) {
        return integrityState_.applyFn(stackTop_, _scale18Div);
    }

    function scale18Div(
        InterpreterState memory,
        Operand operand_,
        StackPointer stackTop_
    ) internal view returns (StackPointer) {
        return stackTop_.applyFn(_scale18Div, operand_);
    }
}

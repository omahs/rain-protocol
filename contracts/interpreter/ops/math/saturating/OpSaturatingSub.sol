// SPDX-License-Identifier: CAL
pragma solidity ^0.8.15;

import "../../../../math/SaturatingMath.sol";
import "../../../run/LibStackPointer.sol";
import "../../../run/LibInterpreterState.sol";
import "../../../deploy/LibIntegrityCheck.sol";

/// @title OpSaturatingSub
/// @notice Opcode for subtracting N numbers with saturating subtraction.
library OpSaturatingSub {
    using SaturatingMath for uint256;
    using LibStackPointer for StackPointer;
    using LibIntegrityCheck for IntegrityCheckState;

    function integrity(
        IntegrityCheckState memory integrityState_,
        Operand operand_,
        StackPointer stackTop_
    ) internal pure returns (StackPointer) {
        return
            integrityState_.applyFnN(
                stackTop_,
                SaturatingMath.saturatingSub,
                Operand.unwrap(operand_)
            );
    }

    function saturatingSub(
        InterpreterState memory,
        Operand operand_,
        StackPointer stackTop_
    ) internal view returns (StackPointer stackTopAfter_) {
        return
            stackTop_.applyFnN(
                SaturatingMath.saturatingSub,
                Operand.unwrap(operand_)
            );
    }
}

// SPDX-License-Identifier: CAL
pragma solidity ^0.8.15;

import "../../../tier/libraries/TierReport.sol";
import "../../run/LibStackPointer.sol";
import "../../run/LibInterpreterState.sol";
import "../../deploy/LibIntegrityCheck.sol";

library OpUpdateTimesForTierRange {
    using LibStackPointer for StackPointer;
    using LibIntegrityCheck for IntegrityCheckState;

    function _updateTimesForTierRange(
        Operand operand_,
        uint256 report_,
        uint256 timestamp_
    ) internal pure returns (uint256) {
        return
            TierReport.updateTimesForTierRange(
                report_,
                // start tier.
                // 4 low bits.
                Operand.unwrap(operand_) & 0x0f,
                // end tier.
                // 4 high bits.
                (Operand.unwrap(operand_) >> 4) & 0x0f,
                timestamp_
            );
    }

    function integrity(
        IntegrityCheckState memory integrityState_,
        Operand,
        StackPointer stackTop_
    ) internal pure returns (StackPointer) {
        return integrityState_.applyFn(stackTop_, _updateTimesForTierRange);
    }

    // Stacks a report with updated times over tier range.
    // The start and end tier are taken from the low and high bits of
    // the `operand_` respectively.
    // The report to update and timestamp to update to are both
    // taken from the stack.
    function updateTimesForTierRange(
        InterpreterState memory,
        Operand operand_,
        StackPointer stackTop_
    ) internal view returns (StackPointer) {
        return stackTop_.applyFn(_updateTimesForTierRange, operand_);
    }
}

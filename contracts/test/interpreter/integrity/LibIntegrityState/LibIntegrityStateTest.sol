// SPDX-License-Identifier: CAL
pragma solidity ^0.8.15;

import "../../../../interpreter/deploy/LibIntegrityCheck.sol";
import "../../../../debug/LibDebug.sol";
import "../../../../type/LibCast.sol";
import "../../../../interpreter/ops/AllStandardOps.sol";

import "hardhat/console.sol";

/// @title LibIntegrityCheckTest
/// Test wrapper around `LibIntegrityCheck` library for testing.
contract LibIntegrityCheckTest {
    using LibIntegrityCheck for IntegrityCheckState;
    using LibCast for uint256[];

    function integrityFunctionPointers()
        internal
        view
        virtual
        returns (
            function(IntegrityCheckState memory, Operand, StackPointer)
                view
                returns (StackPointer)[]
                memory
        )
    {
        function(IntegrityCheckState memory, Operand, StackPointer)
            view
            returns (StackPointer)[]
            memory localFnPtrs_ = new function(
                IntegrityCheckState memory,
                Operand,
                StackPointer
            ) view returns (StackPointer)[](0);
        return AllStandardOps.integrityFunctionPointers(localFnPtrs_);
    }

    function syncStackMaxTop(
        bytes[] memory sources_,
        uint256 constantsLength_,
        uint256 stackMaxTop_,
        StackPointer stackTop_
    ) external returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            StackPointer.wrap(stackMaxTop_), // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        LibDebug.dumpMemory();
        integrityCheckState_.syncStackMaxTop(stackTop_);
        LibDebug.dumpMemory();
        return integrityCheckState_.stackMaxTop;
    }

    function ensureIntegrityTest(
        bytes[] memory sources_,
        uint256 constantsLength_,
        SourceIndex sourceIndex_,
        StackPointer stackTop_,
        uint256 minStackOutputs_
    ) external returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            INITIAL_STACK_BOTTOM, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        LibDebug.dumpMemory();
        integrityCheckState_.ensureIntegrity(
            sourceIndex_,
            stackTop_,
            minStackOutputs_
        );
        LibDebug.dumpMemory();
        return stackTop_;
    }

    function push(
        bytes[] memory sources_,
        uint256 constantsLength_,
        uint256 stackMaxTop_,
        StackPointer stackTop_
    ) external view returns (StackPointer stackTopAfter_) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            StackPointer.wrap(stackMaxTop_), // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        stackTopAfter_ = integrityCheckState_.push(stackTop_);
    }

    function push(
        bytes[] memory sources_,
        uint256 constantsLength_,
        uint256 stackMaxTop_,
        StackPointer stackTop_,
        uint256 n_
    ) external view returns (StackPointer stackTopAfter_) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            StackPointer.wrap(stackMaxTop_), // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        stackTopAfter_ = integrityCheckState_.push(stackTop_, n_);
    }

    function popUnderflowCheck(
        bytes[] memory sources_,
        uint256 constantsLength_,
        uint256 stackBottom_,
        uint256 stackMaxTop_,
        StackPointer stackTop_
    ) external view {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            StackPointer.wrap(stackBottom_), // stackBottom
            StackPointer.wrap(stackBottom_), // stackHighwater
            StackPointer.wrap(stackMaxTop_), // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        integrityCheckState_.popUnderflowCheck(stackTop_);
    }

    function pop(
        bytes[] memory sources_,
        uint256 constantsLength_,
        uint256 stackBottom_,
        uint256 stackMaxTop_,
        StackPointer stackTop_
    ) external view returns (StackPointer stackTopAfter_) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            StackPointer.wrap(stackBottom_), // stackBottom
            StackPointer.wrap(stackBottom_), // stackHighwater
            StackPointer.wrap(stackMaxTop_), // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        stackTopAfter_ = integrityCheckState_.pop(stackTop_);
    }

    function pop(
        bytes[] memory sources_,
        uint256 constantsLength_,
        uint256 stackBottom_,
        uint256 stackMaxTop_,
        StackPointer stackTop_,
        uint256 n_
    ) external view returns (StackPointer stackTopAfter_) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            sources_, // sources
            constantsLength_, // constantsLength
            StackPointer.wrap(stackBottom_), // stackBottom
            StackPointer.wrap(stackBottom_), // stachHighwater
            StackPointer.wrap(stackMaxTop_), // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        stackTopAfter_ = integrityCheckState_.pop(stackTop_, n_);
    }

    function _fn0(uint256) internal pure returns (uint256) {
        return 0;
    }

    function _fn1(Operand, uint256) internal pure returns (uint256) {
        return 0;
    }

    function _fn2(uint256, uint256) internal pure returns (uint256) {
        return 0;
    }

    function _fn3(Operand, uint256, uint256) internal pure returns (uint256) {
        return 0;
    }

    function _fn4(uint256, uint256, uint256) internal pure returns (uint256) {
        return 0;
    }

    function _fn5(uint256[] memory) internal pure returns (uint256) {
        return 0;
    }

    function _fn6(
        uint256,
        uint256,
        uint256[] memory
    ) internal pure returns (uint256) {
        return 0;
    }

    function _fn7(
        uint256,
        uint256,
        uint256,
        uint256[] memory
    ) internal pure returns (uint256) {
        return 0;
    }

    function _fn8(
        uint256,
        uint256[] memory,
        uint256[] memory
    ) internal pure returns (uint256[] memory) {
        return new uint256[](3); // arbitrary length
    }

    // function(uint256, uint256) internal view returns (uint256)
    function applyFnN(
        StackPointer stackTop_,
        uint256 n_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFnN(stackTop_, _fn2, n_);
    }

    // function(uint256) internal view returns (uint256)
    function applyFn0(
        StackPointer stackTop_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn0);
    }

    // function(Operand, uint256) internal view returns (uint256)
    function applyFn1(
        StackPointer stackTop_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn1);
    }

    // function(uint256, uint256) internal view returns (uint256)
    function applyFn2(
        StackPointer stackTop_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn2);
    }

    // function(Operand, uint256, uint256) internal view returns (uint256)
    function applyFn3(
        StackPointer stackTop_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn3);
    }

    // function(uint256, uint256, uint256) internal view returns (uint256)
    function applyFn4(
        StackPointer stackTop_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn4);
    }

    // function(uint256[] memory) internal view returns (uint256)
    function applyFn5(
        StackPointer stackTop_,
        uint256 length_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn5, length_);
    }

    // function(uint256, uint256, uint256[] memory) internal view returns (uint256)
    function applyFn6(
        StackPointer stackTop_,
        uint256 length_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn6, length_);
    }

    // function(uint256, uint256, uint256, uint256[] memory) internal view returns (uint256)
    function applyFn7(
        StackPointer stackTop_,
        uint256 length_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn7, length_);
    }

    // function(uint256, uint256[] memory, uint256[] memory) internal view returns (uint256[] memory)
    function applyFn8(
        StackPointer stackTop_,
        uint256 length_
    ) external view returns (StackPointer) {
        IntegrityCheckState memory integrityCheckState_ = IntegrityCheckState(
            new bytes[](0), // sources
            0, // constantsLength
            INITIAL_STACK_BOTTOM, // stackBottom
            INITIAL_STACK_BOTTOM, // stackHighwater
            stackTop_, // stackMaxTop
            integrityFunctionPointers() // integrityFunctionPointers
        );
        return integrityCheckState_.applyFn(stackTop_, _fn8, length_);
    }
}

import { assert } from "chai";
import type { LibIntegrityCheckTest } from "../../../../typechain";
import { INITIAL_STACK_BOTTOM } from "../../../../utils/constants/interpreter";
import { libIntegrityCheckStateDeploy } from "../../../../utils/deploy/test/libIntegrityState/deploy";
import { assertError } from "../../../../utils/test/assertError";

describe("LibIntegrityCheck applyFn tests", async function () {
  let libIntegrityCheckState: LibIntegrityCheckTest;

  before(async () => {
    libIntegrityCheckState = await libIntegrityCheckStateDeploy();
  });

  it("should applyFnN function(uint256, uint256) internal view returns (uint256)", async function () {
    const n = 5;
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * n);
    const stackTopAfter_ = await libIntegrityCheckState.applyFnN(stackTop, n);
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () => await libIntegrityCheckState.applyFnN(stackTop.sub(32), n),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256, uint256[] memory, uint256[] memory) internal view returns (uint256[] memory)", async function () {
    const length = 3;
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * length * 2 + 32);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn8(
      stackTop,
      length
    );
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32 * length)));
    await assertError(
      async () =>
        await libIntegrityCheckState.applyFn8(stackTop.sub(32), length),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256, uint256, uint256, uint256[] memory) internal view returns (uint256)", async function () {
    const length = 3;
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * length + 32 * 3);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn7(
      stackTop,
      length
    );
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () =>
        await libIntegrityCheckState.applyFn7(stackTop.sub(32), length),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256, uint256, uint256[] memory) internal view returns (uint256)", async function () {
    const length = 3;
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * length + 32 * 2);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn6(
      stackTop,
      length
    );
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () =>
        await libIntegrityCheckState.applyFn6(stackTop.sub(32), length),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256[] memory) internal view returns (uint256)", async function () {
    const length = 3;
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * length);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn5(
      stackTop,
      length
    );
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () =>
        await libIntegrityCheckState.applyFn5(stackTop.sub(32), length),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256, uint256, uint256) internal view returns (uint256)", async function () {
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * 3);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn4(stackTop);
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () => await libIntegrityCheckState.applyFn4(stackTop.sub(32)),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(Operand, uint256, uint256) internal view returns (uint256)", async function () {
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * 2);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn3(stackTop);
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () => await libIntegrityCheckState.applyFn3(stackTop.sub(32)),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256, uint256) internal view returns (uint256)", async function () {
    const stackTop = INITIAL_STACK_BOTTOM.add(32 * 2);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn2(stackTop);
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () => await libIntegrityCheckState.applyFn2(stackTop.sub(32)),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(Operand, uint256) internal view returns (uint256)", async function () {
    const stackTop = INITIAL_STACK_BOTTOM.add(32);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn1(stackTop);
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () => await libIntegrityCheckState.applyFn1(stackTop.sub(32)),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });

  it("should applyFn function(uint256) internal view returns (uint256)", async function () {
    const stackTop = INITIAL_STACK_BOTTOM.add(32);
    const stackTopAfter_ = await libIntegrityCheckState.applyFn0(stackTop);
    assert(stackTopAfter_.eq(INITIAL_STACK_BOTTOM.add(32)));
    await assertError(
      async () => await libIntegrityCheckState.applyFn0(stackTop.sub(32)),
      "StackPopUnderflow",
      "did not underflow with insufficient stack height"
    );
  });
});

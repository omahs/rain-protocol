import { assert } from "chai";
import { Contract } from "ethers";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { AllStandardOpsStateBuilder } from "../../../typechain/AllStandardOpsStateBuilder";
import { AllStandardOpsTest } from "../../../typechain/AllStandardOpsTest";
import { AllStandardOps } from "../../../utils/rainvm/ops/allStandardOps";
import { op } from "../../../utils/rainvm/vm";
import { assertError } from "../../../utils/test/assertError";

const Opcode = AllStandardOps;

// Contains tests for RainVM, the constant RainVM ops as well as Math ops via AllStandardOpsTest contract.
// For SaturatingMath library tests, see the associated test file at test/Math/SaturatingMath.sol.ts
describe("RainVM storage", async function () {
  let stateBuilder: AllStandardOpsStateBuilder & Contract;
  let logic: AllStandardOpsTest & Contract;

  before(async () => {
    this.timeout(0);
    const stateBuilderFactory = await ethers.getContractFactory(
      "AllStandardOpsStateBuilder"
    );
    stateBuilder =
      (await stateBuilderFactory.deploy()) as AllStandardOpsStateBuilder &
        Contract;
    await stateBuilder.deployed();

    const logicFactory = await ethers.getContractFactory("AllStandardOpsTest");
    logic = (await logicFactory.deploy(
      stateBuilder.address
    )) as AllStandardOpsTest & Contract;
  });

  it("should error when attempting to read stored value outside STORAGE opcode range", async () => {
    this.timeout(0);

    const constants = [];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.STORAGE, 3),
    ])];

    await assertError(
      async () => await logic.initialize({ sources, constants }),
      "", // there is at least an error
      "should error when attempting to read stored value outside STORAGE opcode range"
    );
  });

  it("should support reading stored values via STORAGE opcode", async () => {
    this.timeout(0);

    const constants = [];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.STORAGE, 0),
      op(Opcode.STORAGE, 1),
      op(Opcode.STORAGE, 2),
    ])];

    await logic.initialize({ sources, constants });

    await logic.run();

    const result = await logic.stack();
    const expected = [0, 1, 2];

    result.forEach((stackVal, index) => {
      assert(
        stackVal.eq(expected[index]),
        `did not support reading stored value via STORAGE opcode at index ${index}
        expected  ${expected[index]}
        got       ${stackVal}`
      );
    });
  });
});
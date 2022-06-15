import { assert } from "chai";
import { Contract } from "ethers";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { AllStandardOpsStateBuilder } from "../../../../typechain/AllStandardOpsStateBuilder";
import { AllStandardOpsTest } from "../../../../typechain/AllStandardOpsTest";
import { max_uint256 } from "../../../../utils/constants";
import { AllStandardOps } from "../../../../utils/rainvm/ops/allStandardOps";
import { op } from "../../../../utils/rainvm/vm";
import { assertError } from "../../../../utils/test/assertError";

const Opcode = AllStandardOps;

// For SaturatingMath library tests, see the associated test file at test/Math/SaturatingMath.sol.ts
describe("RainVM MathOps saturating math", async () => {
  let stateBuilder: AllStandardOpsStateBuilder & Contract;
  let logic: AllStandardOpsTest & Contract;

  before(async () => {
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

  it("should perform saturating multiplication", async () => {
    const constants = [max_uint256, 2];
    const vMaxUInt256 = op(Opcode.CONSTANT, 0);
    const v2 = op(Opcode.CONSTANT, 1);

    // test case with normal multiplication
    // prettier-ignore
    const sourcesUnsat = [
      concat([
        // (max_uint256 2 *)
          vMaxUInt256,
          v2,
        op(Opcode.MUL, 2),
      ]),
    ];

    await logic.initialize({
      sources: sourcesUnsat,
      constants,
    });

    await assertError(
      async () => await logic.run(),
      "Transaction reverted",
      "normal multiplication overflow did not error"
    );

    // prettier-ignore
    const sourcesSat = [
      concat([
        // (max_uint256 2 SAT_MUL)
          vMaxUInt256,
          v2,
        op(Opcode.SATURATING_MUL, 2),
      ]),
    ];

    await logic.initialize({
      sources: sourcesSat,
      constants,
    });

    await logic.run();
    const result = await logic.stackTop();
    const expected = max_uint256;
    assert(
      result.eq(expected),
      `wrong saturating multiplication ${expected} ${result}`
    );
  });

  it("should perform saturating subtraction", async () => {
    const constants = [10, 20];
    const v10 = op(Opcode.CONSTANT, 0);
    const v20 = op(Opcode.CONSTANT, 1);

    // test case with normal subtraction
    // prettier-ignore
    const sourcesUnsat = [
      concat([
        // (10 20 -)
          v10,
          v20,
        op(Opcode.SUB, 2),
      ]),
    ];

    await logic.initialize({
      sources: sourcesUnsat,
      constants,
    });

    await assertError(
      async () => await logic.run(),
      "Transaction reverted",
      "normal subtraction overflow did not error"
    );

    // prettier-ignore
    const sourcesSat = [
      concat([
        // (10 20 SAT_SUB)
          v10,
          v20,
        op(Opcode.SATURATING_SUB, 2),
      ]),
    ];

    await logic.initialize({
      sources: sourcesSat,
      constants,
    });

    await logic.run();
    const result = await logic.stackTop();
    const expected = 0;
    assert(
      result.eq(expected),
      `wrong saturating subtraction ${expected} ${result}`
    );
  });

  it("should perform saturating addition", async () => {
    const constants = [max_uint256, 10];
    const vMaxUInt256 = op(Opcode.CONSTANT, 0);
    const v10 = op(Opcode.CONSTANT, 1);

    // test case with normal addition
    // prettier-ignore
    const sourcesUnsat = [
      concat([
        // (max_uint256 10 +)
          vMaxUInt256,
          v10,
        op(Opcode.ADD, 2),
      ]),
    ];

    await logic.initialize({ sources: sourcesUnsat, constants });

    await assertError(
      async () => await logic.run(),
      "Transaction reverted",
      "normal addition overflow did not error"
    );

    // prettier-ignore
    const sourcesSat = [
      concat([
        // (max_uint256 1 SAT_ADD)
          vMaxUInt256,
          v10,
        op(Opcode.SATURATING_ADD, 2),
      ]),
    ];

    await logic.initialize({
      sources: sourcesSat,
      constants,
    });

    await logic.run();
    const result = await logic.stackTop();
    const expected = max_uint256;
    assert(
      result.eq(expected),
      `wrong saturating addition ${expected} ${result}`
    );
  });
});
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

describe("RainVM stack op", async function () {
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

  it("should error when STACK operand references a stack element that hasn't yet been evaluated", async () => {
    this.timeout(0);

    const constants = [10, 20, 30];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.CONSTANT, 0),
      op(Opcode.CONSTANT, 1),
      op(Opcode.STACK, 3),
      op(Opcode.CONSTANT, 2),
    ])];

    await assertError(
      async () => await logic.initialize({ sources, constants }),
      "", // at least an error
      "did not error when STACK operand references a stack element that hasn't yet been evaluated"
    );
  });

  it("should error when STACK operand references itself", async () => {
    this.timeout(0);

    const constants = [10, 20, 30];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.CONSTANT, 0),
      op(Opcode.CONSTANT, 1),
      op(Opcode.CONSTANT, 2),
      op(Opcode.STACK, 3),
    ])];

    await assertError(
      async () => await logic.initialize({ sources, constants }),
      "", // at least an error
      "did not error when STACK operand references itself"
    );
  });

  it("should evaluate to correct stack element when STACK is called within a nested evaluation", async () => {
    this.timeout(0);

    const constants = [10, 20, 30, 40];

    // STACK should have access to all evaluated stack values

    // prettier-ignore
    const sources = [concat([
      op(Opcode.CONSTANT, 0), // STACK should equal this
      op(Opcode.CONSTANT, 1),
        op(Opcode.CONSTANT, 2), // not this (well, not without operand = 2)
        op(Opcode.CONSTANT, 3),
        op(Opcode.STACK),
      op(Opcode.ADD, 3),
    ])];

    await logic.initialize({ sources, constants });
    await logic.run();

    const result = await logic.stackTop();

    assert(
      result.eq(80),
      `STACK operand evaluated to wrong stack element when STACK is called within a nested evaluation
      expected  ${80}
      got       ${result}`
    );
  });

  it("should return correct stack element when there are nested evaluations (e.g. returns the addition of several stack elements, rather than a summand)", async () => {
    this.timeout(0);

    const constants = [10, 20, 30];

    // prettier-ignore
    const sources = [concat([
        op(Opcode.CONSTANT, 0),
        op(Opcode.CONSTANT, 1),
        op(Opcode.CONSTANT, 2),
      op(Opcode.ADD, 3),
      op(Opcode.STACK),
    ])];

    await logic.initialize({ sources, constants });
    await logic.run();

    const result = await logic.stackTop();

    assert(
      result.eq(60),
      "STACK operand returned wrong stack element when there are nested evaluations (e.g. returns the addition of several stack elements, rather than a summand)"
    );
  });

  it("should return correct stack element when specifying operand", async () => {
    this.timeout(0);

    const constants = [10, 20, 30];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.CONSTANT, 0),
      op(Opcode.CONSTANT, 1),
      op(Opcode.CONSTANT, 2),
      op(Opcode.STACK, 1),
    ])];

    await logic.initialize({ sources, constants });
    await logic.run();

    const result = await logic.stackTop();

    assert(
      result.eq(constants[1]),
      "STACK operand returned wrong stack element"
    );
  });
});
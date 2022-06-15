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

describe("RainVM unchecked math", async () => {
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

  it("should panic when accumulator overflows with exponentiation op", async () => {
    const constants = [max_uint256.div(2), 2];

    const vHalfMaxUInt256 = op(Opcode.CONSTANT, 0);
    const vTwo = op(Opcode.CONSTANT, 1);

    // prettier-ignore
    const source0 = concat([
        vHalfMaxUInt256,
        vTwo,
      op(Opcode.EXP, 2)
    ]);

    await logic.initialize({
      sources: [source0],
      constants,
    });

    await assertError(
      async () => await logic.run(),
      "VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)",
      "accumulator overflow did not panic"
    );
  });

  it("should panic when accumulator overflows with multiplication op", async () => {
    const constants = [max_uint256.div(2), 3];

    const vHalfMaxUInt256 = op(Opcode.CONSTANT, 0);
    const vThree = op(Opcode.CONSTANT, 1);

    // prettier-ignore
    const source0 = concat([
        vHalfMaxUInt256,
        vThree,
      op(Opcode.MUL, 2)
    ]);

    await logic.initialize({
      sources: [source0],
      constants,
    });

    await assertError(
      async () => await logic.run(),
      "Transaction reverted",
      "accumulator overflow did not panic"
    );
  });

  it("should panic when accumulator underflows with subtraction op", async () => {
    const constants = [0, 1];

    const vZero = op(Opcode.CONSTANT, 0);
    const vOne = op(Opcode.CONSTANT, 1);

    // prettier-ignore
    const source0 = concat([
        vZero,
        vOne,
      op(Opcode.SUB, 2)
    ]);

    await logic.initialize({
      sources: [source0],
      constants,
    });

    await assertError(
      async () => await logic.run(),
      "Transaction reverted",
      "accumulator underflow did not panic"
    );
  });

  it("should panic when accumulator overflows with addition op", async () => {
    const constants = [max_uint256, 1];

    const vMaxUInt256 = op(Opcode.CONSTANT, 0);
    const vOne = op(Opcode.CONSTANT, 1);

    // prettier-ignore
    const source0 = concat([
        vMaxUInt256,
        vOne,
      op(Opcode.ADD, 2)
    ]);

    await logic.initialize({
      sources: [source0],
      constants,
    });

    await assertError(
      async () => await logic.run(),
      "Transaction reverted",
      "accumulator overflow did not panic"
    );
  });
});
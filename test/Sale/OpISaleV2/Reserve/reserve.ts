import { FakeContract, smock } from "@defi-wonderland/smock";
import { assert } from "chai";
import { concat, hexlify, randomBytes } from "ethers/lib/utils";
import { ethers } from "hardhat";
import {
  IInterpreterV1Consumer,
  Rainterpreter,
  Sale,
} from "../../../../typechain";
import {
  AllStandardOps,
  memoryOperand,
  MemoryType,
  op,
} from "../../../../utils";
import { rainterpreterDeploy } from "../../../../utils/deploy/interpreter/shared/rainterpreter/deploy";
import { expressionConsumerDeploy } from "../../../../utils/deploy/test/iinterpreterV1Consumer/deploy";

const Opcode = AllStandardOps;

describe("ISaleV2 Reserve tests", async function () {
  let rainInterpreter: Rainterpreter;
  let logic: IInterpreterV1Consumer;
  let fakeSale: FakeContract<Sale>;

  beforeEach(async () => {
    fakeSale = await smock.fake("Sale");
  });

  before(async () => {
    rainInterpreter = await rainterpreterDeploy();

    const consumerFactory = await ethers.getContractFactory(
      "IInterpreterV1Consumer"
    );
    logic = (await consumerFactory.deploy()) as IInterpreterV1Consumer;
    await logic.deployed();
  });

  it("should return correct reserve", async () => {
    const reserve = hexlify(randomBytes(20));

    fakeSale.reserve.returns(reserve);

    const SALE_ADDRESS = () =>
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0));

    // prettier-ignore
    const sources = [concat([
      SALE_ADDRESS(),
      op(Opcode.ISALEV2_RESERVE),
    ])];
    const constants = [fakeSale.address];

    const expression0 = await expressionConsumerDeploy(
      {
        sources,
        constants,
      },
      rainInterpreter,
      1
    );

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);

    const _reserve = await logic.stackTop();

    assert(_reserve.eq(reserve));
  });
});

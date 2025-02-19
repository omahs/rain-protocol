import { assert } from "chai";
import { randomBytes } from "crypto";
import { concat, keccak256 } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { IInterpreterV1Consumer, Rainterpreter } from "../../../../typechain";

import {
  memoryOperand,
  MemoryType,
  op,
  RainterpreterOps,
  randomUint256,
} from "../../../../utils";
import { rainterpreterDeploy } from "../../../../utils/deploy/interpreter/shared/rainterpreter/deploy";
import {
  iinterpreterV1ConsumerDeploy,
  expressionConsumerDeploy,
} from "../../../../utils/deploy/test/iinterpreterV1Consumer/deploy";

const Opcode = RainterpreterOps;

describe("SET/GET Opcode tests", async function () {
  it("should update the key in kvs array when same key is set more than once", async () => {
    const key1 = 100;
    const val1 = ethers.constants.MaxUint256;
    const val2 = 555;

    const constants = [key1, val1, val2];

    // prettier-ignore
    const source = concat([
        // SET key1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),

        // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),

        // SET key1 again
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // val
      op(Opcode.SET),

        // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0 )), // key
      op(Opcode.GET),

    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source],
          constants,
        },
        2
      );

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    // Asserting KVs array
    const kvs = await consumerLogic["kvs()"]();
    assert(kvs.length == 2, "Invalid kvs length");
    assert(kvs[0].eq(key1), "Invalid Key set in kvs");
    assert(kvs[1].eq(val2), "Invalid Value set in kvs");

    // Asserting stack
    const stack = await consumerLogic.stack();
    assert(stack.length == 2, "Invalid stack length");
    assert(stack[0].eq(constants[1]), "Invalid value was SET / GET for key 1");
    assert(stack[1].eq(constants[2]), "Invalid value was SET / GET for key 1");
  });

  it("should set a key value pair and overwrite it", async () => {
    const key1 = 100;
    const val1 = ethers.constants.MaxUint256;
    const val2 = 555;

    const constants = [key1, val1, val2];

    // prettier-ignore
    const source = concat([
        // SET key1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),

        // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),

        // SET key1 again
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // val
      op(Opcode.SET),

        // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0 )), // key
      op(Opcode.GET),

    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source],
          constants,
        },
        2
      );

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const stack = await consumerLogic.stack();
    assert(stack.length == 2, "Invalid stack length");
    assert(stack[0].eq(constants[1]), "Invalid value was SET / GET for key 1");
    assert(stack[1].eq(constants[2]), "Invalid value was SET / GET for key 1");
  });

  it("should set and get multiple values", async () => {
    const key1 = 100;
    const key2 = 101;
    const key3 = 102;
    const val1 = ethers.constants.MaxUint256;
    const val2 = 0;
    const val3 = 555;

    const constants = [key1, val1, key2, val2, key3, val3];

    // prettier-ignore
    const source = concat([
        // SET key1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),

        // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),

        // SET key2
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 3)), // val
      op(Opcode.SET),

        // GET KEY 2
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // key
      op(Opcode.GET),

        // SET key3
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 4)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 5)), // val
      op(Opcode.SET),

        // GET KEY 3
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 4)), // key
      op(Opcode.GET),
    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source],
          constants,
        },
        3
      );

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const stack = await consumerLogic.stack();
    assert(stack.length == 3, "Invalid stack length");
    assert(stack[0].eq(constants[1]), "Invalid value was SET / GET for key 1");
    assert(stack[1].eq(constants[3]), "Invalid value was SET / GET for key 2");
    assert(stack[2].eq(constants[5]), "Invalid value was SET / GET for key 3");
  });

  it("should set and get values of different types", async () => {
    // Numeric values
    const key = 123;
    const val = 456;

    const constants1 = [key, val];

    // prettier-ignore
    const source1 = concat([
        // SET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),
        // GET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),
    ]);

    let { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source1],
          constants: constants1,
        },
        1
      );

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const stack1 = await consumerLogic.stack();

    // StackPointer
    const val1_ = stack1[stack1.length - 1];

    assert(val1_.eq(val), "Invalid value was SET / GET");

    // Hashed Key Value pair
    const hashedKey = keccak256(randomBytes(32));
    const hashedValue = keccak256(randomBytes(256));
    const constants2 = [hashedKey, hashedValue];

    // prettier-ignore
    const source2 = concat([
        // SET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),
        // GET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),
    ]);

    ({ consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source2],
          constants: constants2,
        },
        1
      ));

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const stack2 = await consumerLogic.stack();

    const val2_ = stack2[stack2.length - 1];

    // StackPointer
    assert(
      val2_.eq(hashedValue),
      "Invalid value was SET / GET for hashed bytes"
    );

    // max numeric key value pair
    const maxKey = ethers.constants.MaxUint256;
    const maxValue = ethers.constants.MaxUint256;
    const constants3 = [maxKey, maxValue];

    // prettier-ignore
    const source3 = concat([
        // SET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),
        // GET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),
    ]);

    ({ consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source3],
          constants: constants3,
        },
        1
      ));

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const stack3 = await consumerLogic.stack();

    const val3_ = stack3[stack3.length - 1];

    // StackPointer
    assert(
      val3_.eq(maxValue),
      "Invalid value was SET / GET for max key value pair"
    );
    const signers = await ethers.getSigners();
    // address key value pair
    const addressKey = signers[0].address;
    const addressValue = signers[1].address;
    const constants4 = [addressKey, addressValue];

    // prettier-ignore
    const source4 = concat([
        // SET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),
        // GET
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET),
    ]);

    ({ consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source4],
          constants: constants4,
        },
        1
      ));

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const stack4 = await consumerLogic.stack();

    const val4_ = stack4[stack4.length - 1];

    // StackPointer
    assert(
      val4_.eq(addressValue),
      "Invalid value was SET / GET for string key value pair"
    );
  });

  it("should set a value", async () => {
    const key = 123;
    const val = 456;

    const constants = [key, val];

    // prettier-ignore
    const source = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET),
    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source],
          constants,
        },
        1
      );

    // Eval
    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    const kvs = await consumerLogic["kvs()"]();

    // StackPointer
    const key_ = kvs[0];
    const val_ = kvs[1];

    assert(key_.eq(key), "Invalid key");
    assert(val_.eq(val), "Invalid value");
  });
});

describe("SET/GET Opcode tests with eval namespace", async function () {
  let rainInterpreter: Rainterpreter;
  let consumerLogicA: IInterpreterV1Consumer;
  let consumerLogicB: IInterpreterV1Consumer;

  beforeEach(async () => {
    rainInterpreter = await rainterpreterDeploy();
    const consumerFactory = await ethers.getContractFactory(
      "IInterpreterV1Consumer"
    );

    consumerLogicA = (await consumerFactory.deploy()) as IInterpreterV1Consumer;
    await consumerLogicA.deployed();

    consumerLogicB = (await consumerFactory.deploy()) as IInterpreterV1Consumer;
    await consumerLogicB.deployed();
  });

  it("should ensure that set adds keys to state changes array", async () => {
    const key = 123;
    const val = 456;
    const constants = [key, val];

    // prettier-ignore
    const sourceA = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET)

    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constants,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionA.dispatch,
      []
    );

    const kvs_ = await consumerLogicA["kvs()"]();
    await consumerLogicA["set(address,uint256[])"](
      await consumerLogicA.store(),
      kvs_
    );

    // Asserting kvs array
    const kvs = await consumerLogicA["kvs()"]();

    assert(kvs.length == 2, "Invalid kvs length");
    assert(kvs[0].eq(key), "Invalid Key set in kv");
    assert(kvs[1].eq(val), "Invalid Value set in kv");
  });

  it("should share set/get values across all expressions from the calling contract if namespace is not set", async () => {
    const key1 = 111111;
    const val1 = randomUint256();
    const key2 = 222222;
    const val2 = randomUint256();
    const constantsA = [key1, val1, key2, val2];
    const constantsB = [key1, key2];

    // prettier-ignore
    const sourceA = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
        op(Opcode.SET) ,

        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 3)), // val
        op(Opcode.SET)

    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constantsA,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionA.dispatch,
      []
    );

    // Saving state changes in interpreter storage
    const kvs_ = await consumerLogicA["kvs()"]();
    await consumerLogicA["set(address,uint256[])"](
      await consumerLogicA.store(),
      kvs_
    );

    // Asserting StateChanges array
    const kvs = await consumerLogicA["kvs()"]();

    assert(kvs.length == 4, "Invalid kvs length");
    assert(kvs[0].eq(key2), "Invalid Key set in kv");
    assert(kvs[1].eq(val2), "Invalid Value set in kv");
    assert(kvs[2].eq(key1), "Invalid Key set in kv");
    assert(kvs[3].eq(val1), "Invalid Value set in kv");

    // prettier-ignore
    const sourceB = concat([
      // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // key
        op(Opcode.GET),

        // GET KEY 2
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.GET)

    ]);

    const expressionB = await expressionConsumerDeploy(
      {
        sources: [sourceB],
        constants: constantsB,
      },
      rainInterpreter,
      2
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionB.dispatch,
      []
    );

    //Asserting stack
    const stack = await consumerLogicA.stack();

    assert(stack.length == 2, "Invalid stack length");
    assert(stack[0].eq(val2), "Invalid value was SET / GET for key 1");
    assert(stack[1].eq(val1), "Invalid value was SET / GET for key 2");
  });

  it("should not share set/get values across expressions for different calling contract if namespace is not set", async () => {
    const key = 111111;
    const val = randomUint256();
    const constants = [key, val];

    // prettier-ignore
    const sourceA = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET)
    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constants,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionA.dispatch,
      []
    );

    const kvs_ = await consumerLogicA["kvs()"]();
    await consumerLogicA["set(address,uint256[])"](
      consumerLogicA.store(),
      kvs_
    );

    // Asserting StateChanges array
    const kvs = await consumerLogicA["kvs()"]();

    assert(kvs.length == 2, "Invalid kvs length");
    assert(kvs[0].eq(key), "Invalid Key set in kv");
    assert(kvs[1].eq(val), "Invalid Value set in kv");

    // prettier-ignore
    const sourceB = concat([
      // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.GET),

    ]);

    const expressionB = await expressionConsumerDeploy(
      {
        sources: [sourceB],
        constants: constants,
      },
      rainInterpreter,
      1
    );

    await consumerLogicB.eval(
      rainInterpreter.address,
      expressionB.dispatch,
      []
    );

    //Asserting stack
    const stack = await consumerLogicB.stack();

    assert(stack.length == 1, "Invalid stack length");
    assert(stack[0].eq(0), "Invalid value was SET / GET for key");
  });

  it("should test that if namespace is set then set/get can only interact with other set/get in the same namespace as set by calling contract", async () => {
    const key = 111111;
    const val = randomUint256();
    const namespaceA = 999999;
    const namespaceB = 666666;

    const constants = [key, val];

    // prettier-ignore
    const sourceA = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET)

    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constants,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.evalWithNamespace(
      rainInterpreter.address,
      namespaceA,
      expressionA.dispatch,
      []
    );

    // Saving interpreter state
    const kvs_ = await consumerLogicA["kvs()"]();
    await consumerLogicA["set(address,uint256,uint256[])"](
      await consumerLogicA.store(),
      namespaceA,
      kvs_
    );

    // Asserting kvs array
    const kvs = await consumerLogicA["kvs()"]();

    assert(kvs.length == 2, "Invalid kvs length");
    assert(kvs[0].eq(key), "Invalid Key set in kv");
    assert(kvs[1].eq(val), "Invalid Value set in kv");

    // B evals on different namespace
    // prettier-ignore
    const sourceB = concat([
      // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.GET),

    ]);

    const expressionB = await expressionConsumerDeploy(
      {
        sources: [sourceB],
        constants: constants,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.evalWithNamespace(
      rainInterpreter.address,
      namespaceB,
      expressionB.dispatch,
      []
    );

    //Asserting stack
    const stackB = await consumerLogicA.stack();

    assert(stackB.length == 1, "Invalid stack length");
    assert(stackB[0].eq(0), "Invalid value was SET / GET for key 1");

    // C evals on correct namespace
    // prettier-ignore
    const sourceC = concat([
      // GET KEY 1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.GET),

    ]);

    const expressionC = await expressionConsumerDeploy(
      {
        sources: [sourceC],
        constants: constants,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.evalWithNamespace(
      rainInterpreter.address,
      namespaceA,
      expressionC.dispatch,
      []
    );

    //Asserting stack
    const stackA = await consumerLogicA.stack();

    assert(stackA.length == 1, "Invalid stack length");
    assert(stackA[0].eq(val), "Invalid value was SET / GET for key 1");
  });

  it("should ensure that calling set doesn't overwrite keys in the same namespace from a different calling contract", async () => {
    const key = 111111;
    const val1 = randomUint256();
    const val2 = randomUint256();
    const namespaceA = 999999;

    const constantsA = [key, val1];
    const constantsB = [key, val2];

    // prettier-ignore
    const sourceA = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET)

    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constantsA,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.evalWithNamespace(
      rainInterpreter.address,
      namespaceA,
      expressionA.dispatch,
      []
    );

    const _KVsA = await consumerLogicA["kvs()"]();
    await consumerLogicA["set(address,uint256,uint256[])"](
      await consumerLogicA.store(),
      namespaceA,
      _KVsA
    );

    // prettier-ignore
    const sourceB = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
    op(Opcode.SET)

  ]);

    const expressionB = await expressionConsumerDeploy(
      {
        sources: [sourceB],
        constants: constantsB,
      },
      rainInterpreter,
      1
    );

    await consumerLogicB.evalWithNamespace(
      rainInterpreter.address,
      namespaceA,
      expressionB.dispatch,
      []
    );

    const _KVsB = await consumerLogicB["kvs()"]();
    await consumerLogicB["set(address,uint256,uint256[])"](
      consumerLogicB.store(),
      namespaceA,
      _KVsB
    );

    // Asserting KVs array
    const KVsA = await consumerLogicA["kvs()"]();
    const KVsB = await consumerLogicB["kvs()"]();

    assert(KVsA.length == 2, "Invalid KVsA length");
    assert(KVsA[0].eq(key), "Invalid Key set in KVsA");
    assert(KVsA[1].eq(val1), "Invalid Value set in KVsA");

    assert(KVsB.length == 2, "Invalid KVsB length");
    assert(KVsB[0].eq(key), "Invalid Key set in KVsB");
    assert(KVsB[1].eq(val2), "Invalid Value set in KVsB");
  });

  it("ensure that calling get on an unset key falls back to 0", async () => {
    const key1 = 111111;
    const val1 = 123;
    const key2 = 222222;

    const constantsA = [key1, val1];
    const constantsB = [key2];

    // prettier-ignore
    const sourceA = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET)

    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constantsA,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA["eval(address,uint256,uint256[][])"](
      rainInterpreter.address,
      expressionA.dispatch,
      []
    );

    const _KVsA = await consumerLogicA["kvs()"]();
    await consumerLogicA["set(address,uint256[])"](
      await consumerLogicA.store(),
      _KVsA
    );

    // prettier-ignore
    const sourceB = concat([
        // GET KEY 2
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.GET),
    ]);

    const expressionB = await expressionConsumerDeploy(
      {
        sources: [sourceB],
        constants: constantsB,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA["eval(address,uint256,uint256[][])"](
      rainInterpreter.address,
      expressionB.dispatch,
      []
    );

    //Asserting stack
    const stack = await consumerLogicA.stack();
    assert(stack.length == 1, "Invalid stack length");
    assert(stack[0].eq(0), "Invalid value was SET / GET for key");
  });

  it("ensure that calling get returns the latest set value with priority over previous calls to set", async () => {
    const key = 111;
    const val1 = 456;
    const val2 = 789;
    const val3 = 123;

    const constantsA = [key, val1, val2];
    const constantsB = [key, val3];
    const constantsC = [key];

    // prettier-ignore
    const sourceA = concat([
      // set key1
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
      op(Opcode.SET) ,

      // override previous set
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // val
      op(Opcode.SET)

    ]);

    const expressionA = await expressionConsumerDeploy(
      {
        sources: [sourceA],
        constants: constantsA,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionA.dispatch,
      []
    );

    const _KVsA = await consumerLogicA["kvs()"]();
    // Assert State Change
    assert(_KVsA.length == 2, "Invalid kvs length");
    assert(_KVsA[0].eq(key), "Invalid Key set in kvs");
    assert(_KVsA[1].eq(val2), "Invalid Value set in kvs");

    await consumerLogicA["set(address,uint256[])"](
      await consumerLogicA.store(),
      _KVsA
    );

    // prettier-ignore
    const sourceB = concat([
      // override set again by different expression
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val
    op(Opcode.SET)

  ]);

    const expressionB = await expressionConsumerDeploy(
      {
        sources: [sourceB],
        constants: constantsB,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionB.dispatch,
      []
    );

    const _KVsB = await consumerLogicA["kvs()"]();

    //assert state change
    assert(_KVsB.length == 2, "Invalid kvs length");
    assert(_KVsB[0].eq(key), "Invalid Key set in kv");
    assert(_KVsB[1].eq(val3), "Invalid Value set in kv");

    await consumerLogicA["set(address,uint256[])"](
      await consumerLogicA.store(),
      _KVsB
    );

    // prettier-ignore
    const sourceC = concat([
      // GET latest SET value
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // key
      op(Opcode.GET)
    ]);

    const expressionC = await expressionConsumerDeploy(
      {
        sources: [sourceC],
        constants: constantsC,
      },
      rainInterpreter,
      1
    );

    await consumerLogicA.eval(
      rainInterpreter.address,
      expressionC.dispatch,
      []
    );

    //Asserting stack
    const stack = await consumerLogicA.stack();
    assert(stack.length == 1, "Invalid stack length");
    assert(stack[0].eq(val3), "Invalid value was SET / GET for key");
  });
});

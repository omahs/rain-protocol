import { assert, expect } from "chai";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { IInterpreterV1Consumer, Rainterpreter } from "../../../../typechain";
import {
  AllStandardOps,
  assertError,
  callOperand,
  loopNOperand,
  memoryOperand,
  MemoryType,
  op,
} from "../../../../utils";
import { rainterpreterDeploy } from "../../../../utils/deploy/interpreter/shared/rainterpreter/deploy";
import { expressionConsumerDeploy } from "../../../../utils/deploy/test/iinterpreterV1Consumer/deploy";

const Opcode = AllStandardOps;

describe("LOOP_N Opcode test", async function () {
  let rainInterpreter: Rainterpreter;
  let logic: IInterpreterV1Consumer;

  before(async () => {
    rainInterpreter = await rainterpreterDeploy();

    const consumerFactory = await ethers.getContractFactory(
      "IInterpreterV1Consumer"
    );
    logic = (await consumerFactory.deploy()) as IInterpreterV1Consumer;
    await logic.deployed();
  });

  // TODO: LOOP_N_INPUTS

  it("should loop the source 0 times", async () => {
    const n = 0;

    const initialValue = 2;
    const incrementValue = 1;

    const constants = [initialValue, incrementValue];

    // prettier-ignore
    const sourceADD = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
         op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)),
        op(Opcode.ADD, 2),
      ]);

    // prettier-ignore
    const sourceMAIN = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.LOOP_N, loopNOperand(n, 1, 1, 1))
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [sourceMAIN, sourceADD],
        constants,
      },
      rainInterpreter,
      1
    );

    let expectedResult = initialValue;
    for (let i = 0; i < n; i++) {
      expectedResult += incrementValue;
    }

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stackTop();
    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  it("should loop the source N times", async () => {
    const n = 5;
    const initialValue = 2;
    const incrementValue = 1;

    const constants = [initialValue, incrementValue];

    // prettier-ignore
    const sourceADD = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)),
        op(Opcode.ADD, 2),
      ]);

    // prettier-ignore
    const sourceMAIN = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.LOOP_N, loopNOperand(n, 1, 1, 1))
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [sourceMAIN, sourceADD],
        constants,
      },
      rainInterpreter,
      1
    );

    let expectedResult = initialValue;
    for (let i = 0; i < n; i++) {
      expectedResult += incrementValue;
    }

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stackTop();
    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  it("should loop the source MAX N times", async () => {
    const n = 15;
    const initialValue = 2;
    const incrementValue = 1;

    const constants = [initialValue, incrementValue];

    // prettier-ignore
    const sourceADD = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
         op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)),
        op(Opcode.ADD, 2),
      ]);

    // prettier-ignore
    const sourceMAIN = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.LOOP_N, loopNOperand(n, 1, 1, 1))
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [sourceMAIN, sourceADD],
        constants,
      },
      rainInterpreter,
      1
    );

    let expectedResult = initialValue;
    for (let i = 0; i < n; i++) {
      expectedResult += incrementValue;
    }

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stackTop();
    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  it("should execute a nested loop using multiple sources", async () => {
    const n = 3;
    const initialValue = 2;
    const incrementValueOuter = 1;
    const incrementValueInner = 5;

    const constants = [initialValue, incrementValueOuter, incrementValueInner];

    // prettier-ignore
    const sourceMAIN = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.LOOP_N, loopNOperand(n, 1, 1, 1))
    ]);
    // prettier-ignore
    const sourceADDOuter = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)),
        op(Opcode.ADD, 2),
      op(Opcode.LOOP_N, loopNOperand(n, 1, 1, 2))
    ]);

    // prettier-ignore
    const sourceADDInner = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)),
        op(Opcode.ADD, 2),
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [sourceMAIN, sourceADDOuter, sourceADDInner],
        constants,
      },
      rainInterpreter,
      1
    );

    let expectedResult = initialValue;
    for (let i = 0; i < n; i++) {
      expectedResult += incrementValueOuter;
      for (let j = 0; j < n; j++) {
        expectedResult += incrementValueInner;
      }
    }

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stackTop();
    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  it("should explode the value calculated in the loop", async () => {
    // This test builds a (32 * 8) 256 bit value using LOOP_N and explodes it using EXPLODE32

    const n = 8;

    const initialValue = 12344;
    const incrementValue = 1;
    const finalValue = 0;
    const level = 7;
    const bits = 32;

    const constants = [
      initialValue,
      incrementValue,
      2,
      bits,
      finalValue,
      level,
      1,
    ];

    // prettier-ignore
    const sourceShiftRight = concat([
            op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // 2
              op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 3)), // 32
              op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)), // LEVEL
            op(Opcode.MUL, 2), // 32 * LEVEL
          op(Opcode.EXP, 2), // 2 ** (32 * LEVEL)
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)), // INITIAL_VALUE
        op(Opcode.MUL, 2),

        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)), // FINAL_VALUE
      op(Opcode.ADD, 2),
    ]);

    // prettier-ignore
    const sourceAddAndShiftRight = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)), // INITIAL VALUE
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // INCREMENT
        op(Opcode.ADD, 2),

          // Right Shifting
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 3)), // INITIAL_VALUE
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)), // FINAL_VALUE
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)), // LEVEL
        op(Opcode.CALL, callOperand(3, 1, 3)),

          // Decrementing the LEVEL
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)), // LEVEL
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 6)), // LEVEL DECREMENT
        op(Opcode.SATURATING_SUB, 2), // LEVEL - 1
    ]);

    // prettier-ignore
    const sourceADD = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)),
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)),
      op(Opcode.CALL, callOperand(3, 3, 2)),
    ]);

    // prettier-ignore
    const sourceMAIN = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // Initial Value
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 4)), // FINAL VALUE
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 5)), // LEVEL
      op(Opcode.LOOP_N, loopNOperand(n, 3, 3, 1)),
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)), // FINAL VALUE
      op(Opcode.EXPLODE32),
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [
          sourceMAIN,
          sourceADD,
          sourceAddAndShiftRight,
          sourceShiftRight,
        ],
        constants,
      },
      rainInterpreter,
      8
    );

    let expectedResult = [];
    let expectedResultTemp = ethers.BigNumber.from(initialValue);
    for (let i = 0; i < n; i++) {
      expectedResultTemp = expectedResultTemp.add(incrementValue);
      expectedResult.push(expectedResultTemp);
    }

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stack();

    expectedResult = expectedResult.reverse();
    expect(result0).deep.equal(
      expectedResult,
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  // @TODO
  // This is an impossible situation when we disallow having more inputs than
  // outputs. The original intention was that the result of the explode would be
  // reduced from 8 values down to a single value through the loop N, but since
  // we restricted inputs to be less than or equal to outputs, it is not possible
  // to reduce the stack in this way.
  // We should revisit this when we have a way to represent it in rainlang.
  xit("should loop over an exploded value", async () => {
    // This test builds a (32 * 8) 256 bit value using LOOP_N and explodes it using EXPLODE32

    const n = 8;

    const initialValue = 12344;
    const incrementValue = 1;
    const finalValue = 0;
    const level = 7;
    const bits = 32;

    const constants = [
      initialValue,
      incrementValue,
      2,
      bits,
      finalValue,
      level,
      1,
    ];

    // prettier-ignore
    const sourceShiftRight = concat([
            op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 2)), // 2
              op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 3)), // 32
              op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)), // LEVEL
            op(Opcode.MUL, 2), // 32 * LEVEL
          op(Opcode.EXP, 2), // 2 ** (32 * LEVEL)
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)), // INITIAL_VALUE
        op(Opcode.MUL, 2),

        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)), // FINAL_VALUE
      op(Opcode.ADD, 2),
    ]);

    // prettier-ignore
    const sourceAddAndShiftRight = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)), // INITIAL VALUE
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // INCREMENT
        op(Opcode.ADD, 2),

          // Right Shifting
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 3)), // INITIAL_VALUE
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)), // FINAL_VALUE
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)), // LEVEL
        op(Opcode.CALL, callOperand(3, 1, 3)),

          // Decrementing the LEVEL
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)), // LEVEL
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 6)), // LEVEL DECREMENT
        op(Opcode.SATURATING_SUB, 2), // LEVEL - 1
    ]);

    // prettier-ignore
    const sourceADDUsingFunction = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)),
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 2)),
      op(Opcode.CALL, callOperand(3, 3, 2)),
    ]);

    const sourceADD = concat([
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)),
      op(Opcode.ADD, 2),
    ]);

    // prettier-ignore
    const sourceMAIN = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // Initial Value
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 4)), // FINAL VALUE
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 5)), // LEVEL
      op(Opcode.LOOP_N, loopNOperand(n, 3, 3, 1)),
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)), // FINAL VALUE
      op(Opcode.EXPLODE32), // EXPLODING the Value
      // explode is multioutput so the highwater has moved
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 9)),
      op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 10)),
      op(Opcode.LOOP_N, loopNOperand(7, 2, 2, 4)),
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [
          sourceMAIN,
          sourceADDUsingFunction,
          sourceAddAndShiftRight,
          sourceShiftRight,
          sourceADD,
        ],
        constants,
      },
      rainInterpreter,
      1
    );

    let expectedResult = ethers.BigNumber.from(0);
    let expectedResultTemp = ethers.BigNumber.from(initialValue);
    for (let i = 0; i < n; i++) {
      expectedResultTemp = expectedResultTemp.add(incrementValue);
      expectedResult = expectedResult.add(expectedResultTemp);
    }

    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stackTop();

    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  it("should pass the integrity check when enough values are available for the operand to process", async () => {
    const n = 1; // Loop will run only once

    const initialValue = 2;
    const incrementValue = 1;

    const constants = [initialValue, incrementValue];

    // prettier-ignore
    const sourceADD = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val3 --> Will be placed on the stack everytime the LOOP Source will execute
        op(Opcode.ADD, 3), // ADD REQUIRES 3 VALUES
      ]);

    // prettier-ignore
    const sourceMAIN = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // val1 --> Available only once in the stack for the LOOP Source
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // val2 --> Available only once in the stack for the LOOP Source
      op(Opcode.LOOP_N, loopNOperand(n, 2, 2, 1))
    ]);

    const expression0 = await expressionConsumerDeploy(
      {
        sources: [sourceMAIN, sourceADD],
        constants,
      },
      rainInterpreter,
      1
    );

    const expectedResult = 5;
    await logic.eval(rainInterpreter.address, expression0.dispatch, []);
    const result0 = await logic.stackTop();
    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });

  it("should fail the integrity check when not enough values are available for the operand to process", async () => {
    const n = 2; // Loop will run only once

    const initialValue = 2;
    const incrementValue = 1;

    const constants = [initialValue, incrementValue];

    // prettier-ignore
    const sourceADD = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Stack, 1)),
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // val3 --> Will be placed on the stack everytime the LOOP Source will execute
        op(Opcode.ADD, 3), // ADD REQUIRES 3 VALUES
      ]);

    // prettier-ignore
    const sourceMAIN = concat([
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // val1 --> Available only once in the stack for the LOOP Source
        op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 0)), // val2 --> Available only once in the stack for the LOOP Source
      op(Opcode.LOOP_N, loopNOperand(n, 1, 1, 1))
    ]);

    await assertError(
      async () =>
        await expressionConsumerDeploy(
          {
            sources: [sourceMAIN, sourceADD],
            constants,
          },
          rainInterpreter,
          1
        ),
      "StackPopUnderflow",
      "Integrity check passed even when enough values are not available on the stack"
    );
  });
});

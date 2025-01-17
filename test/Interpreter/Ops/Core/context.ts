import { assert } from "chai";
import { concat } from "ethers/lib/utils";
import { flatten2D } from "../../../../utils/array/flatten";
import { iinterpreterV1ConsumerDeploy } from "../../../../utils/deploy/test/iinterpreterV1Consumer/deploy";
import { op } from "../../../../utils/interpreter/interpreter";
import { AllStandardOps } from "../../../../utils/interpreter/ops/allStandardOps";
import { assertError } from "../../../../utils/test/assertError";

const Opcode = AllStandardOps;

describe("RainInterpreter context", async function () {
  it("should support context height [COLUMN] up to 16", async () => {
    const constants = [];
    const sources = [concat([op(Opcode.CONTEXT, 0x0f00)])];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    const col: number[] = [1];
    const context = new Array<number[]>(16).fill(col, 0, 256);
    await consumerLogic.eval(interpreter.address, dispatch, context);
    const resultCol_ = await consumerLogic.stack();
    assert(resultCol_, "should read context value at 0xff00");
  });

  it("should support context width [ROW] up to 16", async () => {
    const constants = [];
    const sources = [concat([op(Opcode.CONTEXT, 0x000f)])];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    const row: number[] = new Array<number>(16).fill(1, 0, 256);
    const context = [row];
    await consumerLogic.eval(interpreter.address, dispatch, context);
    const resultRow_ = await consumerLogic.stack();
    assert(resultRow_, "should read context value at 0x00ff");
  });

  it("should error if accessing memory outside of context memory range", async () => {
    const constants = [];
    const sources = [concat([op(Opcode.CONTEXT, 0x0003)])];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    const data = [[10, 20, 30]];

    await assertError(
      async () => await consumerLogic.eval(interpreter.address, dispatch, data),
      "Array accessed at an out-of-bounds or negative index",
      "did not error when accessing memory outside of context memory range"
    );
  });

  it("should not necessarily require square context matrix", async () => {
    const constants = [];
    const sources = [
      concat([
        op(Opcode.CONTEXT, 0x0000),
        op(Opcode.CONTEXT, 0x0001),
        op(Opcode.CONTEXT, 0x0002),
        op(Opcode.CONTEXT, 0x0003),
        op(Opcode.CONTEXT, 0x0100),
        op(Opcode.CONTEXT, 0x0101),
        op(Opcode.CONTEXT, 0x0102),
        op(Opcode.CONTEXT, 0x0103),
        op(Opcode.CONTEXT, 0x0200),
        op(Opcode.CONTEXT, 0x0201),
        op(Opcode.CONTEXT, 0x0202), // OOB read
      ]),
    ];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    const context = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9], // no value at (2,2)
    ];

    assertError(
      async () =>
        await consumerLogic.eval(interpreter.address, dispatch, context),
      "VM Exception while processing transaction: reverted with panic code 0x32 (Array accessed at an out-of-bounds or negative index)",
      "did not trigger OOB read error"
    );
  });

  it("should return correct context value when specifying context operand for 2D context", async () => {
    const constants = [];
    const sources = [
      concat([
        op(Opcode.CONTEXT, 0x0000),
        op(Opcode.CONTEXT, 0x0001),
        op(Opcode.CONTEXT, 0x0002),
        op(Opcode.CONTEXT, 0x0003),
        op(Opcode.CONTEXT, 0x0100),
        op(Opcode.CONTEXT, 0x0101),
        op(Opcode.CONTEXT, 0x0102),
        op(Opcode.CONTEXT, 0x0103),
        op(Opcode.CONTEXT, 0x0200),
        op(Opcode.CONTEXT, 0x0201),
      ]),
    ];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        10
      );

    const context = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ];

    await consumerLogic.eval(interpreter.address, dispatch, context);

    const result_ = await consumerLogic.stack();

    const expectedFlattenedContext = flatten2D(context);

    expectedFlattenedContext.forEach((expectedValue, i_) => {
      assert(
        result_[i_].eq(expectedValue),
        `wrong value was returned at index ${i_}
        expected  ${expectedValue}
        got       ${result_[i_]}`
      );
    });
  });

  it("should return correct context value when specifying context operand for 1D context", async () => {
    const constants = [];
    const sources = [
      concat([
        op(Opcode.CONTEXT, 0x0000),
        op(Opcode.CONTEXT, 0x0001),
        op(Opcode.CONTEXT, 0x0002),
      ]),
    ];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        3
      );

    const context = [[10, 20, 30]];

    await consumerLogic.eval(interpreter.address, dispatch, context);

    const result_ = await consumerLogic.stack();

    context[0].forEach((expectedValue, i_) => {
      assert(
        result_[i_].eq(expectedValue),
        `wrong value was returned at index ${i_}
        expected  ${expectedValue}
        got       ${result_[i_]}`
      );
    });
  });

  it("should support adding new data to stack at runtime via CONTEXT opcode", async () => {
    const constants = [];
    const sources = [concat([op(Opcode.CONTEXT, 0x0000)])];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    const data = [[42]];

    await consumerLogic.eval(interpreter.address, dispatch, data);

    const result = await consumerLogic.stackTop();
    const expected = 42;

    assert(
      result.eq(expected),
      `wrong value was returned
      expected  ${expected}
      got       ${result}`
    );
  });
});

import chai from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import type { ReadWriteTier } from "../typechain/ReadWriteTier";
import type { TierUtilTest } from "../typechain/TierUtilTest";
import type { ReserveToken } from "../typechain/ReserveToken";
import { assertError, basicDeploy } from "./Util";

chai.use(solidity);
const { expect, assert } = chai;

enum Tier {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
}

describe("TierUtil", async function () {
  let owner: any;
  let signer1: any;
  let readWriteTier: ReadWriteTier;
  let reserve: ReserveToken;
  let tierUtil: TierUtilTest;

  beforeEach(async () => {
    [owner, signer1] = await ethers.getSigners();

    const tierFactory = await ethers.getContractFactory("ReadWriteTier");
    readWriteTier = (await tierFactory.deploy()) as ReadWriteTier;
    await readWriteTier.deployed();

    tierUtil = (await basicDeploy("TierUtilTest", {})) as TierUtilTest;

    reserve = (await basicDeploy("ReserveToken", {})) as ReserveToken;
  });

  it("should correctly return the highest achieved tier relative to a given report and block number", async () => {
    const initialBlock = await ethers.provider.getBlockNumber();

    await readWriteTier.connect(signer1).setTier(signer1.address, Tier.ONE, []);

    while ((await ethers.provider.getBlockNumber()) < initialBlock + 10) {
      reserve.transfer(signer1.address, 0); // create empty block
    }

    await readWriteTier.connect(signer1).setTier(signer1.address, Tier.TWO, []);

    while ((await ethers.provider.getBlockNumber()) < initialBlock + 20) {
      reserve.transfer(signer1.address, 0); // create empty block
    }

    const report = await readWriteTier.report(signer1.address);

    const tierBlockReport1 = await tierUtil.tierAtBlockFromReport(
      report,
      initialBlock + 5
    );

    const tierBlockReport2 = await tierUtil.tierAtBlockFromReport(
      report,
      initialBlock + 15
    );

    assert(tierBlockReport1 === Tier.ONE);
    assert(tierBlockReport2 === Tier.TWO);
  });

  it("should return the block for a specified status according to a given report", async () => {
    const initialBlock = await ethers.provider.getBlockNumber();

    // set status ONE
    await readWriteTier.connect(signer1).setTier(signer1.address, Tier.ONE, []);
    const expectedTier1Block = await ethers.provider.getBlockNumber();

    // make empty blocks
    while ((await ethers.provider.getBlockNumber()) < initialBlock + 10) {
      reserve.transfer(signer1.address, 0); // create empty block
    }

    // set status TWO
    await readWriteTier.connect(signer1).setTier(signer1.address, Tier.TWO, []);
    const expectedTier2Block = await ethers.provider.getBlockNumber();

    // make empty blocks
    while ((await ethers.provider.getBlockNumber()) < initialBlock + 20) {
      reserve.transfer(signer1.address, 0); // create empty block
    }

    // get latest report
    const report = await readWriteTier.report(signer1.address);

    const tierBlock0 = await tierUtil.tierBlock(report, Tier.ZERO);
    const tierBlock1 = await tierUtil.tierBlock(report, Tier.ONE);
    const tierBlock2 = await tierUtil.tierBlock(report, Tier.TWO);
    const tierBlock3 = await tierUtil.tierBlock(report, Tier.THREE);

    assert(tierBlock0.isZero(), "did not return block 0");

    assert(
      tierBlock1.eq(expectedTier1Block),
      `wrong tier ONE status block
    report    ${report.toHexString()}
    expected  ${expectedTier1Block}
    got       ${tierBlock1}`
    );

    assert(
      tierBlock2.eq(expectedTier2Block),
      `wrong tier TWO status block
    report    ${report.toHexString()}
    expected  ${expectedTier2Block}
    got       ${tierBlock2}`
    );

    assert(
      ethers.BigNumber.from("0xFFFFFFFF").eq(tierBlock3.toHexString()),
      "reported block for tier THREE despite signer never having tier THREE status"
    );
  });

  it("should clear (set to 0xFF) all tiers above the given tier in the given report", async () => {
    await readWriteTier
      .connect(signer1)
      .setTier(signer1.address, Tier.THREE, []);

    const report = await readWriteTier.report(signer1.address);

    const truncatedReport = await tierUtil.truncateTiersAbove(report, Tier.ONE);

    const expectedTruncatedReport =
      "0x" + "f".repeat(7 * 8) + report.toHexString().slice(-8);

    assert(
      truncatedReport.eq(expectedTruncatedReport),
      `did not truncate report correctly
    expected  ${expectedTruncatedReport}
    got       ${truncatedReport.toHexString()}`
    );
  });

  it("should set all tiers within a min/max tier range to the specified block number in a given report", async () => {
    const initialBlock = await ethers.provider.getBlockNumber();

    await readWriteTier.connect(signer1).setTier(signer1.address, Tier.TWO, []);

    const report = await readWriteTier.report(signer1.address);

    const targetBlock = initialBlock + 1000;

    const updatedReportBadRange = await tierUtil.updateBlocksForTierRange(
      report,
      Tier.SEVEN,
      Tier.SIX,
      targetBlock
    );

    // bad range should return original report
    assert(updatedReportBadRange.eq(report), "changed report with bad range");

    const updatedReport = await tierUtil.updateBlocksForTierRange(
      report,
      Tier.SIX, // smaller number first
      Tier.SEVEN,
      targetBlock
    );

    const initialBlockHex = ethers.BigNumber.from(targetBlock)
      .toHexString()
      .slice(2);

    const initialBlockHexFormatted =
      "0".repeat(8 - initialBlockHex.length) + initialBlockHex;

    const expectedUpdatedReport =
      report.toHexString().slice(0, 2 + 8) +
      initialBlockHexFormatted +
      report.toHexString().slice(18);

    assert(
      updatedReport.eq(expectedUpdatedReport),
      `got wrong updated report
    expected  ${expectedUpdatedReport}
    got       ${updatedReport.toHexString()}`
    );
  });
});

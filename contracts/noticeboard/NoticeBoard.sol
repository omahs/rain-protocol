// SPDX-License-Identifier: CAL
pragma solidity =0.8.10;

struct Notice {
    /// Every notice is assumed to be about some contract. If it isn't then
    /// emitting `0` bytes for the address will likely be cheaper in gas.
    address subject;
    /// Opaque bytes to be interpreted by the indexer/GUI.
    bytes data;
}

contract NoticeBoard {
    /// Anyone can emit a `Notice`.
    /// This is open ended content related to the subject.
    /// Some examples:
    /// - Raise descriptions/promises
    /// - Reviews/comments from token holders
    /// - Simple onchain voting/signalling
    /// GUIs/tooling/indexers reading this data are expected to know how to
    /// interpret it in context because the `NoticeBoard` contract does not.
    event NewNotice(
        /// The `msg.sender` that emitted the `Notice`.
        address sender,
        /// The notice data.
        Notice notice
    );

    /// Anyone can create notices about some subject.
    /// The notice is opaque bytes. The indexer/GUI is expected to understand
    /// the context to decode/interpret it. The indexer/GUI is strongly
    /// recommended to filter out untrusted content.
    /// @param notices_ All the notices to emit.
    function createNotices(Notice[] calldata notices_) external {
        for (uint256 i_ = 0; i_ < notices_.length; i_++) {
            emit NewNotice(msg.sender, notices_[i_]);
        }
    }
}
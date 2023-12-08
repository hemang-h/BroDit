// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract brodit {
    struct Box {
        address sender;
        string broditCid;
        uint256 expirationDate;
        uint256 stake;
    }

    event broditCreated(address indexed sender, uint256 id);

    mapping (uint256 => Box) private brodites;

    function create(
        uint256 memory broditCid,
        uint256 id,
        uint256 expirationDate
    ) public payable {
        require(
            brodites[id].sender == address(0),
            "Brodit Already Exists!"
        );

        require (msg.value > 0, "Stake not set");

        Box memory box = Box({
            sender: msg.sender,
            broditCid: broditCid,
            expirationDate: expirationDate,
            stake: msg.value
        });

    }
        function getBrodit(uint256 id) public view returns (Box memory) {
            return brodites[id];
        }
}
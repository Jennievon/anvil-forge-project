// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract Marketplace {
    struct Item {
        uint256 id;
        address seller;
        string name;
        string description;
        uint256 price;
        bool active;
    }

    IERC20 public paymentToken;
    uint256 public itemCount;
    mapping(uint256 => Item) public items;
    
    event ItemListed(uint256 indexed id, address indexed seller, string name, uint256 price);
    event ItemSold(uint256 indexed id, address indexed seller, address indexed buyer, uint256 price);
    event ItemDelisted(uint256 indexed id);

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listItem(string memory _name, string memory _description, uint256 _price) external returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        
        itemCount++;
        items[itemCount] = Item(
            itemCount,
            msg.sender,
            _name,
            _description,
            _price,
            true
        );

        emit ItemListed(itemCount, msg.sender, _name, _price);
        return itemCount;
    }

    function buyItem(uint256 _id) external {
        Item storage item = items[_id];
        require(item.active, "Item not available");
        require(msg.sender != item.seller, "Cannot buy your own item");
        
        require(paymentToken.transferFrom(msg.sender, item.seller, item.price), "Payment failed");
        
        item.active = false;
        emit ItemSold(_id, item.seller, msg.sender, item.price);
    }

    function delistItem(uint256 _id) external {
        Item storage item = items[_id];
        require(item.seller == msg.sender, "Not the seller");
        require(item.active, "Item not active");
        
        item.active = false;
        emit ItemDelisted(_id);
    }

    function getItem(uint256 _id) external view returns (Item memory) {
        return items[_id];
    }

    function getActiveItems() external view returns (Item[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= itemCount; i++) {
            if (items[i].active) {
                activeCount++;
            }
        }

        Item[] memory activeItems = new Item[](activeCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= itemCount; i++) {
            if (items[i].active) {
                activeItems[index] = items[i];
                index++;
            }
        }

        return activeItems;
    }
}
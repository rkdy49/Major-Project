// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./Ownable.sol";


contract Product is Ownable {

    struct S_Item {
        string productName;
        uint price;
        string nameOfManufacture;
        string locationOfManufacture;
        string dateOfManufacture;
        string [] licenses;
    }

    mapping(uint => S_Item) public items;

    function createItem( uint256 itemId, S_Item memory itemInfo) public {
      require(items[itemId].price == 0, "Item already exists");
       items[itemId] = itemInfo;
    }

    function getItemInfo(uint256 itemId) public view returns (S_Item memory){
        require(items[itemId].price != 0, "Item does not exist");
        return items[itemId];
    }

  

}

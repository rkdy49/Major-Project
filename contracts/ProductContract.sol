// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;



contract ProductContract {

    struct S_Item {
        string itemName;
        uint itemPrice;
        string nameOfManufacture;
        string locationOfManufacture;
        string dateOfManufacture;
        string [] licenses;
    }

    mapping(string => S_Item) public items;

    function createItem( string memory itemId, S_Item memory itemInfo) public {
      require(items[itemId].itemPrice == 0, "Item already exists");
       items[itemId] = itemInfo;
    }

    function getItemInfo(string memory itemId) public view returns (S_Item memory){
        require(items[itemId].itemPrice != 0, "Item does not exist");
        return items[itemId];
    }

  

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./Ownable.sol";


contract Product is Ownable {

    struct S_Item {
        string productName;
        uint price;
        string nameOfManufacture;
        string _locationOfManufacture;
        string _dateOfManufacture;
        string [] licenses;
    }

    mapping(uint => S_Item) public items;
    uint index;

    function createItem(string memory _identifier, uint _priceInWei, string memory _date) public onlyOwner {
        items[index]._step = "Created";
        items[index]._identifier = _identifier;
        items[index]._date = _date;
        index++;
    }

    function getItemCode() public view returns (uint){
        return index-1;
    }

    function setItemLocation(uint _itemCode, string memory _location) public onlyOwner{
        items[_itemCode]._location = _location;
    }



    function getItemIdentifier(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._identifier;
    }
    function getItemLocation(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._location;
    }
   
    function getItemDate(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._date;
    }

  

}

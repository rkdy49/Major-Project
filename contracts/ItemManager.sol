pragma solidity ^0.8.1;
import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {

    struct S_Item {
        Item _item;
        string _step;
        string _identifier;
        string _location;
        string _date;

    }
    mapping(uint => S_Item) public items;
    uint index;

    function createItem(string memory _identifier, uint _priceInWei, string memory _date) public onlyOwner {
        Item item = new Item(this, _priceInWei, index);
        items[index]._item = item;
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

    function triggerPayment(uint _index) public payable {
    
        require(compareStrings(items[_index]._step,  "Created"), "Item is further in the supply chain");
        items[_index]._step = "Paid";
    }

    function triggerDelivery(uint _index) public onlyOwner {
        require(compareStrings(items[_index]._step,  "Paid"), "Item is further in the supply chain");
        items[_index]._step = "Delivered";
    }

    function getItemIdentifier(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._identifier;
    }
    function getItemLocation(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._location;
    }
    function getItemStatus(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._step;
    }
    function getItemDate(uint _itemCode) public view returns (string memory){
        return  items[_itemCode]._date;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

}

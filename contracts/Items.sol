pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Items {

    string[] public items;

    function loadItems() public {
        items.push('Sword');
        items.push('Shield');
        items.push('Axe');
    }

    function getItem(uint index) public view returns (string memory) {
        return (items[index]);
    }
}

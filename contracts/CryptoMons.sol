pragma solidity ^0.4.18;

/// @title Modified interface for contracts conforming to ERC-721: Non-Fungible Tokens
/// Differs as a seller does not need to approve the buyer, only needs to approve to
/// sell his card and buyer only needs to pay the seller required price
contract ModifiedERC721 {
    // Required methods
    function totalSupply() public pure returns (uint8 total);
    function balanceOf(address _owner) public view returns (uint8 balance);
    function ownerOf(uint8 _tokenId) public view returns (address owner);
    function putOnMarket(uint8 _tokenId, uint _price) external;
    function takeOffMarket(uint8 _tokenId) external;
    function transfer(uint8 _tokenId) payable external;

    // Events
    event OnMarket(address owner, uint8 tokenId, uint price);
    event OffMarket(address owner, uint8 tokenId);
    event Transfer(address from, address to, uint8 tokenId);
}

contract CryptoMonStorage is ModifiedERC721 {

    // @FIELDS

    mapping(uint8 => address) private cryptoMonToOwners;
    mapping(address => uint8) private cryptoMonCount;

    mapping(uint8 => bool) private cryptoMonOffMarket;
    mapping(uint8 => uint) private cryptoMonPrice;

    mapping (address => uint) pendingWithdrawals;

    // @EVENTS

    event Withdraw(address from);

    // @FUNCTIONS

    // All cryptomon are available for buying at the start,
    // they all belong to the 0 address, and are given away for free (price is 0)
    function CryptoMonStorage() public {
        cryptoMonCount[address(0)] = totalSupply();
    }

    // Allow for a max of 156 CryptoMons
    function totalSupply() public pure returns (uint8 supply) {
        return 156;
    }

    function balanceOf(address _owner) public view returns (uint8 balance) {
        return cryptoMonCount[_owner];
    }

    function ownerOf(uint8 _tokenId) public view returns (address owner) {
        require(_tokenId <= totalSupply());

        return cryptoMonToOwners[_tokenId];
    }

    function putOnMarket(uint8 _tokenId, uint _price) external {
        require(msg.sender == ownerOf(_tokenId));

        // Put on the market the CryptoMon (available for sell at price)
        cryptoMonOffMarket[_tokenId] = false;
        cryptoMonPrice[_tokenId] = _price;

        OnMarket(msg.sender, _tokenId, _price);
    }

    function takeOffMarket(uint8 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId));

        // Put on the market the CryptoMon
        cryptoMonOffMarket[_tokenId] = true;
        cryptoMonPrice[_tokenId] = 0;

        OffMarket(msg.sender, _tokenId);
    }

    function isOnMarket(uint8 _tokenId) external view returns(bool onMarket) {
        require(_tokenId <= totalSupply());
        return !cryptoMonOffMarket[_tokenId];
    }

    function getPrice(uint8 _tokenId) external view returns(uint price) {
        require(_tokenId <= totalSupply());
        return cryptoMonPrice[_tokenId];
    }

    function transfer(uint8 _tokenId) payable external {
        require(_tokenId <= totalSupply());
        require(!cryptoMonOffMarket[_tokenId]);

        // Make sure CryptoMon is taken off the market
        cryptoMonOffMarket[_tokenId] = true;

        address oldOwner = ownerOf(_tokenId);
        address newOwner = msg.sender;

        require(newOwner != address(0));
        require(newOwner != oldOwner);

        // Check CryptoMon price is equal to message value
        require(msg.value == cryptoMonPrice[_tokenId]);

        // Transfer the CryptoMon to the buyer
        cryptoMonToOwners[_tokenId] = newOwner;
        cryptoMonCount[oldOwner] -= 1;
        cryptoMonCount[newOwner] += 1;

        // Reset CryptoMon price
        cryptoMonPrice[_tokenId] = 0;

        // Transfer the money to the old owner
        pendingWithdrawals[oldOwner] += msg.value;
        Transfer(oldOwner, newOwner, _tokenId);
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;

        msg.sender.transfer(amount);
        Withdraw(msg.sender);
    }

    function getBalanceToWithdraw() external view returns(uint balance) {
        return pendingWithdrawals[msg.sender];
    }

    function getMyCryptoMons() external view returns(uint8[]) {
        address me = msg.sender;
        uint8 currentCryptoMonCount = 0;
        uint8[] memory cryptoMons = new uint8[](balanceOf(me));

        for(uint8 i = 1; i <= totalSupply(); i++) {
            if (cryptoMonToOwners[i] == me) {
                cryptoMons[currentCryptoMonCount] = i;
                currentCryptoMonCount++;
            }
        }

        return cryptoMons;
    }
}
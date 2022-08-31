
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// The Marketplace contract is used to store and manage the marketplace.
/* 
    * Data structure:
    
*/


contract Marketplace {
    // create a marketplace contract with listing, offer, buy
    // listing: listing id, listing price, listing owner, listing status, listing description, listing category, listing tags, listing image, listing location, listing time
    // offer: offer id, offer price, offer owner, offer status, offer description, offer category, offer tags, offer image, offer location, offer time
    
    //base variables
    address public owner;
    uint public listingCount;
    uint public offerCount;

    enum ListingStatus {
        PENDING,
        ACTIVE,
        SOLD,
        EXPIRED
    }

        //listing variables
    struct Listing {
        uint tokenId;
        address tokenAddress;
        uint price;
        address owner;
        ListingStatus status;
        uint startTime;
        uint endTime;
        
    }

    //offer variables
    struct Offer {
        uint tokenId;
        address tokenAddress;
        uint offerPrice;
        address owner;
        address offerSender;
        ListingStatus status;
        uint startTime;
        uint endTime;

    }

    //listing map on storage
    
    mapping(address => Listing)  public  listings;
    //offer map
    mapping(address => Offer) public offers;


    constructor() {
        owner = msg.sender;
        listingCount = 0;
    }


    //workflow -
    //1. create a signed request to backend about listing a particular item
    //2. backend will verify the owner of the item and the price of the item
    //3. backend will create a listing and return the listing id

    //create a listing
    function createListing(uint tokenId, address tokenAddress, uint price, uint startTime, uint endTime) public returns (Listing memory listing) {
        if(msg.sender != owner) {
            //return error
            revert("Only the marketplace owner can create a listing");
        }

        //check if the listing already exists
        if(listings[msg.sender].tokenId == tokenId && listings[msg.sender].tokenAddress == tokenAddress) {
            //return error
            revert("Listing already exists");
        }

        listing = Listing({
            tokenId: tokenId,
            tokenAddress: tokenAddress,
            price: price,
            owner: msg.sender,
            status: ListingStatus.ACTIVE,
            startTime: startTime,
            endTime: endTime
        });
        listings[tokenAddress] = listing;
        listingCount++;

        return listing;
    }

    //create an offer
    function createOffer(uint tokenId, address tokenAddress, uint offerPrice, uint startTime, uint endTime) public returns(Offer memory offer) {
        if(msg.sender != owner) {
            //return error
            revert("Only the marketplace owner can create a offer");
        }
        offer = Offer({
            tokenId: tokenId,
            tokenAddress: tokenAddress,
            offerPrice: offerPrice,
            owner: msg.sender,
            offerSender: msg.sender,
            status: ListingStatus.ACTIVE,
            startTime: startTime,
            endTime: endTime
        });
        offers[tokenAddress] = offer;
        offerCount++;

        return offer;
    }

    //get active listing by contractAddress and tokenId
    function getActiveListing(address contractAddress, uint tokenId) public view returns (Listing memory listing) {
        listing = listings[contractAddress];
        if (listing.tokenId == tokenId && listing.tokenAddress == contractAddress  && listing.status == ListingStatus.ACTIVE) {
            return listing;
        } else {

            //return error
            revert("No active listing found");
        

        }
        
    }
    //get active offers by contractAddress and tokenId
    function getActiveOffer(address contractAddress, uint tokenId) public view returns (Offer memory offer) {
        offer = offers[contractAddress];
        if (offer.tokenId == tokenId && offer.tokenAddress == contractAddress  && offer.status == ListingStatus.ACTIVE) {
            return offer;
        } else {
            // error, no offer found
            revert("No active listing found");


        }
        
    }

    //get listing by contractAddress and tokenId
    function getListing(address contractAddress, uint tokenId) public view returns (Listing memory listing) {
        listing = listings[contractAddress];
        if (listing.tokenId == tokenId && listing.tokenAddress == contractAddress) {
            return listing;
        } else {
            // error, no listing found
            revert("No listing found");
        }
    }

    //get offer by contractAddress and tokenId
    function getOffer(address contractAddress, uint tokenId) public view returns (Offer memory offer) {
        offer = offers[contractAddress];
        if (offer.tokenId == tokenId && offer.tokenAddress == contractAddress) {
            return offer;
        } else {
            // error, no offer found
            revert("No offer found");
        }
    }

    // UPDATE listing STATUS    
    function updateListingStatus(address contractAddress, uint tokenId, string memory status) public returns(Listing memory listing) {
        if(msg.sender != owner) {
            //return error
            revert("Only the marketplace owner can update a listing");
        }
        listing = listings[contractAddress];
        if (listing.tokenId == tokenId && listing.tokenAddress == contractAddress) {
            if(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked("sold"))){
                listing.status = ListingStatus.SOLD;
            } else if(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked("expired"))){
                listing.status = ListingStatus.EXPIRED;
            }
            else if(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked("active"))){
                listing.status = ListingStatus.ACTIVE;
            }
            else if(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked("pending"))){
                listing.status = ListingStatus.PENDING;
            }
            else {
                //return error
                revert("Invalid status");
            } 
            
            
           
            listings[contractAddress] = listing;

            return listing;
        } else {
            // error, no listing found
            revert("No listing found");
        }
    }

    // UPDATE offer STATUS
    function updateOfferStatus(address contractAddress, uint tokenId, ListingStatus status) public returns (Offer memory offer) {
        if(msg.sender != owner) {
            //return error
            revert("Only the marketplace owner can update a offer");
        }
        offer = offers[contractAddress];
      
        if (offer.tokenId == tokenId && offer.tokenAddress == contractAddress) {
            offer.status = status;
            offers[contractAddress] = offer;
            return offer;
        } else {
            // error, no offer found
            revert("No offer found");
        }
    }

    // get active offer by offer sender
    function getActiveOfferBySender(address offerSender, address contractAddress, uint256 tokenId) public view returns (Offer memory offer) {
        // get active offer by contractAddress, offer sender, tokenId
        offer = offers[contractAddress];
        if (offer.tokenId == tokenId && offer.tokenAddress == contractAddress && offer.offerSender == offerSender && offer.status == ListingStatus.ACTIVE) {
            return offer;
        } else {
            // error, no offer found
            revert("No offer found");
        }

    }

    // get active offer by token owner
    function getActiveOfferByOwner(address tokenOwner, address contractAddress, uint256 tokenId) public view returns (Offer memory offer) {
        // get active offer by contractAddress, offer owner, tokenId
        offer = offers[contractAddress];
        if (offer.tokenId == tokenId && offer.tokenAddress == contractAddress && offer.owner == tokenOwner && offer.status == ListingStatus.ACTIVE) {
            return offer;
        } else {
            // error, no offer found
            revert("No offer found");
        }

    }

    //official receive function
    receive() external payable {

    }

    // send ether to a wallet
    function sendToWallet(address to, uint _amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(to).transfer(_amount);

    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
    

    
}
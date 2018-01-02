const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index        = index;
    this.timestamp    = timestamp;
    this.data         = data;
    this.previousHash = previousHash;
    this.hash         = this.calculateHash();
    this.nonce        = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block Mined " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, "12/26/2017", "Genesis block", "randomData");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock  = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let dmitryBlockchain = new Blockchain();
console.log("Minning Block 1.....");
dmitryBlockchain.addBlock(new Block(1, "12/27/2017", {coinAmount : 3.50}));
console.log("Minning Block 2.....");
dmitryBlockchain.addBlock(new Block(2, "12/28/2017", {coinAmount : 1.50}));

// console.log("isChainValid = " + dmitryBlockchain.isChainValid());

// Tamper with Blockchain
// dmitryBlockchain.chain[1].data = { coinAmount : 100 };
// console.log(JSON.stringify(dmitryBlockchain, null, 4));
// console.log("isChainValid = " +  dmitryBlockchain.isChainValid());

module.exports = {Block, Blockchain};

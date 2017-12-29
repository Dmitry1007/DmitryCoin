const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index        = index;
    this.timestamp    = timestamp;
    this.data         = data;
    this.previousHash = previousHash;
    this.hash         = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.date)).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "12/26/2017", "Genesis block", "randomData");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let dmitryBlockchain = new Blockchain()
dmitryBlockchain.addBlock(new Block(1, "12/27/2017", {coinAmount : 3.50}))
dmitryBlockchain.addBlock(new Block(2, "12/28/2017", {coinAmount : 1.50}))

console.log(JSON.stringify(dmitryBlockchain, null, 4))

module.exports = Block
module.exports = Blockchain

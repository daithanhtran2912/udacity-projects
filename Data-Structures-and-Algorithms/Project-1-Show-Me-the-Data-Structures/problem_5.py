import hashlib
import random
import string
from datetime import datetime

class Block:

    def __init__(self, timestamp, data, previous_hash):
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calc_hash()
        self.next = None

    def calc_hash(self):
        sha = hashlib.sha256()
        hash_str = (str(self.timestamp) + str(self.data) + str(self.previous_hash)).encode('utf-8')
        sha.update(hash_str)
        return sha.hexdigest()

class BlockChain:

    def __init__(self):
        self.head = None

    def append_block(self, data):
        if not self.head:
            self.head = self.__create_new_block__(data, 0)
        
        new_block = self.__create_new_block__(data, self.head.hash)
        new_block.next = self.head
        self.head = new_block

    def __create_new_block__(self, data, hash_value):
        return Block(datetime.now(), data, hash_value)

## Add your own test cases: include at least three test cases
## and two of them must include edge cases, such as null, empty or very large values

if __name__ == "__main__":
    def print_block(block_chain):
        current_block = block_chain.head
        while current_block:
            print("====================")
            print(f"Timestamp: {current_block.timestamp}")
            print(f"Data: {current_block.data}")
            print(f"Hash: {current_block.hash}")
            print(f"Previous Hash: {current_block.previous_hash}")
            current_block = current_block.next
        print()

    ## Test Case 1
    print("Test case 1")
    block_chain = BlockChain()
    for i in range(0, 5):
        block = "Block " + str(random.randint(1, 100))
        print(f"{block}")
        block_chain.append_block(block)
    print_block(block_chain)

    ## Test Case 2
    print("Test case 2")
    block_chain = BlockChain()
    for i in range(0, 5):
        block = ''.join(random.choices(string.ascii_letters + string.digits, k=50000))
        block_chain.append_block(block)
    print_block(block_chain)

    ## Test Case 3
    print("Test case 3")
    block_chain = BlockChain()
    choices = ['', None]
    for i in range(0, 5):
        block = random.choice(choices)
        print(f"{block}")
        block_chain.append_block(block)
    print_block(block_chain)
from collections import OrderedDict

class LRU_Cache(object):

    def __init__(self, capacity = 5):
        # Initialize class variables
        if capacity < 1:
            print("Invalid cache capacity!")
            return
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        # Retrieve item from provided key. Return -1 if nonexistent. 
        if key in self.cache:
            self.cache.move_to_end(key) # We make use of the move_to_end() function of OrderedDict() to represent the recently cache hit
            return self.cache[key]
        return -1

    def set(self, key, value):
        # Set the value if the key is not present in the cache. If the cache is at capacity remove the oldest item. 
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        # Capacity check
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False) # Remove the first item - the least recently hit

## Test Case 1
print("Test case 1:")
our_cache = LRU_Cache(5)

print("> Set cache 1 - 1")
our_cache.set(1, 1);
print("> Set cache 2 - 2")
our_cache.set(2, 2);
print("> Set cache 3 - 3")
our_cache.set(3, 3);
print("> Set cache 4 - 4")
our_cache.set(4, 4);


print(f"< Get cache 1: {our_cache.get(1)}")     # returns 1
print(f"< Get cache 2: {our_cache.get(2)}")     # returns 2
print(f"< Get cache 9: {our_cache.get(9)}")     # returns -1 because 9 is not present in the cache

print("> Set cache 5 - 5")
our_cache.set(5, 5) 
print("> Set cache 6 - 6")
our_cache.set(6, 6)

print(f"< Get cache 3: {our_cache.get(3)}")      # returns -1 because the cache reached it's capacity and 3 was the least recently used entry

## Test Case 2
print("\nTest case 2:")
our_cache = LRU_Cache(1000000)      # Large capacity cache
print("> Set cache from 1 to 1000000...")
for i in range(1000000):
    our_cache.set(i, i)

print(f"< Get cache 999999: {our_cache.get(999999)}")           # Return 999999
print(f"< Get cache 0: {our_cache.get(0)}")                     # Return 0
print(f"< Get cache 1000000: {our_cache.get(1000000)}")         # Return -1 because 1000000 is not present in the cache

## Test Case 3
print("\nTest case 3:")

our_cache = LRU_Cache(0)                            # Print 'Invalid cache capacity!' message

# Create new cache
print("Create new cache with capacity = 5")
our_cache = LRU_Cache(5)

print(f"< Get cache 1: {our_cache.get(1)}")                 # Return -1 because cache is empty
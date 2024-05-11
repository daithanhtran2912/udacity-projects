class Node:
    def __init__(self, character, frequency):
        self.character = character  # Character stored in the node
        self.frequency = frequency  # Frequency of the character
        self.left_child = None
        self.right_child = None

    # Define comparison methods for heapq
    def __lt__(self, other):
        return self.frequency < other.frequency

    def __eq__(self, other):
        return self.frequency == other.frequency

import heapq
import sys
from collections import Counter

def build_huffman_tree(message):
    """
    Build a Huffman Tree using a min-heap.

    Args:
    message: A string message to be encoded

    Returns:
    The root node of the Huffman Tree.
    """
    # Calculate character frequencies from input message
    char_freq_dict = dict(Counter(message))
    min_heap = []

    # 1. Create node for each character and its frequency, then push it into the min-heap
    for char, freq in char_freq_dict.items():
        heapq.heappush(min_heap, Node(char, freq))

    while len(min_heap) > 1:
        # 3. Pop-out two nodes with the minimum frequency from the min-heap
        left_child = heapq.heappop(min_heap)
        right_child = heapq.heappop(min_heap)

        # 4. Create a new node with a frequency equal to the sum of the two nodes above
        new_freq = left_child.frequency + right_child.frequency
        new_node = Node(None, new_freq)
        new_node.left_child = left_child        # Lower frequency
        new_node.right_child = right_child      # Higher frequency

        # Push the new node back into the min-heap
        heapq.heappush(min_heap, new_node)
    return min_heap[0]

# Test create Huffman Tree
msg = 'AABC'
root_1 = build_huffman_tree(msg)
# Should be 
#                   (None) 4
#                 /0          \1
#              (A) 2        (None) 2
#                         /0          \1
#                     (B) 1           (C) 1

def generate_codes(root):
    codes = {}

    def traverse(node, code):
        if node is None:
            return

        # If the node is a leaf node, record its character and code
        if node.character is not None:
            codes[node.character] = code
            return

        # Recursively traverse the left and right children
        traverse(node.left_child, code + '0')
        traverse(node.right_child, code + '1')

    # Start the traversal from the root with an empty code
    traverse(root, '')
    return codes

def encode(msg, codes):
    encoded_data = ''
    for char in msg:
        encoded_data += codes[char]
    return encoded_data

def decode(encoded_data, root):
    if not encoded_data or root is None:
        return ''
    
    decoded_data = ''
    node = root
    for bit in encoded_data:
        if bit == '0':
            node = node.left_child
        else:
            node = node.right_child
        if node.character:
            decoded_data += node.character
            node = root
    return decoded_data

# Simple test
empty_message = 'AAAAAAABBBCCCCCCCDDEEEEEE'

# Generate Huffman tree and codes
root = build_huffman_tree(empty_message)
codes = generate_codes(root)

# Generate encoded data
encoded_data = encode(empty_message, codes)

print("Encoded data:", encoded_data)
decoded_data = decode(encoded_data, root)
print("Decoded data:", decoded_data)


def huffman_encoding(data):
    if data is None or len(data) == 0:
        return '', None
    root = build_huffman_tree(data)
    codes = generate_codes(root)
    encoded_data = encode(data, codes)
    return encoded_data, root

def huffman_decoding(data, tree):
    return decode(data, tree)

if __name__ == "__main__":
    a_great_sentence = "The bird is the word"

    print("\n__main__")
    print("The size of the data is: {}\n".format(sys.getsizeof(a_great_sentence)))
    print("The content of the data is: {}\n".format(a_great_sentence))

    encoded_data, tree = huffman_encoding(a_great_sentence)

    print("The size of the encoded data is: {}\n".format(sys.getsizeof(int(encoded_data, base=2))))
    print("The content of the encoded data is: {}\n".format(encoded_data))

    decoded_data = huffman_decoding(encoded_data, tree)

    print("The size of the decoded data is: {}\n".format(sys.getsizeof(decoded_data)))
    print("The content of the decoded data is: {}\n".format(decoded_data))

## Add your own test cases: include at least three test cases
## and two of them must include edge cases, such as null, empty or very large values

## Test Case 1 - Empty message
    empty_message = ''
    print("\n============================================================Test case 1============================================================")
    print("The size of the data is: {}\n".format(sys.getsizeof(empty_message)))
    print("The content of the data is: {}\n".format(empty_message))

    encoded_data, tree = huffman_encoding(empty_message)

    if not encoded_data and tree is None:
        print("The content of the encoded data is: {}\n".format(encoded_data))

        decoded_data = huffman_decoding(encoded_data, tree)

        print("The content of the decoded data is: {}\n".format(decoded_data))  
    else:
        print("The size of the encoded data is: {}\n".format(sys.getsizeof(int(encoded_data, base=2))))
        print("The content of the encoded data is: {}\n".format(encoded_data))

        decoded_data = huffman_decoding(encoded_data, tree)

        print("The size of the decoded data is: {}\n".format(sys.getsizeof(decoded_data)))
        print("The content of the decoded data is: {}\n".format(decoded_data))

## Test Case 2 - None case
    none_message = None
    print("\n============================================================Test case 2============================================================")
    print("The size of the data is: {}\n".format(sys.getsizeof(none_message)))
    print("The content of the data is: {}\n".format(none_message))

    encoded_data, tree = huffman_encoding(empty_message)

    if not encoded_data and tree is None:
        print("The content of the encoded data is: {}\n".format(encoded_data))

        decoded_data = huffman_decoding(encoded_data, tree)

        print("The content of the encoded data is: {}\n".format(decoded_data))  
    else:
        print("The size of the encoded data is: {}\n".format(sys.getsizeof(int(encoded_data, base=2))))
        print("The content of the encoded data is: {}\n".format(encoded_data))

        decoded_data = huffman_decoding(encoded_data, tree)

        print("The size of the decoded data is: {}\n".format(sys.getsizeof(decoded_data)))
        print("The content of the decoded data is: {}\n".format(decoded_data))

## Test Case 3 - Long message
    import random
    import string
    long_message = ''.join(random.choices(string.ascii_uppercase, k=200)) # Generate a random string message with 200 uppercase characters

    print("\n============================================================Test case 3============================================================")
    print("The size of the data is: {}\n".format(sys.getsizeof(long_message)))
    print("The content of the data is: {}\n".format(long_message))
    print("The character frequency of the data is: {}\n".format(dict(Counter(long_message))))

    encoded_data, tree = huffman_encoding(long_message)

    print("The size of the encoded data is: {}\n".format(sys.getsizeof(int(encoded_data, base=2))))
    print("The content of the encoded data is: {}\n".format(encoded_data))

    decoded_data = huffman_decoding(encoded_data, tree)

    print("The size of the decoded data is: {}\n".format(sys.getsizeof(decoded_data)))
    print("The content of the decoded data is: {}\n".format(decoded_data))
    print("The character frequency of the decoded data is: {}\n".format(dict(Counter(decoded_data))))
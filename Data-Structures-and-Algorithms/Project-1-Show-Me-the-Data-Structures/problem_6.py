class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def __repr__(self):
        return str(self.value)


class LinkedList:
    def __init__(self):
        self.head = None

    def __str__(self):
        cur_head = self.head
        out_string = ""
        while cur_head:
            out_string += str(cur_head.value) + " -> "
            cur_head = cur_head.next
        return out_string

    def append(self, value):
        if self.head is None:
            self.head = Node(value)
            return

        node = self.head
        while node.next:
            node = node.next

        node.next = Node(value)

    def size(self):
        size = 0
        node = self.head
        while node:
            size += 1
            node = node.next

        return size

def union(llist_1, llist_2):
    element_set = set()
    # Traverse 2 linked lists and add elements to the set
    current_node = llist_1.head
    while current_node:
        element_set.add(current_node.value)
        current_node = current_node.next
    
    current_node = llist_2.head
    while current_node:
        element_set.add(current_node.value)
        current_node = current_node.next
    
    # Create new linked list to storing unique elements from the set above
    result = LinkedList()
    for element in element_set:
        result.append(element)
    
    return result

def intersection(llist_1, llist_2):
    element_set_1 = set()
    current_node = llist_1.head
    while current_node:
        element_set_1.add(current_node.value)
        current_node = current_node.next
    
    element_set_2 = set()
    current_node = llist_2.head
    while current_node:
        element_set_2.add(current_node.value)
        current_node = current_node.next
    
    intersection_set = element_set_1.intersection(element_set_2)
    result = LinkedList()
    for element in intersection_set:
        result.append(element)
    return result


## Test case 1
print("====================Test case 1====================")
linked_list_1 = LinkedList()
linked_list_2 = LinkedList()

element_1 = [3, 2, 4, 35, 6, 65, 6, 4, 3, 21]
element_2 = [6, 32, 4, 9, 6, 1, 11, 21, 1]
print("Element 1: {}".format(element_1))
print("Element 2: {}".format(element_2))

for i in element_1:
    linked_list_1.append(i)

for i in element_2:
    linked_list_2.append(i)

print()
print("Union: \n{}".format(union(linked_list_1,linked_list_2)))
print("Intersection: \n{}".format(intersection(linked_list_1,linked_list_2)))
print()

## Test case 2
print("====================Test case 2====================")
linked_list_1 = LinkedList()
linked_list_2 = LinkedList()

element_1 = [3, 2, 4, 35, 6, 65, 6, 4, 3, 23]
element_2 = [1, 7, 8, 9, 11, 21, 1]
print("Element 1: {}".format(element_1))
print("Element 2: {}".format(element_2))

for i in element_1:
    linked_list_1.append(i)

for i in element_2:
    linked_list_2.append(i)

print()
print("Union: \n{}".format(union(linked_list_1,linked_list_2)))
print("Intersection: \n{}".format(intersection(linked_list_1,linked_list_2)))
print()

## Test Case 3
print("====================Test case 3====================")
linked_list_1 = LinkedList()
linked_list_2 = LinkedList()

element_1 = []
element_2 = []
print("Element 1: {}".format(element_1))
print("Element 2: {}".format(element_2))

for i in element_1:
    linked_list_1.append(i)

for i in element_2:
    linked_list_2.append(i)

print()
print("Union: \n{}".format(union(linked_list_1,linked_list_2)))
print("Intersection: \n{}".format(intersection(linked_list_1,linked_list_2)))
print()
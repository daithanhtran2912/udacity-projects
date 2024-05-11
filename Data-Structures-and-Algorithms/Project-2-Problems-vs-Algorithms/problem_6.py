def get_min_max(ints):
    """
    Return a tuple(min, max) out of list of unsorted integers.
    
    Args:
        ints(list): list of integers containing one or more integers
    """
    if not ints or len(ints) == 0:
        return None
    # Create min and max value start from the beginning
    min_value = ints[0]
    max_value = ints[0]

    for number in ints:
        if number < min_value:
            min_value = number
        elif number > max_value:
            max_value = number
    return (min_value, max_value)

### Example Test Case of Ten Integers
import random

l = [i for i in range(0, 10)]  # a list containing 0 - 9
random.shuffle(l)

print("Pass" if ((0, 9) == get_min_max(l)) else "Fail")
print("Pass" if ((None) == get_min_max([])) else "Fail")
print("Pass" if ((6, 6) == get_min_max([6])) else "Fail")
print("Pass" if ((0, 0) == get_min_max([0, 0, 0, 0, 0])) else "Fail")
print("Pass" if ((-9, -1) == get_min_max([-1, -9, -2, -4, -5])) else "Fail")
print("Pass" if ((-10, 20) == get_min_max([-10, 0, 20, -5, 15, -3])) else "Fail")

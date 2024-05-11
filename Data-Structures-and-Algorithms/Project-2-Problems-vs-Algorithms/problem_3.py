def rearrange_digits(input_list):
    """
    Rearrange Array Elements so as to form two number such that their sum is maximum.

    Args:
        input_list(list): Input List
    Returns:
        (int),(int): Two maximum sums
    """
    if len(input_list) == 0:
        return [0, 0]
    
    # Create a list to store frequency of each digit
    digit_frequency = [0 for _ in range(10)]
    # Count the frequency of each digit
    for digit in input_list:
        digit_frequency[digit] += 1
    # print(input_list)
    # print(digit_frequency)

    first_num = 0
    second_num = 0
    is_odd = True
    # Iterate through digit from 9 to 0
    for digit in range(9, -1, -1):
        frequency = digit_frequency[digit]
        while frequency > 0:
            if is_odd:
                first_num = first_num * 10 + digit
            else:
                second_num = second_num * 10 + digit
            is_odd = not is_odd
            frequency -= 1
    return [first_num, second_num]

def test_function(test_case):
    output = rearrange_digits(test_case[0])
    solution = test_case[1]
    if sum(output) == sum(solution):
        print("Pass")
    else:
        print("Fail")

test_function([[], [0, 0]])
test_function([[6], [6, 0]])
test_function([[1, 2], [2, 1]])
test_function([[9, 9, 9, 9, 9], [999, 99]])
test_function([[1, 2, 3, 4, 5], [542, 31]])
test_function([[4, 6, 2, 5, 9, 8], [964, 852]])
test_function([[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [97531, 86420]])
import os

def find_files(suffix, path):
    """
    Find all files beneath path with file name suffix.

    Note that a path may contain further subdirectories
    and those subdirectories may also contain further subdirectories.

    There are no limit to the depth of the subdirectories can be.

    Args:
        suffix(str): suffix if the file name to be found
        path(str): path of the file system

    Returns:
        a list of paths
    """
    # Checking for valid directory
    if path is None or not os.path.isdir(path):
        return []
    
    files = []
    stack = [path]

    while stack:
        current_path = stack.pop()
        for item in os.listdir(current_path):
            item_path = os.path.join(current_path, item)
            if os.path.isdir(item_path):
                stack.append(item_path)
            elif item.endswith(suffix):
                files.append(item_path)
    return files

## Add your own test cases: include at least three test cases
## and two of them must include edge cases, such as null, empty or very large values

## Test Case 1 - Happy case
print("Test case 1")
print(find_files(".c", "./testdir"))                # Expected output: ['./testdir/t1.c', './testdir/subdir5/a.c', './testdir/subdir3/subsubdir1/b.c', './testdir/subdir1/a.c']

## Test Case 2 - Some random directory
print("\nTest case 2")
print(find_files(".c", "./some_random_directory"))  # Expected output: []

## Test Case 3 - None path
print("\nTest case 3")
print(find_files(".c", None))                       # Expected output: []
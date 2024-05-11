class Group(object):
    def __init__(self, _name):
        self.name = _name
        self.groups = []
        self.users = []

    def add_group(self, group):
        self.groups.append(group)

    def add_user(self, user):
        self.users.append(user)

    def get_groups(self):
        return self.groups

    def get_users(self):
        return self.users

    def get_name(self):
        return self.name

def is_user_in_group(user, group):
    """
    Return True if user is in the group, False otherwise.

    Args:
        user(str): user name/id
        group(class:Group): group to check user membership against
    """
    if group is None:
        return False

    if user in group.get_users():
        return True

    for sub_group in group.get_groups():
        if is_user_in_group(user, sub_group):
            return True
    return False

## Add your own test cases: include at least three test cases
## and two of them must include edge cases, such as null, empty or very large values

parent = Group("parent")
child = Group("child")
sub_child = Group("subchild")

sub_child_user = "sub_child_user"
sub_child.add_user(sub_child_user)

child.add_group(sub_child)
parent.add_group(child)
print("parent")
print("   |")
print("   child")
print("      |")
print("      subchild [sub_child_user]\n")

## Test Case 1
print("Test case 1")
print("User: {}".format(sub_child_user))
print("Group: {}".format(parent.get_name()))
print("Expected: True")
print("Actual: {}".format(is_user_in_group(sub_child_user, parent)))

## Test Case 2
user_not_in_group = "user_not_in_group"
print("\nTest case 2")
print("User: {}".format(user_not_in_group))
print("Group: {}".format(parent.get_name()))
print("Expected: False")
print("Actual: {}".format(is_user_in_group(user_not_in_group, parent)))

## Test Case 3
print("\nTest case 3")
print("User: {}".format(None))
print("Group: {}".format(parent.get_name()))
print("Expected: False")
print("Actual: {}".format(is_user_in_group(None, parent)))

## Test Case 4
new_sub_child_user = "new_sub_child_user"
sub_child.add_user(new_sub_child_user)

print("parent")
print("   |")
print("   child")
print("      |")
print("      subchild [sub_child_user, new_sub_child_user]\n")

print("Test case 4")
print("User: {}".format(new_sub_child_user))
print("Group: {}".format(sub_child.get_name()))
print("Expected: True")
print("Actual: {}".format(is_user_in_group(new_sub_child_user, sub_child)))

## Test Case 5
child_user = "child_user"
child.add_user(child_user)

print("parent")
print("   |")
print("   child [child_user]")
print("      |")
print("      subchild [sub_child_user, new_sub_child_user]\n")

print("Test case 5")
print("User: {}".format(child_user))
print("Group: {}".format(sub_child.get_name()))
print("Expected: False")
print("Actual: {}".format(is_user_in_group(child_user, sub_child)))
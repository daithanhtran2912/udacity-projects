"""
Read file into texts and calls.
It's ok if you don't understand how to read files.
"""
import csv
with open('texts.csv', 'r') as f:
    reader = csv.reader(f)
    texts = list(reader)

with open('calls.csv', 'r') as f:
    reader = csv.reader(f)
    calls = list(reader)


"""
TASK 1:
How many different telephone numbers are there in the records? 
Print a message:
"There are <count> different telephone numbers in the records."
"""
phones = set()
for text in texts:
    phones.add(text[0]) # sender number
    phones.add(text[1]) # receiver number
for call in calls:
    phones.add(call[0]) # caller number
    phones.add(call[1]) # receiver number
print(f"There are {phones.__len__()} different telephone numbers in the records.")
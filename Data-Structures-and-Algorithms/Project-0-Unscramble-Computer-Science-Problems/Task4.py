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
TASK 4:
The telephone company want to identify numbers that might be doing
telephone marketing. Create a set of possible telemarketers:
these are numbers that make outgoing calls but never send texts,
receive texts or receive incoming calls.

Print a message:
"These numbers could be telemarketers: "
<list of numbers>
The list of numbers should be print out one per line in lexicographic order with no duplicates.
"""
telemarketers = set()
for call in calls:
    callingNumber = call[0]
    telemarketers.add(callingNumber)

for call in calls:
    receivingNumber = call[1]
    if receivingNumber in telemarketers:
        telemarketers.remove(receivingNumber)

for text in texts:
    textingNumber = text[0]
    receivingNumber = text[1]
    if textingNumber in telemarketers:
        telemarketers.remove(textingNumber)
    if receivingNumber in telemarketers:
        telemarketers.remove(receivingNumber)

print("These numbers could be telemarketers: ")
for number in sorted(telemarketers):
    print(number)
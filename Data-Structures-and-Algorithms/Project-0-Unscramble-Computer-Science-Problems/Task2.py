"""
Read file into texts and calls.
It's ok if you don't understand how to read files
"""
import csv
with open('texts.csv', 'r') as f:
    reader = csv.reader(f)
    texts = list(reader)

with open('calls.csv', 'r') as f:
    reader = csv.reader(f)
    calls = list(reader)

"""
TASK 2: Which telephone number spent the longest time on the phone
during the period? Don't forget that time spent answering a call is
also time spent on the phone.
Print a message:
"<telephone number> spent the longest time, <total time> seconds, on the phone during 
September 2016.".
"""
phoneCallDurations = {}
for call in calls:
    callDate = call[2].split(" ")[0]
    _day, month, year = callDate.split("-")
    callingNumber = call[0]
    receivingNumber = call[1]
    if month == "09" and year == "2016":
        duration = int(call[3])
        if callingNumber not in phoneCallDurations:
            phoneCallDurations[callingNumber] = duration
        else:
            phoneCallDurations[callingNumber] += duration
        
        if receivingNumber not in phoneCallDurations:
            phoneCallDurations[receivingNumber] = duration
        else:
            phoneCallDurations[receivingNumber] += duration
longestPhoneCall = max(phoneCallDurations, key=phoneCallDurations.get)
print(f"{longestPhoneCall} spent the longest time, {phoneCallDurations[longestPhoneCall]} seconds, on the phone during September 2016.")
# Python reading files ( .txt, .json, .csv)



'''

file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.txt"

try:
    with open(file_path, "r") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("that file was not found")
except PermissionError:
    print("You do not have the permission to read this file")


'''


'''

import json

file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.json"

try:

    with open(file_path, "r") as file:
        content = json.load(file)
        print(content["age"])

except FileNotFoundError:
    print("that file was not found")
except PermissionError:
    print("You do not have the permission to read this file")


'''


import csv

file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.csv"

try:
    with open(file_path, "r") as file:
        content = csv.reader(file)
        for line in content:
            print(line)
except FileNotFoundError:
    print("that file was not found")
except PermissionError:
    print("You do not have the permission to read this file")
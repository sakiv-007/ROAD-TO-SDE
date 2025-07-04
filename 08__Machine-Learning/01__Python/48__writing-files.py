# Python writing files (.txt, .json, .csv)


'''

txt_data = "I like burger!"

# file_path = "output.txt"
file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.txt"
try:

    with open(file_path, "x") as file:   # the "with" keyword automatically does the closing of the file and "w" refers to writing the file
        #     mode "x" gives an FileExistsError: if file is already there but if file is not there then it will create the file and work in tha same way as of the "w"
        #      mode "a" is append a new data to the file every time the code is executed and again if we will do in "w" mode then it will reset the file and keep the original data only

        file.write("\n" + txt_data)
        print(f"txt file '{file_path}' was created")

except FileExistsError:
    print("This file already exists")

'''



'''

employees = ["vikas", "sonte", "chirag", "karan"]

# file_path = "output.txt"
file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.txt"
try:

    with open(file_path, "w") as file: 
        for employee in employees:
            file.write(employee + " ")
        print(f"txt file '{file_path}' was created")

except FileExistsError:
    print("This file already exists")

'''


'''


import json

employee = {
    "name" : "vikas",
    "age"  : 22,
    "job"  : "SDE"
}

# file_path = "output.txt"
file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.json"
try:

    with open(file_path, "w") as file: 
        json.dump(employee, file, indent=4)   # the indent shows it more like a dictionary or it will show into single line
        print(f"json file '{file_path}' was created")

except FileExistsError:
    print("This file already exists")


'''



# csv (comma separated values)

import json
import csv

employees = [["Name", "Age", "Job"],
             ["vikas", 22, "SDE"],
             ["sonta", 20, "Rapper"],
             ["chirag", 21, "Farmer"]]

# file_path = "output.txt"
file_path = "C:/Users/Ntltr/OneDrive/Desktop/output.csv"
try:

    with open(file_path, "w", newline="") as file: 

        writer = csv.writer(file)  
        for row in employees:
            writer.writerow(row)
        print(f"csv file '{file_path}' was created")

except FileExistsError:
    print("This file already exists")
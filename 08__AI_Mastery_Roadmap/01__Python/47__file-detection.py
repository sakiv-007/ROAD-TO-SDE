# Python file detection

import os

# file_path = "python__project/latex-resume.txt"  # relative file path
file_path = "C:\\Users\\Ntltr\\OneDrive\\Desktop\\test.txt"   # Absolute file path

if os.path.exists(file_path):
    print(f"The location '{file_path}' exists")

    if os.path.isfile(file_path):
        print("That is a file")
    elif os.path.isdir(file_path):
        print("that is a folder/directory")

else:
    print("That location doesn't exist")
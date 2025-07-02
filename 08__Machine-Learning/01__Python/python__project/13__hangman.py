 # Hangman program in python

import random

words = ("apple", "orange", "banana", "pineapple", "coconut")

hangman_art = {
    0: ("   ",
        "   ",
        "   "),
    1: (" o ",
        "   ",
        "   "),
    2: (" o ",
        " | ",
        "   "),
    3: (" o ",
        "/|  ",
        "   "),
    4: (" o ",
        "/|\\",
        "   "),
    5: (" o ",
        "/|\\",
        "/  "),
    6: (" o ",
        "/|\\",
        "/ \\ "),
   
    
}

for line in hangman_art[6]:
    print(line)
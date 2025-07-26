# Mini Task:

# Write a script that:

# Takes a sentence from the user

# Cleans it (removes punctuation, lowercases it)

# Returns a word frequency dictionary

'''

sentence = input("Enter a sentence: ").lower()

punctuations = ["!", "@", "#", "$", "?", ",", ":", "."]

for p in punctuations:
    sentence = sentence.replace(p, "")

words = sentence.split()

freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1

print(freq)



'''

# one liner using collections.Counter

from collections import Counter
import string

sentence = input("Enter a Sentence: ").lower()
for p in string.punctuation:
    sentence = sentence.replace(p, "")
print(dict(Counter(sentence.split())))


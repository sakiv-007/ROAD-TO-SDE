# dictionary =  a dictionary of {key:value} pairs 
#   ordered and changeable. No duplicates

capitals = {"USA": "WAshington DC",
            "India": "New Delhi",
            "China": "Beijing",
             "Russia" : "Moscow" }

# print(dir(capitals))
# print(help(capitals))

print(capitals.get("USA"))
print(capitals)


# to check if a particular key exist in the list or not

# if capitals.get("Russia"):
#     print("That capital Exists")
# else:
#     print("that capital does not exist")


capitals.update({"Germany" : "Berlin"})
capitals.update({"USA" : "Detroit"})
# capitals.pop("China")  # removes china from list
# capitals.popitem()  # removes the latest item

# capitals.clear()

keys = capitals.keys()  # to get only the keys in the dictionary not the values

# print(keys)

values = capitals.values()
# print(values)


# for key in capitals.keys():
    # print(key)
 
# print(capitals)


# items = capitals.items()
# print(items)

for key, value in capitals.items():
    print(f"{key} : {value}")
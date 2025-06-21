# nested loops - outer and inner

# for x in range(1, 10):
#     print(x, end=" ")

rows = int(input("Enter the # of rows: "))
cols = int(input("Enter the 3 of columns: "))
symbol = input("Enter the Symbol to use: ")


for x in range(rows):

    for y in range(cols):
        print(symbol, end=" ")
    print()

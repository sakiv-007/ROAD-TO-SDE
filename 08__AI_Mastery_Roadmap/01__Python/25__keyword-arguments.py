# keyword arguments = an argument preceded by an identifier
#   helps with readability
#    order of arguments doesn't matter
#    1. positional 2. default 3. KEYWORD 4.arbirary


'''
def hello(greeting, title, first, last):
    print(f"{greeting} {title} {first} {last}")

hello("Hello", title="Mr.", last="kumar", first="vikas")

'''

def get_phone(country, area, first, last):
    return f"{country}-{area}-{first}-{last}"

phone_num = get_phone(country=91, area=123, first=789, last=4567)

print(phone_num)
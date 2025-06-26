# Python banking program

def show_balance(balance):
    print("------------------------------")
    print(f"Your Balance is ${balance:.2f}")
    print("------------------------------")

def deposit():
    print("------------------------------")
    amount = float(input(f"Enter the amount you want to deposit: $"))
    print("------------------------------")

    if amount < 0:
        print("------------------------------")
        print("Please enter a valid amount")
        print("------------------------------")
        return 0
    else:
        return amount
    
def withdraw(balance):
    print("------------------------------")
    amount = float(input("Enter amount to be withdrawn: $"))
    print("------------------------------")

    if amount > balance:
        print("------------------------------")
        print("Isufficient Funds")
        print("------------------------------")
        return 0
    elif amount < 0:
        print("------------------------------")
        print("Amount must be Greater than 0")
        print("------------------------------")
        return 0
    else:
        return amount
    
def main():

    balance = 0
    is_running = True

    while is_running:
        print("---------------------")
        print("Banking Program")
        print("---------------------")
        print("1. Show Balance")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Exit")

        print("---------------------")

        choice = input("Enter Your choice (1-4): ")

        if choice == '1':
            show_balance(balance)
        elif choice == '2':
            balance += deposit()
        elif choice == '3':
            balance -= withdraw(balance)
        elif choice == '4':
            is_running = False
        else:
            print("------------------------------")
            print("That is not a valid choice")
            print("------------------------------")

    print("------------------------------")
    print("Thank you! Have a nice day!")
    print("------------------------------")

if __name__ == '__main__':
    main()
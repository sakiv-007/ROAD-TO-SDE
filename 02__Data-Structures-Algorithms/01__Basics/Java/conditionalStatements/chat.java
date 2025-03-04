package conditionalStatements;

import java.util.Scanner;

public class chat {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Input four numbers
        System.out.print("Enter four numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        int d = sc.nextInt();

        int largest = a; // Assume the first number is the largest

        // Compare with second number
        if (b > largest) {
            largest = b;
        }

        // Compare with third number
        if (c > largest) {
            largest = c;
        }

        // Compare with fourth number
        if (d > largest) {
            largest = d;
        }

        // Print the largest number
        System.out.println("The largest number is: " + largest);

        sc.close();
    }
}

package conditionalStatements;

import java.util.Scanner;

public class chat2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Input four numbers
        System.out.print("Enter four numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        int d = sc.nextInt();

        int largest;

        // Compare using if-else statements
        if (a > b && a > c && a > d) {
            largest = a;
        } else if (b > c && b > d) {
            largest = b;
        } else if (c > d) {
            largest = c;
        } else {
            largest = d;
        }

        System.out.println("The largest number is: " + largest);

        sc.close();
    }
}

package basics2;
import java.util.Scanner;

public class userInputs
{
    public static void main(String[] args) {
Scanner sc= new Scanner (System.in);
        System.out.println("Enter your age");
        int age= sc.nextInt();
        System.out.println("your Age is: "+age);
        System.out.println("enter the first number");

        float firstNumber = sc.nextFloat();
        System.out.println("enter the seconnd number");
        long secondNumber = sc.nextLong();

        float result = firstNumber+secondNumber;
        System.out.println("sum of two mubers are " +result);
        sc.close();
    }
}

package loops;

import java.util.Scanner;

public class BreakAndContinue {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        /*for (int i = 0; i < 20; i+=2) {
            System.out.println(i);
            if (i>=10) break;
        }*/

        /*for (int i = 0; i < 20; i+=1) {
            if (i==2 || i==15) continue;
            if (i>=16) break;
            System.out.println("give toffee to "+i);

        }*/

        /*int i=0;
        while(i<=5){
            System.out.println(i);
            i++;
            if(i==3) break;
        }*/


        /*for (int count = 0; count < 10; count++) {
            for (int i = 0; i < 6; i++) {
                System.out.print(i+" ");
            }
            System.out.println("printed"+count);

        }*/

        /*for (int i = 0; i < 5; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print(j+" ");

            }
            System.out.println();

        }*/

        for (int i = 0; i < 18; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print("* ");

            }
            System.out.println();
        }
        for (int i = 0; i < 10; i++) {
            int j=0;
            while ( j <=5){
                j++;
                System.out.print(j+" ");
            }
            System.out.println();
        }
    }
}

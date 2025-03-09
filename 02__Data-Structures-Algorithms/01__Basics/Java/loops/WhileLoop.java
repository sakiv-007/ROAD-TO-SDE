package loops;

import java.util.Scanner;

public class WhileLoop {
    public static void main(String[] args) {
       /* Scanner sc = new Scanner(System.in);
        boolean hasLearnt = false;
         while(!hasLearnt){
            // System.out.println("i'm inside the loop");
             System.out.println("went to school, tried to learn");
             System.out.println("Have you understood?");
             hasLearnt = sc.nextBoolean();
         }
//        System.out.println("i'm Outside the Loop");
        System.out.println("Congratulations😂");*/

        int i=8;
        do{
            System.out.println(i);
            i++;
        }while (i<=5);
        System.out.println("out of the loop");
    }
}

//import java.util.*;
//public class vikas {
// //   import java.util.*;
//
//
//  //  public class Main {
//
//
//    public static void main(String []args) {
//            int n = 5;
//            int m = 4;
//            for(int i=0; i<n; i++) {
//                for(int j=0; j<m; j++) {
//                    if(i == 0 || i == n-1 || j == 0 || j == m-1) {
//                        System.out.print("*");
//                    } else {
//                        System.out.print(" ");
//                    }
//                }
//                System.out.println();


//  Enter 3 numbers from the user & make a function to print their average.
//        System.out.println("enter the three numbers");
//        Scanner sc = new Scanner(System.in);
//        int a= sc.nextInt();
//        int b= sc.nextInt();
//        int c= sc.nextInt();
//         int avg=(a+b+c)/3;
//        System.out.println("the average of the numbers is" + avg);




      //  q2.Write a function to print the sum of all odd numbers from 1 to n.

import java.util.*;


        public class vikas {
            public static void printSum(int n) {
                int sum = 0;


                for(int i=1; i<=n; i++) {
                    if(i % 2 != 0) {
                        sum = sum + i;
                    }
                }


                System.out.println(sum);
            }
            public static void main(String args[]) {
                Scanner sc = new Scanner(System.in);
                int n = sc.nextInt();
                printSum(n);


            }
        }




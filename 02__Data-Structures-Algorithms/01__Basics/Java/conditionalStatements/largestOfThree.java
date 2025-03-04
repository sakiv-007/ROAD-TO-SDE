package conditionalStatements;

public class largestOfThree {
    public static void main(String[] args) {
       /* int a=100;
        int b=20;
        int c=30;

        if(a>b){
            System.out.println("a is greater than b");
            if(a>c){
                System.out.println("a is greater than c also");
                System.out.println("a is the largest");
            }else{
                System.out.println("c is greater than a");
                System.out.println("c is the largest");
            }

        }else{
            System.out.println("b is larger than a");
            if(b>c){
                System.out.println("b is larger than c also");
                System.out.println("b is the largest");
            }else{
                System.out.println("c is greater than b");
                System.out.println("c is the largest");
            }
        }*/


        int a = 1000;
        int b = 2000;
      //  int c=3000;

        String var;
        int numb;

        if (a > b) {
            numb=a;
            var = "\"a\"";
        } else {
            numb=b;
            var = "\"b\"";
        }

        //using ternary operator it can be written as

     //   numb=a>b?a:b;      // ternary if else for two vars

      //  numb= a>b ? a>c ? a : c : b>c ? b : c ;        // ternary if else for three vars

        System.out.println("largest number is " + var + " that is "+numb);
      //  System.out.println("largest number is "+numb);
    }
}

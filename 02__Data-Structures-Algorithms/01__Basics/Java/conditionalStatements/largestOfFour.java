package conditionalStatements;

public class largestOfFour {
    public static void main(String[] args) {
        int a=1000;
        int b=2000;
        int c=3000;
        int d=4000;

        if(a>b){
            System.out.println("a is greater than b");
            if(a>c){
                System.out.println("a is greater than c also");
                if(a>d){
                    System.out.println("a is greater than d also");
                    System.out.println("a is the largest");
                }else{
                    System.out.println("a is not greater than d also");
                    System.out.println("d is the largest");
                }

            }else{
                System.out.println("c is greater than a");
                if(c>d){
                    System.out.println("c is greater than d");
                    System.out.println("c is the largest");
                }else{
                    System.out.println("c is not greater than d");
                    System.out.println("d is the largest");
                }

            }
        }else{
            System.out.println("b is greater than a");
            if(b>c){
                System.out.println("b is greater than c");
                if(b>d){
                    System.out.println("b is greater than d also");
                    System.out.println("b is the largest");
                }else{
                    System.out.println("b is not greater than d");
                    System.out.println("d is the largest");
                }
            }else {
                System.out.println("b is not greaer than c");
                if(c>d){
                    System.out.println("c is greater than d also");
                    System.out.println("c is the largest");
                }else{
                    System.out.println("c is not greater than d");
                    System.out.println("d is the largest");
                }


            }
        }
    }
}

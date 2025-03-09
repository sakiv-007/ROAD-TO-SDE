package methods;

public class LearnMethods {
    public static void main(String[] kuchBhi) {
//        System.out.println(1);
//        System.out.println(2);
//            greet();
//        System.out.println(3);
//        System.out.println(4);
//        greet();

        int averageFromFunction = average(4,6);
        average(2,7);

        System.out.println(averageFromFunction);

//        for (String arg:kuchBhi){
//            System.out.println(arg);
//        }

    }
    static void greet(){
        System.out.println(5);
        System.out.println("hello");
        System.out.println(5);
    }
    public static int average(int a, int b){
        int avg = (a+b)/2;
        return avg;
    }

}

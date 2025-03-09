package arrays;

public class ProblemsOnArrays {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE);
        int numbers[] = {23, 12, 6, 7, 15, 3, 2, 56};

        //for printing the sum if array
        /*int sum=0;

        for (int number: numbers){
            sum += number;
        }
        System.out.println("sum is "+sum);*/

        //for printing the smallest in the array
        int min = Integer.MAX_VALUE;

        for (int number: numbers){
            if (number < min){
                min = number;
            }

        }
        System.out.println("min number is "+min);
    }
}

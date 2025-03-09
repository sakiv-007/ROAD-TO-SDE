package arrays;

public class BasicsOfArrays {
    public static void main(String[] args) {
//        int age[];  //declaration
//        age = new int[5]; //allocation

       /* int age[] = new int[5];
        age[0] = 5;
        age[1] = 9;

        System.out.println(age[1]);
        System.out.println(age[0]);
        System.out.println(age[2]);*/


      /*  int marks[] = {98,48,67,87,90};
        System.out.println(marks[4]);*/

        String names[] = {"Ram", "Harish", "Kran", "Monty"};
        for (int i = 0; i < names.length; i++) {
            System.out.println("Name is " +names[i]);
            
        }

        //doing the same with for each loop. it is more used

        for (String name: names){
            System.out.println("for each loop "+name);
        }
    }
}

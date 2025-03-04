package conditionalStatements;

public class chat3 {
    public static String findLargestVariable(int a, int b) {
        if (a > b) {
            return "a";  // Return the variable name as a string
        } else {
            return "b";  // Return "b" if b is greater
        }
    }

    public static void main(String[] args) {
        int a = 10, b = 20; // Example values
        String largestVar = findLargestVariable(a, b);

        System.out.println("The largest number is in variable: " + largestVar);
    }
}

package conditionalStatements;

public class ifElse {
    public static void main(String[] args) {
        int age= 120;
        if(age>=18) {
            System.out.println("you can vote");
            System.out.println("hello World!");  // if statement only sees the first line and execute it in case of true but the other lines would be execcuted irrrespective of true or false condition but but but if the braces are used and its made a block then none will be executed
        } else {
            System.out.println("you cannot vote");
        }
    }
}

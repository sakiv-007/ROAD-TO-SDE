import java.util.Random;
import java.util.Scanner;

class game{
    int noOfGuesses;

    public int Game(){
        Random num = new Random();
        int RandomNum = (int) (Math.random() * 101);
        System.out.println(RandomNum);
        return RandomNum;
    }
    public int takeUserInput(){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        return n;
    }

    public int isCorrectNum(int n, int RandomNum) {
        if (n > RandomNum) {
            System.out.println("this number is greater than your number");
        }else if (n < RandomNum) {
                System.out.println("this number is lesser than your number ");
            } else if (n == RandomNum) {
                System.out.println("your answer is right answer");
            }
        return n;
    }
}
public class karan {
    public static void main(String[] args) {
        game data = new game();
        int a = data.takeUserInput();
//        data.setName(sc.nextLine());
//        data.setAge(sc.nextInt());
//        System.out.println(data.getAge());
//        System.out.println(data.getName());
    }
}

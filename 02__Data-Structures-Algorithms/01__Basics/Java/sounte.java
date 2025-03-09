import java.util.Scanner;
public class sounte {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int i = sc.nextInt();
        int sum = 0;
        for (int j = 0 ; j <= i;j++){
            sum = sum + j;
            System.out.print(sum +  " ");
        }
    }
}
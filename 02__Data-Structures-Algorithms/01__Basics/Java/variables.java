public class variables {
    public static void main(String[] args) {
        boolean isPassed = true;
        int count = 10;
        byte marks = 13;
        float pi = 3.14f;

        int ccount = 12; // implicit/direct/widening type conversion basically we are storing int type data into long var
        long newCount = ccount;  // this basicaaly used to put short data into a long datatype whichh is usually allowed but it leads to wastage of memory space


        // the opposite is xplicit data type coversion which is doesnot happen automatically and is done explicitly

      //  double age= 12.22;
      //  float newAge= (float)age;  // explicit data type conversion

        int age= 128;
        byte newAge=(byte)age;



        System.out.println(newAge);
    }
}
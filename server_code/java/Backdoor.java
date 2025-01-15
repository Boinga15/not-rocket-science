public class Backdoor {
    static int initialAccess(String inputtedCode) {
        if (inputtedCode.equals("YA24VZ")) {
            return 0;
        } else {
            return -1;
        }
    }

    public static void main(String[] args) {
        switch(args[0]) {
            case "0":
                System.out.println(initialAccess(args[1]));
                break;
        }
    }
}
//import java.awt.*;
//import java.awt.event.*;
//import javax.swing.*;
//
//public class SnakeGame extends JPanel implements ActionListener {
//    private final int WIDTH = 500;
//    private final int HEIGHT = 500;
//    private final int DOT_SIZE = 10;
//    private final int ALL_DOTS = 900;
//    private final int RAND_POS = 29;
//    private final int DELAY = 140;
//
//    private int[] x = new int[ALL_DOTS];
//    private int[] y = new int[ALL_DOTS];
//
//    private int dots;
//    private int apple_x;
//    private int apple_y;
//
//    private boolean leftDirection = false;
//    private boolean rightDirection = true;
//    private boolean upDirection = false;
//    private boolean downDirection = false;
//    private boolean inGame = true;
//
//    private Timer timer;
//    private Image ball;
//    private Image apple;
//    private Image head;
//
//    public SnakeGame() {
//        addKeyListener(new TAdapter());
//        setBackground(Color.black);
//        setPreferredSize(new Dimension(WIDTH, HEIGHT));
//        setFocusable(true);
//
//        loadImages();
//        initGame();
//    }
//
//    private void loadImages() {
//        ImageIcon iid = new ImageIcon("dot.png");
//        ball = iid.getImage();
//
//        ImageIcon iia = new ImageIcon("apple.png");
//        apple = iia.getImage();
//
//        ImageIcon iih = new ImageIcon("head.png");
//        head = iih.getImage();
//    }
//
//    private void initGame() {
//        dots = 3;
//
//        for (int i = 0; i < dots; i++) {
//            x[i] = 50 - i * DOT_SIZE;
//            y[i] = 50;
//        }
//
//        locateApple();
//
//        timer = new Timer(DELAY, this);
//        timer.start();
//    }
//
//    @Override
//    public void paintComponent(Graphics g) {
//        super.paintComponent(g);
//
//        doDrawing(g);
//    }
//
//    private void doDrawing(Graphics g) {
//        if (inGame) {
//            g.drawImage(apple, apple_x, apple_y, this);
//
//            for (int i = 0; i < dots; i++) {
//                if (i == 0) {
//                    g.drawImage(head, x[i], y[i], this);
//                } else {
//                    g.drawImage(ball, x[i], y[i], this);
//                }
//            }
//
//            Toolkit.getDefaultToolkit().sync();
//        } else {
//            gameOver(g);
//        }
//    }
//
//    private void gameOver(Graphics g) {
//        String msg = "Game Over";
//        Font small = new Font("Helvetica", Font.BOLD, 14);
//        FontMetrics metr = getFontMetrics(small);
//
//        g.setColor(Color.white);
//        g.setFont(small);
//        g.drawString(msg, (WIDTH - metr.stringWidth(msg)) / 2, HEIGHT / 2);
//    }
//
//    private void checkApple() {
//        if ((x[0] == apple_x) && (y[0] == apple_y)) {
//            dots++;
//            locateApple();
//        }
//    }
//
//    private void move() {
//        for (int i = dots; i > 0; i--) {
//            x[i] = x[(i - 1)];
//            y[i] = y[(i - 1)];
//        }
//
//        if (leftDirection) {
//            x[0] -= DOT_SIZE;
//        }
//
//        if (rightDirection) {
//            x[0] += DOT_SIZE;
//        }
//
//        if (upDirection) {
//            y[0] -= DOT_SIZE;
//        }
//
//        if (downDirection) {
//            y[0] += DOT_SIZE;
//        }
//    }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
////    private void checkCollision() {
////    }

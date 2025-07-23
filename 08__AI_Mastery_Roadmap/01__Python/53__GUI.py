# PyQt5 GUI intro

import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtGui import QIcon

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("My First GUI window")
        self.setGeometry(700, 300, 500, 500)
        self.setWindowIcon(QIcon("pngtree-creative-logo-design-illustration-png-image_12621641.png"))

    
def main():
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
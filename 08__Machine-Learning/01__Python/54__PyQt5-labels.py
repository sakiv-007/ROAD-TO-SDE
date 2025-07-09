# PyQt5 QLabels

import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel
from PyQt5.QtGui import QFont
from PyQt5.QtCore import Qt

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("My First GUI window")
        self.setGeometry(700, 300, 500, 500)
        

        label = QLabel("Hello", self)
        label.setFont(QFont("Arial", 40))
        label.setGeometry(0, 0, 500, 100)
        label.setStyleSheet("color: #292929;"                   "background-color: #6fdcf7;" "font-weight: bold;" "font-style: italic;" "text-decoration: underline;")

       # label.setAlignment(Qt.AlignTop)  # VERTICALLY TOP
        label.setAlignment(Qt.AlignBottom)  # VARTICALLY BOTTOM
        label.setAlignment(Qt.AlignCenter)  # VERTICALLY CWNTER
        label.setAlignment(Qt.AlignRight)  # HORIZONTALLY RIGHT
        label.setAlignment(Qt.AlignHCenter)  # HORIZONTALLY CENTER


        # label.setAlignment(Qt.AlignCenter | Qt.AlignTop)     # CENTER & TOP
        # label.setAlignment(Qt.AlignCenter | Qt.AlignBottom)     # CENTER & BOTTOM
        # label.setAlignment(Qt.AlignHCenter | Qt.AlignVCenter)     # CENTER & CENTER
        label.setAlignment(Qt.AlignCenter)  # CENTER AND CENTER

def main():
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
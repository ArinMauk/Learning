#include <iostream>
#include "Triangle.h"
#include "Shape.h"

using namespace std;

// Command line, go to directory of the file.
// Compiling: g++ <fileName>

class Circle : public Shape {
    private: 
        double radius;

    public:

        void setRadius(double newRadius){
            radius = newRadius;
        }

        double getRaidus(){
            return radius;
        }

        double getArea(){
            return 3.14 * (radius * radius);
        }
};

class Rectangle : public Shape {
    private:
        double width;
        double length;
    public:
        void setWidth(double newWidth);
        void setLength(double newLength);
        double getWidth();
        double getLength();
        double getArea() override;
        
};

void Rectangle::setWidth(double newWidth){
    width = newWidth;
}

void Rectangle::setLength(double newLength){
    length = newLength;
}

double Rectangle::getWidth(){
    return width;
}

double Rectangle::getLength(){
    return length;
}

double Rectangle::getArea(){
    return width * length;
}

int main()
{
    Circle circle1;
    Circle * circle2 = &circle1; // circle2 now stores the address of circle1.
    Rectangle rectangle1;
    Triangle triangle1;

    circle1.setRadius(5.0);

    rectangle1.setLength(3.00);
    rectangle1.setWidth(7.000);

    triangle1.setBase(2.00);
    triangle1.setHeight(8.00);

    cout << "Area of Circle 1: " << circle1.getArea() << "\n" << "Area of Rectangle 1: " << rectangle1.getArea() << "\n" << "Area of Triangle 1: " << triangle1.getArea() << endl;
    cout << "Area of Circle 2 (using arrow method): " << circle2->getArea() << endl;
    cout << "Area of Circle 2 (using * [dereference] operator): " << (*circle2).getArea() << endl;

    return 0;
}
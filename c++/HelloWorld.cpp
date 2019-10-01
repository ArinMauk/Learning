#include <iostream>

using namespace std;

// Command line, go to directory of the file.
// Compiling: g++ <fileName>

class Circle {
    private: 
        double radius;

    public:

        void setRadius(double temp_radius){
            radius = temp_radius;
        }

        double getRaidus(){
            return radius;
        }

        double getArea(){
            return 3.14 * (radius * radius);
        }


};

int main()
{

    Circle circle1;

    circle1.setRadius(5.0);
    cout << "Area of Circle 1: " << circle1.getArea() << endl;
    cout << "Hello World" << endl;
    return 0;
}
#ifndef TRIANGLE_H
#define TRIANGLE_H
#include "Shape.h"

class Triangle: public Shape{
    private:
        double base;
        double height;
    public:
        void setBase(double newBase);
        void setHeight(double newHeight);
        double getBase();
        double getHeight();
        double getArea() override;
        double getPerimeter() override;

};

#endif
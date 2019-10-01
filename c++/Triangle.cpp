#include "Triangle.h"

void Triangle::setBase(double newBase){
    base = newBase;
}

void Triangle::setHeight(double newHeight){
    height = newHeight;
}

double Triangle::getBase(){
    return base;
}

double Triangle::getHeight(){
    return height;
}

double Triangle::getArea(){
    return (0.5) * base * height;
}

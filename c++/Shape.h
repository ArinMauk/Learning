#ifndef SHAPE_H
#define SHAPE_H

// NOTE: For virtual methods, you must include some degree of implmentation. 
// eg: virtual double getArea(); doesn't work; you cant override that in derived classes.
// virtual double getArea(){return 0.0;}; does work because it has some default implementation.

class Shape{
    public: 
        virtual double getArea(){return 0.0;};
        virtual double getPerimeter(){return 0.0;};
};

#endif
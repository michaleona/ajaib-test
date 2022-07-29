# Ajaib Test

## Overview

A personal project website that contains a data table to display user data.

## Features

- Search by keyword (debounced)
- Filter by Gender
- Reset Filter
- Pagination
- Sort in every table column header

## Running The Project

1. Clone this project locally
2. Run `npm install` in your command line
3. Run `npm run dev` in your command line

   Or you can visit here for the demo: https://michaleona.github.io/ajaib-test/

## Mini-Questionnaire

1. Explain how Object Oriented Programming works with a thorough understanding of the keyword this
   and the new keyword.

   **this**: `this` is actually a binding that is made when a function is invoked, and what it references is determined entirely by the call-site where the function is called.

   **new**: Constructors are invoked using the `new` keyword. If we make a constructor call we will always receive an object in return. The main purpose of constructors is they allow us to implement reusable object creation code. JavaScript provides constructor functions for a lot of built-in objects, like `Date`.

2. What is the new class syntax and how to create instance methods, class methods?

   A class method is a method defined within the scope of a class and the defined class method gives the class
   functionality.

   An instance method is similar to a class method in that they both are defined within the scope of a specific
   class. However, an instance method gives functionality to a single instance of that class, not the class as a
   whole.

3. Give an example of how to implement inheritance in ES2015 using extends and super.

   ```
   class Animal {
    constructor(legs) {
        this.legs = legs;
    }
    walk() {
        console.log('walking on ' + this.legs + ' legs');
    }
   }

   class Bird extends Animal {
    constructor(legs) {
        super(legs);
    }
    fly() {
        console.log('flying');
    }
   }

   let bird = new Bird(2);

   bird.walk();
   bird.fly();

   ```

4. Imagine refactoring an ES5 application to use ES2015, how would you go about it?
   - Remove the function keywords and add a fat arrow (=>) between the parentheses and curly brace
   - If the function only has one parameter, the parentheses around the parameter can be removed
   - If the function has a return expression — we can remove the curly braces, remove the semi-colon after the expression, remove the “return” keyword and there will be an implicit return of the expression
5. Give an example of how you structure applications with design patterns using closure and modules.
   ```
    class Animal {
     private animals = ['Bird', 'Cat', 'Dog'];
     get Animals() {
      return this.animals;
     }
    }
    const animal = new Animal();
    console.log(animal.Animals); // ['Bird', 'Cat', 'Dog']
    console.log(animal.animals); // ['Bird', 'Cat', 'Dog']
    // Property 'animals' is private and only accessible within class 'Animal'.
   ```
6. What are your preferred ways of testing your web application?

   End-to-end testing using Cypress.

7. Which web server do you use? Why? Explain pros and cons of your choice.

   Google Cloud.  
   Pros:

   - Strong data analytics and storage
   - Good documentation
   - High durability
   - Different storage classes for each necessity

   Cons:

   - Support fee is quite hefty

8. What is your preferred production deployment process?
   - Branches: feature branches, master, release\*, production
   - Versioning [major].[minor].[patch(bugfix)]
   - Do not deploy on Fridays
   - Correctly understand the difference between squash and merge commit
9. Give an example of clean README.md documentation.

   The clean README.md consist of:

   - Title
   - Overview
   - Features
   - Running the project
   - Dependencies

   Optional additions:

   - To-do list
   - Contributors

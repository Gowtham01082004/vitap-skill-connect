import React from "react";
import { useParams } from "react-router-dom";
import "./InterviewPrepPage.css";

// Example data structure (replace this with your actual data)
const data = {
  oop: {
    title: "Object-Oriented Programming",
    questions: [
      {
        q: "What is the need for OOPs?",
        a: `
          <p>There are many reasons why OOPs is mostly preferred, but the most important among them are:</p>
          <ul>
            <li>OOPs helps users to understand the software easily, even without knowing the actual implementation.</li>
            <li>With OOPs, the readability, understandability, and maintainability of the code increase multifold.</li>
            <li>Even very big software can be written and managed easily using OOPs.</li>
          </ul>
        `,
      },

      {
        q: "What are some major Object Oriented Programming languages?",
        a: `
          <p>The programming languages that use and follow the Object-Oriented Programming paradigm (OOPs) are known as Object-Oriented Programming languages.</p>
          <p>Some of the major OOP languages include:</p>
          <ul>
            <li>Java</li>
            <li>C++</li>
            <li>JavaScript</li>
            <li>Python</li>
            <li>PHP</li>
            <li>And many more.</li>
          </ul>
        `,
      },
      {
        q: "What are some other programming paradigms other than OOPs?",
        a: `
          <p>Programming paradigms refer to the method of classification of programming languages based on their features.</p>
          <p>There are mainly two types of programming paradigms:</p>
          <h6>1. Imperative Programming Paradigm</h6>
          <p>Focuses on how to execute the program logic and defines control flow using statements that change a program's state. Subtypes include:</p>
          <ul>
            <li>Procedural Programming: Specifies step-by-step instructions usually read from top to bottom.</li>
            <li>Object-Oriented Programming (OOP): Organizes programs as objects with data and behavior.</li>
            <li>Parallel Programming: Breaks tasks into subtasks and runs them simultaneously.</li>
          </ul>
          <h6>2. Declarative Programming Paradigm</h6>
          <p>Focuses on what to execute, defining program logic without control flow. Subtypes include:</p>
          <ul>
            <li>Logical Programming: Based on formal logic, expressing rules and facts.</li>
            <li>Functional Programming: Builds programs by applying and composing pure functions.</li>
            <li>Database Programming: Manages structured data using records, fields, and queries.</li>
          </ul>
        `,
      },

      {
        q: "What is meant by Structured Programming?",
        a: `
          <p>Structured Programming refers to a programming approach that emphasizes a completely structured control flow. In this context, "structure" means a code block that follows defined rules and logical flow using constructs like:</p>
          <ul>
            <li><code>if / then / else</code></li>
            <li><code>while</code> and <code>for</code> loops</li>
            <li>Block structures and subroutines</li>
          </ul>
          <p>Nearly all modern programming paradigms, including Object-Oriented Programming (OOPs), support structured programming principles.</p>
        `,
      },
      {
        q: "What are the main features of OOPs?",
        a: `
          <p>OOPs (Object-Oriented Programming) is built upon four main features. These define the structure and behavior of OOP systems:</p>
          <ul>
            <li>Inheritance</li>
            <li>Encapsulation</li>
            <li>Polymorphism</li>
            <li>Data Abstraction</li>
          </ul>
          <p>These features help in building modular, reusable, and maintainable code.</p>
        `,
      },

      {
        q: "What are some advantages of using OOPs?",
        a: `
          <p>Object-Oriented Programming (OOPs) provides many benefits, especially when developing complex software systems. Some of the key advantages include:</p>
          <ul>
            <li>Helps solve highly complex problems efficiently.</li>
            <li>Allows easy creation, handling, and maintenance of large programs.</li>
            <li>Promotes code reuse, reducing redundancy through inheritance.</li>
            <li>Supports data abstraction to hide unnecessary details from users.</li>
            <li>Follows a bottom-up approach, as opposed to the top-down approach in structured programming.</li>
            <li>Polymorphism adds flexibility to the code by allowing different behaviors using the same interface.</li>
          </ul>
        `,
      },
      {
        q: "Why is OOPs so popular?",
        a: `
          <p>OOPs is considered a better and more organized style of programming. It enables developers to:</p>
          <ul>
            <li>Write complex code in a structured and manageable way.</li>
            <li>Easily maintain and extend existing programs.</li>
            <li>Use the core OOP principles — Abstraction, Encapsulation, Inheritance, and Polymorphism — to solve real-world problems effectively.</li>
          </ul>
          <p>These benefits contribute to the wide popularity and adoption of OOPs in modern software development.</p>
        `,
      },
      {
        q: "What is meant by the term OOPs?",
        a: `
          <p>OOPs stands for Object-Oriented Programming. It is a programming paradigm that uses <strong>objects</strong> — real-world entities that encapsulate both data and behavior.</p>
          <p>Each object is an instance of a class and represents some meaningful component of the program with its own state and actions.</p>
          <p>OOPs helps in modeling real-world systems and encourages code modularity and reuse.</p>
        `,
      },
      {
        q: "What are access specifiers and what is their significance?",
        a: `
          <p>Access specifiers are special keywords used to control the visibility and accessibility of entities such as classes, methods, and variables.</p>
          <p>Common access specifiers include:</p>
          <ul>
            <li><code>private</code>: Accessible only within the same class.</li>
            <li><code>public</code>: Accessible from any class.</li>
            <li><code>protected</code>: Accessible within the class and by derived classes.</li>
          </ul>
          <p>Access specifiers are essential for implementing encapsulation, one of the core principles of OOPs.</p>
        `,
      },
      {
        q: "Are there any limitations of Inheritance?",
        a: `
          <p>Yes, while inheritance is a powerful feature in Object-Oriented Programming, it has some limitations:</p>
          <ul>
            <li>It can increase complexity due to tight coupling between base and child classes.</li>
            <li>Changes in the base class may require nested changes in derived classes.</li>
            <li>It may require more processing time due to the hierarchy traversal.</li>
            <li>Incorrect use can lead to unexpected behavior or bugs.</li>
          </ul>
        `,
      },
      {
        q: "What are the various types of inheritance?",
        a: `
          <p>There are several types of inheritance supported in Object-Oriented Programming:</p>
          <ul>
            <li>Single Inheritance</li>
            <li>Multiple Inheritance</li>
            <li>Multilevel Inheritance</li>
            <li>Hierarchical Inheritance</li>
            <li>Hybrid Inheritance</li>
          </ul>
        `,
      },
      {
        q: "What is a subclass?",
        a: "<p>The subclass is a part of Inheritance. The subclass is an entity, which inherits from another class. It is also known as the child class.</p>",
      },
      {
        q: "Define a superclass?",
        a: "<p>Superclass is also a part of Inheritance. The superclass is an entity, which allows subclasses or child classes to inherit from itself.</p>",
      },
      {
        q: "What is an interface?",
        a: `
          <p>An interface is a special type of class that contains method declarations but no method definitions.</p>
          <p>You cannot create objects of an interface. Instead, you must implement the interface in a class and provide concrete definitions for all its methods.</p>
        `,
      },
      {
        q: "What is meant by static polymorphism?",
        a: `
          <p>Static polymorphism, also known as compile-time polymorphism, refers to the binding of a function call to a specific method at compile time.</p>
          <p>It is achieved using:</p>
          <ul>
            <li>Method Overloading</li>
            <li>Operator Overloading</li>
          </ul>
        `,
      },
      {
        q: "What is meant by dynamic polymorphism?",
        a: `
          <p>Dynamic polymorphism, also known as runtime polymorphism, refers to the decision of which method implementation to call made at runtime.</p>
          <p>It is typically achieved through method overriding.</p>
        `,
      },
      {
        q: "What is the difference between overloading and overriding?",
        a: `
          <p><strong>Overloading</strong> is a compile-time polymorphism feature where multiple methods have the same name but different parameters. Examples include:</p>
          <ul>
            <li>Method Overloading</li>
            <li>Operator Overloading</li>
          </ul>
          <p><strong>Overriding</strong> is a runtime polymorphism feature where a method in a subclass has the same name and signature as a method in its superclass, but with a different implementation.</p>
        `,
      },
      {
        q: "How is data abstraction accomplished?",
        a: `
          <p>Data abstraction is accomplished using:</p>
          <ul>
            <li>Abstract Classes</li>
            <li>Abstract Methods</li>
          </ul>
          <p>These allow hiding internal implementation details and exposing only the necessary information.</p>
        `,
      },
      {
        q: "What is an abstract class?",
        a: `
          <p>An abstract class is a class that can contain abstract methods (without implementation) as well as concrete methods (with implementation).</p>
          <p>It cannot be instantiated directly. Any subclass inheriting from it must provide implementations for the abstract methods.</p>
        `,
      },
      {
        q: "How is an abstract class different from an interface?",
        a: `
          <p>Both abstract classes and interfaces define methods without implementation. However, the key differences are:</p>
          <ul>
            <li>Interfaces only allow method declarations; abstract classes can have both abstract and non-abstract methods.</li>
            <li>When implementing an interface, all methods must be defined in the implementing class.</li>
            <li>A subclass inheriting an abstract class must implement its abstract methods unless it is declared abstract itself.</li>
          </ul>
        `,
      },
      {
        q: "Explain Inheritance with an example?",
        a: `
          <p>Inheritance is an OOP feature where a class (child) inherits properties and behaviors from another class (parent), enabling code reuse.</p>
          <p><strong>Example:</strong> Consider vehicles like cars, trucks, and buses. All have common features like steering wheels, accelerators, and brakes. Instead of defining these individually for each vehicle, they can inherit these common features from a parent "Vehicle" class.</p>
          <p>This promotes reuse and simplifies the development process.</p>
        `,
      },
      {
        q: "What is an exception?",
        a: `
          <p>An exception is a special event that occurs during the execution of a program and disrupts its normal flow.</p>
          <p>Exceptions usually happen when the program encounters undesirable inputs or tries to perform an operation it's not designed to handle, such as dividing by zero or accessing an invalid index.</p>
        `,
      },
      {
        q: "What is meant by exception handling?",
        a: `
          <p>Exception handling is the mechanism used to handle runtime errors in a program gracefully without crashing the software.</p>
          <p>It identifies possible failure points in the code and allows defining alternate outcomes when such errors occur.</p>
          <p>The most common way to handle exceptions is through <code>try-catch</code> blocks, where the code that might raise an exception is placed in <code>try</code>, and the handling logic is placed in <code>catch</code>.</p>
        `,
      },
      {
        q: "What is meant by Garbage Collection in OOPs world?",
        a: `
          <p>Garbage collection is a memory management feature in object-oriented programming that automatically reclaims memory used by objects that are no longer needed.</p>
          <p>This helps prevent memory leaks and ensures efficient use of resources. It removes objects from memory that no longer have any references pointing to them.</p>
        `,
      },
      {
        q: "Can we run a Java application without implementing the OOPs concept?",
        a: `
          <p>No, Java is inherently based on the Object-Oriented Programming (OOP) model, so it cannot function properly without using OOP concepts.</p>
          <p>However, C++ can run without OOPs because it also supports procedural programming like C, making it a hybrid language that supports both paradigms.</p>
        `,
      },
      {
        q: "What is Compile time Polymorphism and how is it different from Runtime Polymorphism?",
        a: `
          <h6>Compile Time Polymorphism (Static Polymorphism):</h6>
          <p>Compile time polymorphism refers to polymorphic behavior that is resolved during the program's compilation. It is also called static polymorphism.</p>
          <p>The compiler determines which method or function to execute based on the method signature. This is typically achieved through:</p>
          <ul>
            <li>Method Overloading (same method name with different parameters)</li>
            <li>Operator Overloading</li>
          </ul>
          <p>Example: multiple <code>add()</code> methods with different parameters. The compiler selects the appropriate method based on arguments passed during compile time.</p>
      
          <h6>Runtime Polymorphism (Dynamic Polymorphism):</h6>
          <p>Runtime polymorphism refers to polymorphic behavior that is determined during program execution. It is also called dynamic polymorphism.</p>
          <p>The method to execute is determined at runtime, usually via:</p>
          <ul>
            <li>Method Overriding (subclass redefines a method from its superclass)</li>
          </ul>
          <p>Here, the decision of which method to execute is deferred until the object is actually used during runtime.</p>
        `,
      },
      {
        q: "What is a class?",
        a: `
          <p>A class is a blueprint or template that defines a structure containing member data (variables) and behaviors (methods/functions).</p>
          <p>When objects are created, they automatically take the structure defined by the class.</p>
          <p><strong>Example:</strong> A car template is defined once, and then multiple cars (objects) can be created from that template.</p>
        `,
      },
      {
        q: "What is an object?",
        a: `
          <p>An object is an instance of a class. It contains actual values for the properties and behaviors defined in the class template.</p>
          <p>Objects consume memory and represent real-world entities.</p>
          <p><strong>Example:</strong> A specific car built from the car class template.</p>
        `,
      },
      {
        q: "What is encapsulation?",
        a: `
          <p>Encapsulation is the process of bundling data and the methods that operate on that data into a single unit called a class, while restricting access to internal details.</p>
          <p>It can be explained in two ways:</p>
          <ul>
            <li><strong>Data Hiding:</strong> Hiding unwanted internal details using access specifiers.</li>
            <li><strong>Data Binding:</strong> Grouping related variables and functions together.</li>
          </ul>
        `,
      },
      {
        q: "What is Polymorphism?",
        a: `
          <p>Polymorphism means "many forms". In OOP, it refers to the ability of a method, object, or data to behave differently in different contexts.</p>
          <p>Types of Polymorphism:</p>
          <ul>
            <li>Compile-Time Polymorphism</li>
            <li>Run-Time Polymorphism</li>
          </ul>
        `,
      },
      {
        q: "How does C++ support Polymorphism?",
        a: `
          <p>C++ supports both compile-time and runtime polymorphism:</p>
          <ul>
            <li><strong>Compile-Time:</strong> Achieved using templates, function overloading, and default arguments.</li>
            <li><strong>Runtime:</strong> Achieved using virtual functions that are resolved during execution based on object type.</li>
          </ul>
        `,
      },
      {
        q: "What is meant by Inheritance?",
        a: `
          <p>Inheritance is the mechanism in OOP where one class (child) inherits properties and behaviors from another class (parent).</p>
          <p>This promotes code reuse and makes implementation simpler.</p>
        `,
      },
      {
        q: "What is Abstraction?",
        a: `
          <p>Abstraction is the process of hiding complex internal details and showing only the essential features of an object.</p>
          <p><strong>Example:</strong> You can drive a car without knowing how its internal components work.</p>
        `,
      },
      {
        q: "How much memory does a class occupy?",
        a: `
          <p>A class does not occupy memory on its own. It is just a blueprint.</p>
          <p>Memory is allocated only when objects of that class are created.</p>
        `,
      },
      {
        q: "Is it always necessary to create objects from a class?",
        a: `
          <p>No, creating an object is not always necessary. If the class contains only static methods, those can be accessed using the class name directly without creating an object.</p>
        `,
      },
      {
        q: "What is a constructor?",
        a: `
          <p>A constructor is a special method in a class with the same name as the class. It is called automatically when an object is created.</p>
          <p><strong>Example:</strong> <code>MyClass obj = new MyClass();</code> — here <code>MyClass()</code> is the constructor used to initialize the object <code>obj</code>.</p>
        `,
      },
      {
        q: "What are the various types of constructors in C++?",
        a: `
          <p>The most common types of constructors in C++ include:</p>
          
          <h6>1. Default Constructor</h6>
          <p>This constructor takes no parameters and is automatically called when an object is created without arguments.</p>
          <pre><code>class ABC {
        int x;
        ABC() {
          x = 0;
        }
      };</code></pre>
      
          <h6>2. Parameterized Constructor</h6>
          <p>This constructor takes arguments to initialize member variables.</p>
          <pre><code>class ABC {
        int x;
        ABC(int y) {
          x = y;
        }
      };</code></pre>
      
          <h6>3. Copy Constructor</h6>
          <p>This constructor initializes a new object as a copy of an existing object.</p>
          <pre><code>class ABC {
        int x;
        ABC(int y) {
          x = y;
        }
        // Copy constructor
        ABC(ABC abc) {
          x = abc.x;
        }
      };</code></pre>
        `,
      },
      {
        q: "What is a copy constructor?",
        a: `
          <p>A copy constructor is a constructor that creates a new object by copying data from another object of the same class.</p>
          <p>It is used when a duplicate object needs to be created with the same values.</p>
        `,
      },
      {
        q: "What is a destructor?",
        a: `
          <p>A destructor is a special method used to clean up resources and memory occupied by an object.</p>
          <p>It is automatically invoked when the object goes out of scope or is explicitly deleted. It helps prevent memory leaks.</p>
        `,
      },
      {
        q: "Are class and structure the same? If not, what's the difference between a class and a structure?",
        a: `
          <p>No, class and structure are not the same, although they appear similar.</p>
          <ul>
            <li><strong>Memory:</strong> Structures are usually stored in stack memory, while classes are stored in heap memory.</li>
            <li><strong>Access Specifiers:</strong> Members of a structure are public by default; members of a class are private by default.</li>
            <li><strong>Data Abstraction:</strong> Classes support abstraction, encapsulation, and other OOP principles; structures generally do not.</li>
          </ul>
        `,
      },
    ],
  },
  dbms: {
    title: "Database Management Systems",
    questions: [
      {
        q: "What is DBMS and what is its utility? Explain RDBMS with examples.",
        a: `
          <p><strong>DBMS (Database Management System)</strong> is a software application that allows users to efficiently create, manage, and interact with databases. It provides functionalities to insert, update, delete, and retrieve data in a structured and secure manner.</p>
          <p>DBMS overcomes issues like data inconsistency and redundancy that were common in file-based systems. It ensures better data integrity and security.</p>
      
          <p><strong>Examples of DBMS:</strong></p>
          <ul>
            <li>File Systems</li>
            <li>XML</li>
            <li>Windows Registry</li>
          </ul>
      
          <p><strong>RDBMS (Relational Database Management System)</strong> is an advanced form of DBMS that organizes data into <strong>tables</strong> consisting of <em>rows</em> and <em>columns</em>. Introduced in the 1970s, RDBMS allows relational data to be accessed using SQL and provides better performance, consistency, and flexibility over traditional DBMS.</p>
      
          <p><strong>Examples of RDBMS:</strong></p>
          <ul>
            <li>MySQL</li>
            <li>Oracle Database</li>
            <li>PostgreSQL</li>
          </ul>
        `,
      },

      {
        q: "What is normalization?",
        a: "Normalization reduces redundancy and dependency by organizing fields and table of data.",
      },
      {
        q: "What is ACID property in DBMS?",
        a: "Atomicity, Consistency, Isolation, Durability – essential for transaction reliability.",
      },
    ],
  },
  dsa: {
    title: "Data Structures & Algorithms",
    questions: [
      {
        q: "What are Data Structures?",
        a: `
          <p>A data structure is a mechanical or logical way that data is organized within a program. The organization of data is what determines how a program performs. There are many types of data structures, each with its own uses. When designing code, we need to pay particular attention to the way data is structured. If data isn't stored efficiently or correctly structured, then the overall performance of the code will be reduced.</p>
        `,
      },

      {
        q: "Why Create Data Structures?",
        a: `
          <p>Data structures serve a number of important functions in a program. They ensure that each line of code performs its function correctly and efficiently, they help the programmer identify and fix problems with his/her code, and they help to create a clear and organized code base.</p>
        `,
      },
      {
        q: "What are some applications of Data structures?",
        a: `
          <p>Following are some real-time applications of data structures:</p>
          <ul>
            <li>Decision Making</li>
            <li>Genetics</li>
            <li>Image Processing</li>
            <li>Blockchain</li>
            <li>Numerical and Statistical Analysis</li>
            <li>Compiler Design</li>
            <li>Database Design and many more</li>
          </ul>
        `,
      },
      {
        q: "Explain the process behind storing a variable in memory.",
        a: `
          <p>A variable is stored in memory based on the amount of memory that is needed. Following are the steps followed to store a variable:</p>
          <ul>
            <li>The required amount of memory is assigned first.</li>
            <li>Then, it is stored based on the data structure being used.</li>
            <li>Using concepts like dynamic allocation ensures high efficiency and that the storage units can be accessed based on requirements in real-time.</li>
          </ul>
        `,
      },
      {
        q: "Can you explain the difference between file structure and storage structure?",
        a: `
          <p><strong>File Structure:</strong> Representation of data into secondary or auxiliary memory — any device such as a hard disk or pen drives that stores data which remains intact until manually deleted is known as a file structure representation.</p>
          <p><strong>Storage Structure:</strong> In this type, data is stored in the main memory i.e., RAM, and is deleted once the function that uses this data gets completely executed.</p>
          <p>The difference is that the storage structure has data stored in the memory of the computer system, whereas the file structure has the data stored in the auxiliary memory.</p>
        `,
      },
      {
        q: "Describe the types of Data Structures?",
        a: `
          <p><strong>Linear Data Structure:</strong> A data structure that includes data elements arranged sequentially or linearly, where each element is connected to its previous and next nearest elements, is referred to as a linear data structure. Arrays and linked lists are two examples of linear data structures.</p>
          <p><strong>Non-Linear Data Structure:</strong> Non-linear data structures are data structures in which data elements are not arranged linearly or sequentially. We cannot walk through all elements in one pass in a non-linear data structure, as in a linear data structure. Trees and graphs are two examples of non-linear data structures.</p>
        `,
      },
      {
        q: "What is a stack data structure? What are the applications of stack?",
        a: `
          <p>A stack is a data structure that is used to represent the state of an application at a particular point in time. The stack consists of a series of items that are added to the top of the stack and then removed from the top. It is a linear data structure that follows a particular order in which operations are performed. LIFO (Last In First Out) or FILO (First In Last Out) are two possible orders.</p>
          <p>A stack consists of a sequence of items. The element that's added last will come out first, a real-life example might be a stack of clothes on top of each other. When we remove the cloth that was previously on top, we can say that the cloth that was added last comes out first.</p>
          <p><strong>Following are some applications for stack data structure:</strong></p>
          <ul>
            <li>It acts as temporary storage during recursive operations</li>
            <li>Redo and Undo operations in doc editors</li>
            <li>Reversing a string</li>
            <li>Parenthesis matching</li>
            <li>Postfix to Infix Expressions</li>
            <li>Function calls order</li>
          </ul>
        `,
      },
      {
        q: "What are different operations available in stack data structure?",
        a: `
          <p>Some of the main operations provided in the stack data structure are:</p>
          <ul>
            <li><strong>push:</strong> This adds an item to the top of the stack. The overflow condition occurs if the stack is full.</li>
            <li><strong>pop:</strong> This removes the top item of the stack. Underflow condition occurs if the stack is empty.</li>
            <li><strong>top:</strong> This returns the top item from the stack.</li>
            <li><strong>isEmpty:</strong> This returns true if the stack is empty else false.</li>
            <li><strong>size:</strong> This returns the size of the stack.</li>
          </ul>
        `,
      },
      {
        q: "What is a queue data structure? What are the applications of queue?",
        a: `
          <p>A queue is a linear data structure that allows users to store items in a list in a systematic manner. The items are added to the queue at the rear end until they are full, at which point they are removed from the queue from the front. Queues are commonly used in situations where the users want to hold items for a long period of time, such as during a checkout process. A good example of a queue is any queue of customers for a resource where the first consumer is served first.</p>
          <p><strong>Following are some applications of queue data structure:</strong></p>
          <ul>
            <li>Breadth-first search algorithm in graphs</li>
            <li>Operating system: job scheduling operations, Disk scheduling, CPU scheduling etc.</li>
            <li>Call management in call centres</li>
          </ul>
        `,
      },
      {
        q: "What are different operations available in queue data structure?",
        a: `
          <p>The following operations are available in the queue data structure:</p>
          <ul>
            <li><strong>enqueue:</strong> This adds an element to the rear end of the queue. Overflow conditions occur if the queue is full.</li>
            <li><strong>dequeue:</strong> This removes an element from the front end of the queue. Underflow conditions occur if the queue is empty.</li>
            <li><strong>isEmpty:</strong> This returns true if the queue is empty or else false.</li>
            <li><strong>rear:</strong> This returns the rear end element without removing it.</li>
            <li><strong>front:</strong> This returns the front-end element without removing it.</li>
            <li><strong>size:</strong> This returns the size of the queue.</li>
          </ul>
        `,
      },
      {
        q: "Differentiate between stack and queue data structure",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-top: 10px;">
              <thead >
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Stack</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Queue</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Stack is a linear data structure where data is added and removed from the top.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Queue is a linear data structure where data is ended at the rear end and removed from the front.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Stack is based on LIFO (Last In First Out) principle</td>
                  <td style="border: 1px solid #999; padding: 10px;">Queue is based on FIFO (First In First Out) principle</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Insertion operation in Stack is known as push.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Insertion operation in Queue is known as enque.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Delete operation in Stack is known as pop.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Delete operation in Queue is known as dequeue.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Only one pointer is available for both addition and deletion: top()</td>
                  <td style="border: 1px solid #999; padding: 10px;">Two pointers are available for addition and deletion: front() and rear()</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Used in solving recursion problems</td>
                  <td style="border: 1px solid #999; padding: 10px;">Used in solving sequential processing problems</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "How to implement a queue using stack?",
        a: `
          <p>A queue can be implemented using two stacks. Let <strong>q</strong> be the queue and <strong>stack1</strong> and <strong>stack2</strong> be the 2 stacks for implementing <strong>q</strong>. We know that stack supports push, pop, and peek operations and using these operations, we need to emulate the operations of the queue - enqueue and dequeue. Hence, queue <strong>q</strong> can be implemented in two methods (Both the methods use auxiliary space complexity of O(n)):</p>
      
          <p><strong>1. By making enqueue operation costly:</strong></p>
          <p>Here, the oldest element is always at the top of stack1 which ensures dequeue operation occurs in O(1) time complexity. To place the element at top of stack1, stack2 is used.</p>
      
          <p><strong>Pseudocode:</strong></p>
          <p><strong>Enqueue:</strong> Here time complexity will be O(n)</p>
          <pre>
      enqueue(q, data):  
        While stack1 is not empty:
          Push everything from stack1 to stack2.
        Push data to stack1
        Push everything back to stack1.
          </pre>
      
          <p><strong>Dequeue:</strong> Here time complexity will be O(1)</p>
          <pre>
      deQueue(q):
        If stack1 is empty then error  
        else Pop an item from stack1 and return it
          </pre>
      
          <p><strong>2. By making the dequeue operation costly:</strong></p>
          <p>Here, for enqueue operation, the new element is pushed at the top of stack1. Here, the enqueue operation time complexity is O(1). In dequeue, if stack2 is empty, all elements from stack1 are moved to stack2 and top of stack2 is the result. Basically, reversing the list by pushing to a stack and returning the first enqueued element. This operation of pushing all elements to a new stack takes O(n) complexity.</p>
      
          <p><strong>Pseudocode:</strong></p>
          <p><strong>Enqueue:</strong> Time complexity: O(1)</p>
          <pre>
      enqueue(q, data):    
        Push data to stack1
          </pre>
      
          <p><strong>Dequeue:</strong> Time complexity: O(n)</p>
          <pre>
      dequeue(q): 
        If both stacks are empty then raise error.
        If stack2 is empty:  
          While stack1 is not empty:
            push everything from stack1 to stack2. 
        Pop the element from stack2 and return it.
          </pre>
        `,
      },
      {
        q: "How do you implement stack using queues?",
        a: `
          <p>A stack can be implemented using two queues. We know that a queue supports enqueue and dequeue operations. Using these operations, we need to develop push, pop operations.</p>
      
          <p>Let stack be ‘s’ and queues used to implement be ‘q1’ and ‘q2’. Then, stack ‘s’ can be implemented in two ways:</p>
      
          <p><strong>1. By making push operation costly:</strong></p>
          <p>This method ensures that the newly entered element is always at the front of ‘q1’ so that pop operation just dequeues from ‘q1’.<br>
          ‘q2’ is used as auxiliary queue to put every new element in front of ‘q1’ while ensuring pop happens in O(1) complexity.</p>
      
          <p><strong>Pseudocode:</strong></p>
          <p><strong>Push element to stack s:</strong> Here push takes O(n) time complexity.</p>
          <pre>
      push(s, data):
          Enqueue data to q2
          Dequeue elements one by one from q1 and enqueue to q2
          Swap the names of q1 and q2
          </pre>
      
          <p><strong>Pop element from stack s:</strong> Takes O(1) time complexity.</p>
          <pre>
      pop(s):
          Dequeue from q1 and return it
          </pre>
      
          <p><strong>2. By making pop operation costly:</strong></p>
          <p>In push operation, the element is enqueued to q1.<br>
          In pop operation, all the elements from q1 except the last remaining element, are pushed to q2 if it is empty. That last element remaining of q1 is dequeued and returned.</p>
      
          <p><strong>Pseudocode:</strong></p>
          <p><strong>Push element to stack s:</strong> Here push takes O(1) time complexity.</p>
          <pre>
      push(s, data):
          Enqueue data to q1
          </pre>
      
          <p><strong>Pop element from stack s:</strong> Takes O(n) time complexity.</p>
          <pre>
      pop(s): 
          Step1: Dequeue every element except the last element from q1 and enqueue to q2
          Step2: Dequeue the last item of q1, the dequeued item is stored in result variable
          Step3: Swap the names of q1 and q2 (for getting updated data after dequeue)
          Step4: Return the result
          </pre>
        `,
      },
      {
        q: "What is array data structure? What are the applications of arrays?",
        a: `
          <p>An array data structure is a data structure that is used to store data in a way that is efficient and easy to access. It is similar to a list in that it stores data in a sequence. However, an array data structure differs from a list in that it can hold much more data than a list can. An array data structure is created by combining several arrays together. Each array is then given a unique identifier, and each array’s data is stored in the order in which they are created.</p>
      
          <p>Array data structures are commonly used in databases and other computer systems to store large amounts of data efficiently. They are also useful for storing information that is frequently accessed, such as large amounts of text or images.</p>
        `,
      },
      {
        q: "Elaborate on different types of array data structure",
        a: `
          <p><strong>One-dimensional array:</strong> A one-dimensional array stores its elements in contiguous memory locations, accessing them using a single index value. It is a linear data structure holding all the elements in a sequence.</p>
      
          <p><strong>Two-dimensional array:</strong> A two-dimensional array is a tabular array that includes rows and columns and stores data. An M × N two-dimensional array is created by grouping M rows and N columns into N columns and rows.</p>
      
          <p><strong>Three-dimensional array:</strong> A three-dimensional array is a grid that has rows, columns, and depth as a third dimension. It comprises a cube with rows, columns, and depth as a third dimension. The three-dimensional array has three subscripts for a position in a particular row, column, and depth. Depth (dimension or layer) is the first index, row index is the second index, and column index is the third index.</p>
        `,
      },
      {
        q: "What is a linked list data structure? What are the applications for the Linked list?",
        a: `
          <p>A linked list can be thought of as a series of linked nodes (or items) that are connected by links (or paths). Each link represents an entry into the linked list, and each entry points to the next node in the sequence. The order in which nodes are added to the list is determined by the order in which they are created.</p>
      
          <p><strong>Following are some applications of linked list data structure:</strong></p>
          <ul>
            <li>Stack, Queue, binary trees, and graphs are implemented using linked lists.</li>
            <li>Dynamic management for Operating System memory.</li>
            <li>Round robin scheduling for operating system tasks.</li>
            <li>Forward and backward operation in the browser.</li>
          </ul>
        `,
      },
      {
        q: "Elaborate on different types of Linked List data structures?",
        a: `
          <p><strong>Following are different types of linked lists:</strong></p>
      
          <p><strong>1. Singly Linked List:</strong> A singly linked list is a data structure that is used to store multiple items. The items are linked together using the key. The key is used to identify the item and is usually a unique identifier. In a singly linked list, each item is stored in a separate node. The node can be a single object or it can be a collection of objects. When an item is added to the list, the node is updated and the new item is added to the end of the list. When an item is removed from the list, the node that contains the removed item is deleted and its place is taken by another node. The key of a singly linked list can be any type of data structure that can be used to identify an object. For example, it could be an integer, a string, or even another singly linked list. Singly-linked lists are useful for storing many different types of data. For example, they are commonly used to store lists of items such as grocery lists or patient records. They are also useful for storing data that is time sensitive such as stock market prices or flight schedules.</p>
      
          <p><strong>2. Doubly Linked List:</strong> A doubly linked list is a data structure that allows for two-way data access such that each node in the list points to the next node in the list and also points back to its previous node. In a doubly linked list, each node can be accessed by its address, and the contents of the node can be accessed by its index. It's ideal for applications that need to access large amounts of data in a fast manner. A disadvantage of a doubly linked list is that it is more difficult to maintain than a single-linked list. In addition, it is more difficult to add and remove nodes than in a single-linked list.</p>
      
          <p><strong>3. Circular Linked List:</strong> A circular linked list is a unidirectional linked list where each node points to its next node and the last node points back to the first node, which makes it circular.</p>
      
          <p><strong>4. Doubly Circular Linked List:</strong> A doubly circular linked list is a linked list where each node points to its next node and its previous node and the last node points back to the first node and first node’s previous points to the last node.</p>
      
          <p><strong>5. Header List:</strong> A list that contains the header node at the beginning of the list, is called the header-linked list. This is helpful in calculating some repetitive operations like the number of elements in the list etc.</p>
        `,
      },
      {
        q: "Difference between Array and Linked List",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-top: 10px;">
              <thead >
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Arrays</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Linked Lists</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">An array is a collection of data elements of the same type.</td>
                  <td style="border: 1px solid #999; padding: 10px;">A linked list is a collection of entities known as nodes. The node is divided into two sections: data and address.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">It keeps the data elements in a single memory.</td>
                  <td style="border: 1px solid #999; padding: 10px;">It stores elements at random, or anywhere in the memory.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">The memory size of an array is fixed and cannot be changed during runtime.</td>
                  <td style="border: 1px solid #999; padding: 10px;">The memory size of a linked list is allocated during runtime.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">An array's elements are not dependent on one another.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Linked List elements are dependent on one another.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">It is easier and faster to access an element in an array.</td>
                  <td style="border: 1px solid #999; padding: 10px;">In the linked list, it takes time to access an element.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Memory utilization is ineffective in the case of an array.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Memory utilization is effective in the case of linked lists.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Operations like insertion and deletion take longer time in an array.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Operations like insertion and deletion are faster in the linked list.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "What is an asymptotic analysis of an algorithm?",
        a: `
          <p>Asymptotic analysis of an algorithm defines the run-time performance as per its mathematical boundations. Asymptotic analysis helps us articulate the best case (Omega Notation, Ω), average case (Theta Notation, θ), and worst case (Big Oh Notation, Ο) performance of an algorithm.</p>
        `,
      },
      {
        q: "What is hashmap in data structure?",
        a: `
          <p>Hashmap is a data structure that uses an implementation of a hash table data structure which allows access to data in constant time (O(1)) complexity if you have the key.</p>
        `,
      },
      {
        q: "What is the requirement for an object to be used as key or value in HashMap?",
        a: `
          <p>The key or value object that gets used in the hashmap must implement equals() and hashcode() method. The hash code is used when inserting the key object into the map and the equals method is used when trying to retrieve a value from the map.</p>
        `,
      },
      {
        q: "How does HashMap handle collisions in Java?",
        a: `
          <p>The java.util.HashMap class in Java uses the approach of chaining to handle collisions. In chaining, if the new values with the same key are attempted to be pushed, then these values are stored in a linked list stored in a bucket of the key as a chain along with the existing value.</p>
          <p>In the worst-case scenario, it can happen that all keys might have the same hashcode, which will result in the hash table turning into a linked list. In this case, searching a value will take O(n) complexity as opposed to O(1) time due to the nature of the linked list. Hence, care has to be taken while selecting hashing algorithm.</p>
        `,
      },
      {
        q: "What is the time complexity of basic operations get() and put() in HashMap class?",
        a: `
          <p>The time complexity is O(1) assuming that the hash function used in the hash map distributes elements uniformly among the buckets.</p>
        `,
      },
      {
        q: "What is binary tree data structure? What are the applications for binary trees?",
        a: `
          <p>A binary tree is a data structure that is used to organize data in a way that allows for efficient retrieval and manipulation. It is a data structure that uses two nodes, called leaves and nodes, to represent the data. The leaves represent the data and the nodes represent the relationships between the leaves. Each node has two children, called siblings, and each child has one parent. The parent is the node that is closest to the root of the tree. When a node is deleted from the tree, it is deleted from both its child and its parent.</p>
      
          <p><strong>Following are some applications for binary tree data structure:</strong></p>
          <ul>
            <li>It's widely used in computer networks for storing routing table information.</li>
            <li>Decision Trees.</li>
            <li>Expression Evaluation.</li>
            <li>Database indices.</li>
          </ul>
        `,
      },
      {
        q: "What is binary search tree data structure? What are the applications for binary search trees?",
        a: `
          <p>A binary search tree is a data structure that stores items in sorted order. In a binary search tree, each node stores a key and a value. The key is used to access the item and the value is used to determine whether the item is present or not. The key can be any type of value such as an integer, floating point number, character string, or even a combination of these types. The value can be any type of items such as an integer, floating point number, character string, or even a combination of these types. When a node is added to the tree, its key is used to access the item stored at that node. When a node is removed from the tree, its key is used to access the item stored at that node.</p>
      
          <p>A binary search tree is a special type of binary tree that has a specific order of elements in it. It has three basic qualities:</p>
          <ul>
            <li>All elements in the left subtree of a node should have a value less than or equal to the parent node's value, and</li>
            <li>All elements in the right subtree of a node should have a value greater than or equal to the parent node's value.</li>
            <li>Both the left and right subtrees must be binary search trees too.</li>
          </ul>
      
          <p><strong>Following are some applications for binary search tree data structure:</strong></p>
          <ul>
            <li>It is used for indexing and multi-level indexing.</li>
            <li>It is used for implementing various search algorithms.</li>
            <li>It is helpful in organizing a sorted stream of data.</li>
          </ul>
        `,
      },
      {
        q: "What are tree traversals?",
        a: `
          <p>Tree traversal is the process of visiting all the nodes of a tree. Since the root (head) is the first node and all nodes are connected via edges (or links) we always start with that node. There are three ways which we use to traverse a tree −</p>
          
          <p><strong>1. Inorder Traversal:</strong></p>
          <p><strong>Algorithm:</strong></p>
          <ul>
            <li>Step 1. Traverse the left subtree, i.e., call Inorder(root.left)</li>
            <li>Step 2. Visit the root.</li>
            <li>Step 3. Traverse the right subtree, i.e., call Inorder(root.right)</li>
          </ul>
          <p><strong>Inorder traversal in Java:</strong></p>
          <pre>
          // Print inorder traversal of given tree.
          void printInorderTraversal(Node root) 
          { 
              if (root == null) 
                  return;
              //first traverse to the left subtree
              printInorderTraversal(root.left);
              //then print the data of node
              System.out.print(root.data + " ");
              //then traverse to the right subtree
              printInorderTraversal(root.right); 
          }
          </pre>
          <p><strong>Uses:</strong> In binary search trees (BST), inorder traversal gives nodes in ascending order.</p>
      
          <p><strong>2. Preorder Traversal:</strong></p>
          <p><strong>Algorithm:</strong></p>
          <ul>
            <li>Step 1. Visit the root.</li>
            <li>Step 2. Traverse the left subtree, i.e., call Preorder(root.left)</li>
            <li>Step 3. Traverse the right subtree, i.e., call Preorder(root.right)</li>
          </ul>
          <p><strong>Preorder traversal in Java:</strong></p>
          <pre>
          // Print preorder traversal of given tree.
          void printPreorderTraversal(Node root) 
          { 
              if (root == null) 
                  return; 
              //first print the data of node
              System.out.print(root.data + " ");
              //then traverse to the left subtree
              printPreorderTraversal(root.left);                    
              //then traverse to the right subtree
              printPreorderTraversal(root.right); 
          }
          </pre>
          <p><strong>Uses:</strong></p>
          <ul>
            <li>Preorder traversal is commonly used to create a copy of the tree.</li>
            <li>It is also used to get prefix expression of an expression tree.</li>
          </ul>
      
          <p><strong>3. Postorder Traversal:</strong></p>
          <p><strong>Algorithm:</strong></p>
          <ul>
            <li>Step 1. Traverse the left subtree, i.e., call Postorder(root.left)</li>
            <li>Step 2. Traverse the right subtree, i.e., call Postorder(root.right)</li>
            <li>Step 3. Visit the root.</li>
          </ul>
          <p><strong>Postorder traversal in Java:</strong></p>
          <pre>
          // Print postorder traversal of given tree.
          void printPostorderTraversal(Node root) 
          { 
              if (root == null) 
                  return;
              //first traverse to the left subtree
              printPostorderTraversal(root.left);                    
              //then traverse to the right subtree
              printPostorderTraversal(root.right);
              //then print the data of node
              System.out.print(root.data + " ");
          }
          </pre>
          <p><strong>Uses:</strong></p>
          <ul>
            <li>Postorder traversal is commonly used to delete the tree.</li>
            <li>It is also useful to get the postfix expression of an expression tree.</li>
          </ul>
      
          <p><strong>Consider the following tree as an example, then:</strong></p>
          <ul>
            <li>Inorder Traversal =&gt; Left, Root, Right : [4, 2, 5, 1, 3]</li>
            <li>Preorder Traversal =&gt; Root, Left, Right : [1, 2, 4, 5, 3]</li>
            <li>Postorder Traversal =&gt; Left, Right, Root : [4, 5, 2, 3, 1]</li>
          </ul>
        `,
      },
      {
        q: "What is a deque data structure and its types? What are the applications for deque?",
        a: `
          <p>A deque can be thought of as an array of items, but with one important difference: Instead of pushing and popping items off the end to make room, deques are designed to allow items to be inserted at either end. This property makes deques well-suited for performing tasks such as keeping track of inventory, scheduling tasks, or handling large amounts of data.</p>
      
          <p><strong>There are two types of deque:</strong></p>
          <ul>
            <li><strong>Input Restricted Deque:</strong> Insertion operations are performed at only one end while deletion is performed at both ends in the input restricted queue.</li>
            <li><strong>Output Restricted Deque:</strong> Deletion operations are performed at only one end while insertion is performed at both ends in the output restricted queue.</li>
          </ul>
      
          <p><strong>Following are some real-time applications for deque data structure:</strong></p>
          <ul>
            <li>It can be used as both stack and queue, as it supports all the operations for both data structures.</li>
            <li>Web browser’s history can be stored in a deque.</li>
            <li>Operating systems job scheduling algorithm.</li>
          </ul>
        `,
      },
      {
        q: "What are some key operations performed on the Deque data structure?",
        a: `
          <p><strong>Following are the key operations available in deque:</strong></p>
          <ul>
            <li><strong>insertFront():</strong> This adds an element to the front of the Deque.</li>
            <li><strong>insertLast():</strong> This adds an element to the rear of the Deque.</li>
            <li><strong>deleteFront():</strong> This deletes an element from the front of the Deque.</li>
            <li><strong>deleteLast():</strong> This deletes an element from the rear of the Deque.</li>
            <li><strong>getFront():</strong> This gets an element from the front of the Deque.</li>
            <li><strong>getRear():</strong> This gets an element from the rear of the Deque.</li>
            <li><strong>isEmpty():</strong> This checks whether Deque is empty or not.</li>
            <li><strong>isFull():</strong> This checks whether Deque is full or not.</li>
          </ul>
        `,
      },
      {
        q: "What is a priority queue? What are the applications for priority queue?",
        a: `
          <p>Priority Queue is an abstract data type that is similar to a queue in that each element is assigned a priority value. The order in which elements in a priority queue are served is determined by their priority (i.e., the order in which they are removed). If the elements have the same priority, they are served in the order they appear in the queue.</p>
      
          <p><strong>Following are some real-time applications for priority queue:</strong></p>
          <ul>
            <li>Used in graph algorithms like Dijkstra, Prim’s Minimum spanning tree etc.</li>
            <li>Huffman code for data compression</li>
            <li>Finding Kth Largest/Smallest element</li>
          </ul>
        `,
      },
      {
        q: "Compare different implementations of priority queue",
        a: `
          <p>The following table contains an asymptotic analysis of different implementations of a priority queue:</p>
      
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
              <thead >
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;">Operations</th>
                  <th style="border: 1px solid #999; padding: 10px;">peek</th>
                  <th style="border: 1px solid #999; padding: 10px;">insert</th>
                  <th style="border: 1px solid #999; padding: 10px;">delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Linked List</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(1)</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(n)</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(1)</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Binary Heap</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(1)</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(log n)</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(log n)</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Binary Search Tree</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(1)</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(log n)</td>
                  <td style="border: 1px solid #999; padding: 10px;">O(log n)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "What is graph data structure and its representations? What are the applications for graphs?",
        a: `
          <p>A graph is a type of non-linear data structure made up of nodes and edges. The nodes are also known as vertices, and edges are lines or arcs that connect any two nodes in the graph.</p>
      
          <p><strong>The following are the two most common graph representations:</strong></p>
      
          <p><strong>1. Adjacency Matrix:</strong> Adjacency Matrix is a two-dimensional array with the dimensions V x V, where V is the number of vertices in a graph. Representation is simpler to implement and adhere to. It takes O(1) time to remove an edge. Queries such as whether there is an edge from vertex 'u' to vertex 'v' are efficient and can be completed in O(1).</p>
      
          <p>One of the cons of this representation is that even if the graph is sparse (has fewer edges), it takes up the same amount of space. Adding a vertex takes O(V^2). It also takes O(V) time to compute all of a vertex's neighbours, which is not very efficient.</p>
      
          <p><strong>2. Adjacency List:</strong> In this method, each Node holds a list of Nodes that are directly connected to that vertex. Each node at the end of the list is connected with null values to indicate that it is the last node in the list. This saves space O(|V|+|E|). In the worst-case scenario, a graph can have C(V, 2) edges, consuming O(V^2) space. It is simpler to add a vertex. It takes the least amount of time to compute all of a vertex's neighbours.</p>
      
          <p>One of the cons of this representation is that ​queries such as "is there an edge from vertex u to vertex v?" are inefficient and take O(V) in the worst case.</p>
        `,
      },
      {
        q: "What is the difference between the Breadth First Search (BFS) and Depth First Search (DFS)?",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
              <thead >
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Breadth First Search (BFS)</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Depth First Search (DFS)</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">It stands for “Breadth First Search”</td>
                  <td style="border: 1px solid #999; padding: 10px;">It stands for “Depth First Search”</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">BFS finds the shortest path using the Queue data structure.</td>
                  <td style="border: 1px solid #999; padding: 10px;">DFS finds the shortest path using the Stack data structure.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">We walk through all nodes on the same level before passing to the next level in BFS.</td>
                  <td style="border: 1px solid #999; padding: 10px;">DFS begins at the root node and proceeds as far as possible through the nodes until we reach the node with no unvisited nearby nodes.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">When compared to DFS, BFS is slower.</td>
                  <td style="border: 1px solid #999; padding: 10px;">When compared to BFS, DFS is faster.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">BFS performs better when the target is close to the source.</td>
                  <td style="border: 1px solid #999; padding: 10px;">DFS performs better when the target is far from the source.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">BFS necessitates more memory.</td>
                  <td style="border: 1px solid #999; padding: 10px;">DFS necessitates less memory.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Nodes that have been traversed multiple times are removed from the queue.</td>
                  <td style="border: 1px solid #999; padding: 10px;">When there are no more nodes to visit, the visited nodes are added to the stack and then removed.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Backtracking is not an option in BFS.</td>
                  <td style="border: 1px solid #999; padding: 10px;">The DFS algorithm is a recursive algorithm that employs the concept of backtracking.</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">It is based on the FIFO principle (First In First Out).</td>
                  <td style="border: 1px solid #999; padding: 10px;">It is based on the LIFO principle (Last In First Out).</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "What is AVL tree data structure, its operations, and its rotations? What are the applications for AVL trees?",
        a: `
          <p>AVL trees are height balancing binary search trees named after their inventors Adelson, Velski, and Landis. The AVL tree compares the heights of the left and right subtrees and ensures that the difference is less than one. This distinction is known as the Balance Factor.</p>
      
          <p><strong>BalanceFactor = height(left-subtree) − height(right-subtree)</strong></p>
      
          <p><strong>We can perform the following two operations on AVL tree:</strong></p>
          <ul>
            <li><strong>Insertion:</strong> Insertion in an AVL tree is done in the same way that it is done in a binary search tree. However, it may cause a violation in the AVL tree property, requiring the tree to be balanced. Rotations can be used to balance the tree.</li>
            <li><strong>Deletion:</strong> Deletion can also be performed in the same manner as in a binary search tree. Because deletion can disrupt the tree's balance, various types of rotations are used to rebalance it.</li>
          </ul>
      
          <p><strong>An AVL tree can balance itself by performing the four rotations listed below:</strong></p>
          <ul>
            <li><strong>Left rotation:</strong> When a node is inserted into the right subtree of the right subtree and the tree becomes unbalanced, we perform a single left rotation.</li>
            <li><strong>Right rotation:</strong> If a node is inserted in the left subtree of the left subtree, the AVL tree may become unbalanced. The tree then requires right rotation.</li>
            <li><strong>Left-Right rotation:</strong> The RR rotation is performed first on the subtree, followed by the LL rotation on the entire tree.</li>
            <li><strong>Right-Left rotation:</strong> The LL rotation is performed first on the subtree, followed by the RR rotation on the entire tree.</li>
          </ul>
      
          <p><strong>Following are some real-time applications for AVL tree data structure:</strong></p>
          <ul>
            <li>AVL trees are typically used for in-memory sets and dictionaries.</li>
            <li>AVL trees are also widely used in database applications where there are fewer insertions and deletions but frequent data lookups are required.</li>
            <li>Apart from database applications, it is used in applications that require improved searching.</li>
          </ul>
        `,
      },
      {
        q: "What is a B-tree data structure? What are the applications for B-trees?",
        a: `
          <p>The B Tree is a type of m-way tree that is commonly used for disc access. A B-Tree with order m can only have m-1 keys and m children. One of the primary reasons for using a B tree is its ability to store a large number of keys in a single node as well as large key values while keeping the tree's height relatively small.</p>
      
          <p><strong>Following are the key properties of a B-tree data structure:</strong></p>
          <ul>
            <li>All of the leaves are at the same height.</li>
            <li>The term minimum degree 't' describes a B-Tree. The value of t is determined by the size of the disc block.</li>
            <li>Except for root, every node must have at least t-1 keys. The root must contain at least one key.</li>
            <li>All nodes (including root) can have no more than 2*t - 1 keys.</li>
            <li>The number of children of a node is equal to its key count plus one.</li>
            <li>A node's keys are sorted in ascending order. The child of two keys k1 and k2 contains all keys between k1 and k2.</li>
            <li>In contrast to Binary Search Tree, B-Tree grows and shrinks from the root.</li>
          </ul>
      
          <p><strong>Following are real-time applications of a B-Tree data structure:</strong></p>
          <ul>
            <li>It is used to access data stored on discs in large databases.</li>
            <li>Using a B tree, you can search for data in a data set in significantly less time.</li>
            <li>The indexing feature allows for multilevel indexing.</li>
            <li>The B-tree approach is also used by the majority of servers.</li>
          </ul>
        `,
      },
      {
        q: "Define Segment Tree data structure and its applications.",
        a: `
          <p>A segment Tree is a binary tree that is used to store intervals or segments. The Segment Tree is made up of nodes that represent intervals. Segment Tree is used when there are multiple range queries on an array and changes to array elements.</p>
      
          <p><strong>Following are key operations performed on the Segment tree data structure:</strong></p>
          <ul>
            <li><strong>Building Tree:</strong> In this step, we create the structure and initialize the segment tree variable.</li>
            <li><strong>Updating the Tree:</strong> In this step, we change the tree by updating the array value at a point or over an interval.</li>
            <li><strong>Querying Tree:</strong> This operation can be used to run a range query on the array.</li>
          </ul>
      
          <p><strong>Following are real-time applications for Segment Tree:</strong></p>
          <ul>
            <li>Used to efficiently list all pairs of intersecting rectangles from a list of rectangles in the plane.</li>
            <li>The segment tree has become popular for use in pattern recognition and image processing.</li>
            <li>Finding range sum/product, range max/min, prefix sum/product, etc.</li>
            <li>Computational geometry</li>
            <li>Geographic information systems</li>
            <li>Static and Dynamic RMQ (Range Minimum Query)</li>
            <li>Storing segments in an arbitrary manner</li>
          </ul>
        `,
      },
      {
        q: "Define Trie data structure and its applications",
        a: `
          <p>The word "Trie" is an abbreviation for "retrieval." Trie is a data structure that stores a set of strings as a sorted tree. Each node has the same number of pointers as the number of alphabet characters. It can look up a word in the dictionary by using its prefix. Assuming that all strings are formed from the letters 'a' to 'z' in the English alphabet, each trie node can have a maximum of 26 points.</p>
      
          <p>Trie is also referred to as the digital tree or the prefix tree. The key to which a node is connected is determined by its position in the Trie. Trie allows us to insert and find strings in O(L) time, where L is the length of a single word. This is clearly faster than BST. Because of how it is implemented, this is also faster than Hashing. There is no need to compute a hash function. There is no need to handle collisions (like we do in open addressing and separate chaining).</p>
      
          <p>Another benefit of Trie is that we can easily print all words in alphabetical order, which is not easy with hashing. Trie can also perform prefix search (or auto-complete) efficiently.</p>
      
          <p>The main disadvantage of tries is that they require a large amount of memory to store the strings. We have an excessive number of node pointers for each node.</p>
      
          <p><strong>Following are some real-time applications for Trie data structure:</strong></p>
          <ul>
            <li>Auto-Complete and Search for Search Engines</li>
            <li>Genome Analysis</li>
            <li>Data Analytics</li>
            <li>Browser History</li>
            <li>Spell Checker</li>
          </ul>
        `,
      },
      {
        q: "Define Red-Black Tree and its applications",
        a: `
          <p>Red Black Trees are a type of self-balancing binary search tree. Rudolf Bayer invented it in 1972 and dubbed it "symmetric binary B-trees."</p>
      
          <p>A red-black tree is a Binary tree in which each node has a colour attribute, either red or black. By comparing the node colours on any simple path from the root to a leaf, red-black trees ensure that no path is more than twice as long as any other, ensuring that the tree is generally balanced.</p>
      
          <p>Red-black trees are similar to binary trees in that they both store their data in two's complementary binary formats. However, red-black trees have one important advantage over binary trees: they are faster to access. Because red-black trees are so fast to access, they are often used to store large amounts of data.</p>
      
          <p>Red-black trees can be used to store any type of data that can be represented as a set of values.</p>
      
          <p><strong>Every Red-Black Tree Obeys the Following Rules:</strong></p>
          <ul>
            <li>Every node is either red or black.</li>
            <li>The tree's root is always black.</li>
            <li>There are no two red nodes that are adjacent.</li>
            <li>There is the same number of black nodes on every path from a node to any of its descendant's NULL nodes.</li>
            <li>All of the leaf nodes are black.</li>
          </ul>
      
          <p><strong>Following are some real-time applications for the Red-Black Tree data structure:</strong></p>
          <ul>
            <li>The majority of self-balancing BST library functions in C++ or Java use Red-Black Trees.</li>
            <li>It is used to implement Linux CPU Scheduling.</li>
            <li>It is also used to reduce time complexity in the K-mean clustering algorithm in machine learning.</li>
            <li>MySQL also employs the Red-Black tree for table indexes in order to reduce searching and insertion time.</li>
          </ul>
        `,
      },
      {
        q: "Which data structures are used for implementing LRU cache?",
        a: `
          <p>LRU cache or Least Recently Used cache allows quick identification of an element that hasn’t been put to use for the longest time by organizing items in order of use. In order to achieve this, two data structures are used:</p>
      
          <ul>
            <li><strong>Queue:</strong> This is implemented using a doubly-linked list. The maximum size of the queue is determined by the cache size, i.e., by the total number of available frames. The least recently used pages will be near the front end of the queue whereas the most recently used pages will be towards the rear end of the queue.</li>
            <li><strong>Hashmap:</strong> Hashmap stores the page number as the key along with the address of the corresponding queue node as the value.</li>
          </ul>
        `,
      },
      {
        q: "What is a heap data structure?",
        a: `
          <p>Heap is a special tree-based non-linear data structure in which the tree is a complete binary tree. A binary tree is said to be complete if all levels are completely filled except possibly the last level and the last level has all elements as left as possible.</p>
      
          <p><strong>Heaps are of two types:</strong></p>
      
          <p><strong>Max-Heap:</strong><br>
          In a Max-Heap the data element present at the root node must be the greatest among all the data elements present in the tree.<br>
          This property should be recursively true for all sub-trees of that binary tree.</p>
      
          <p><strong>Min-Heap:</strong><br>
          In a Min-Heap the data element present at the root node must be the smallest (or minimum) among all the data elements present in the tree.<br>
          This property should be recursively true for all sub-trees of that binary tree.</p>
        `,
      },
    ],
  },

  cn: {
    title: "Computer Networks",
    questions: [
      {
        q: "What is an IPv4 address? What are the different classes of IPv4?",
        a: `
          <p>An <strong>IPv4 address</strong> is a 32-bit unique address assigned to devices connected to a network. It is divided into four 8-bit octets, making a total of 4 numbers separated by dots. Each octet can have a value between <strong>0 and 255</strong>.</p>
      
          <p>IPv4 addresses are categorized into five <strong>classes</strong> based on the number of hosts they can support. These classes are defined by the range of the first octet:</p>
      
          <table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;">
            <thead >
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">IPv4 Class</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Start Address</th>
                <th style="border: 1px solid #ccc; padding: 8px;">End Address</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class A</td>
                <td style="border: 1px solid #ccc; padding: 8px;">0.0.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">127.255.255.255</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Used for Large Networks</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class B</td>
                <td style="border: 1px solid #ccc; padding: 8px;">128.0.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">191.255.255.255</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Used for Medium-Sized Networks</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class C</td>
                <td style="border: 1px solid #ccc; padding: 8px;">192.0.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">223.255.255.255</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Used for Local Area Networks (LAN)</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class D</td>
                <td style="border: 1px solid #ccc; padding: 8px;">224.0.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">239.255.255.255</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Reserved for Multicasting</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class E</td>
                <td style="border: 1px solid #ccc; padding: 8px;">240.0.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">255.255.255.254</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Experimental, Research & Development</td>
              </tr>
            </tbody>
          </table>
        `,
      },

      {
        q: "Explain different types of networks.",
        a: `
          <p>There are several types of computer networks categorized based on their coverage area and use case:</p>
      
          <table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;">
            <thead >
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">Type</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">PAN (Personal Area Network)</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  Enables devices to connect and communicate over a short range (typically within a few meters).<br />
                  <strong>Example:</strong> Bluetooth connection between phone and headset.
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">LAN (Local Area Network)</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  A privately owned network used within a limited area such as a home, office, or school.<br />
                  <strong>Example:</strong> Office network.
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">MAN (Metropolitan Area Network)</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  A network that spans across a city or campus using public or private infrastructure.<br />
                  <strong>Example:</strong> City-wide cable TV network.
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">WAN (Wide Area Network)</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  Covers large geographical areas, connecting multiple LANs and MANs.<br />
                  <strong>Example:</strong> The Internet.
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">GAN (Global Area Network)</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  A global network composed of interconnected WANs, often using satellite communication.<br />
                  <strong>Example:</strong> The Internet (on a global scale).
                </td>
              </tr>
            </tbody>
          </table>
        `,
      },

      {
        q: "Explain LAN (Local Area Network).",
        a: `
          <p><strong>LAN (Local Area Network)</strong> is widely used to connect computers and electronic devices within a limited area such as a home, office, or school.</p>
          <p>It enables devices to share resources like printers and exchange data efficiently.</p>
          
          <p>LANs used by companies or organizations are often called <strong>enterprise networks</strong>.</p>
          
          <p><strong>Types of LANs:</strong></p>
          <ul>
            <li><strong>Wired LAN:</strong> Devices are connected using LAN cables.</li>
            <li><strong>Wireless LAN (WLAN):</strong> Devices are connected over Wi-Fi without wires.</li>
          </ul>
      
          <p>Wireless LANs are popular in areas where cable installation is difficult or unnecessary.</p>
          <p><em>(You may insert diagrams of wired vs wireless LANs here.)</em></p>
        `,
      },
      {
        q: "Tell me something about VPN (Virtual Private Network)",
        a: `
          <p><strong>VPN (Virtual Private Network)</strong> is a private network that operates over a public network like the Internet.</p>
          <p>It enables users to create a secure and encrypted connection (known as a <strong>tunnel</strong>) between remote networks or devices.</p>
          <p>VPNs are commonly used to allow employees to connect securely to their organization's internal network from remote locations.</p>
          
          <p><strong>Key Benefits:</strong></p>
          <ul>
            <li>Provides privacy and anonymity by masking IP addresses.</li>
            <li>Secures data transmission over unsecured public networks.</li>
            <li>Allows access to region-restricted services and content.</li>
            <li>Useful for remote work and accessing corporate resources securely.</li>
          </ul>
        `,
      },
      {
        q: "What are the advantages of using a VPN?",
        a: `
          <p>Using a <strong>VPN (Virtual Private Network)</strong> provides several benefits for both individuals and organizations:</p>
          
          <ul>
            <li>It enables remote offices in different geographic locations to connect securely at a lower cost compared to dedicated WAN infrastructure.</li>
            <li>VPNs facilitate secure transactions and the transfer of confidential data between distributed offices.</li>
            <li>They safeguard an organization’s sensitive information against threats or intrusions by using virtualized private networks.</li>
            <li>VPNs encrypt internet traffic and help disguise a user’s online identity, ensuring privacy and protection from tracking or surveillance.</li>
          </ul>
        `,
      },
      {
        q: "What are the different types of VPN?",
        a: `
          <p>There are two primary types of <strong>VPNs (Virtual Private Networks)</strong> based on usage:</p>
      
          <h6>1. Access VPN</h6>
          <p>Used to connect remote users, mobile users, or telecommuters to an enterprise network securely over the internet.</p>
          <ul>
            <li>Alternative to dial-up or ISDN connections</li>
            <li>Low-cost and flexible</li>
            <li>Enables secure access to corporate resources</li>
          </ul>
      
          <h6>2. Site-to-Site VPN (Router-to-Router VPN)</h6>
          <p>Used to connect networks of two different offices over the internet.</p>
          <p>Subtypes of Site-to-Site VPN include:</p>
      
          <ul>
            <li><strong>Intranet VPN:</strong> Connects remote offices using shared internet infrastructure while maintaining internal access policies like a private WAN.</li>
            <li><strong>Extranet VPN:</strong> Connects external partners, suppliers, or customers using secure connections over the shared infrastructure (extranet).</li>
          </ul>
        `,
      },
      {
        q: "What are nodes and links?",
        a: `
          <p><strong>Node:</strong> Any communicating device in a network is called a node. It can send, receive, or forward information. Examples of nodes include computers, printers, servers, routers, and switches.</p>
      
          <p><strong>Link:</strong> A link is the communication path that connects two nodes in a network. It can be:</p>
          <ul>
            <li><strong>Wired</strong> – using physical cables like Ethernet</li>
            <li><strong>Wireless</strong> – using Wi-Fi, radio waves, or infrared</li>
          </ul>
          <p>The link defines how data is transferred between nodes, including the medium and communication protocols used.</p>
        `,
      },
      {
        q: "What is the network topology?",
        a: `
          <p><strong>Network topology</strong> refers to the physical or logical layout of a network. It defines how various devices (nodes) are connected using communication links (wires, wireless, or both).</p>
          <p>It helps determine how data flows and how the network can be expanded or troubleshooted.</p>
        `,
      },
      {
        q: "Define different types of network topology",
        a: `
          <p>The different types of network topology include:</p>
      
          <h6>1. Bus Topology</h6>
          <ul>
            <li>All nodes are connected to a single central cable (the bus).</li>
            <li>Cost-effective for small networks.</li>
            <li>Failure of the main bus leads to complete network failure.</li>
          </ul>
      
          <h6>2. Star Topology</h6>
          <ul>
            <li>All nodes are connected to a central hub or switch.</li>
            <li>Easy to troubleshoot and manage.</li>
            <li>If the central node fails, the entire network fails.</li>
            <li>Commonly used in home and office environments.</li>
          </ul>
      
          <h6>3. Ring Topology</h6>
          <ul>
            <li>Each node connects to exactly two other nodes, forming a closed loop (ring).</li>
            <li>Failure of a single node can impact the entire network.</li>
            <li>Rarely used due to complexity and cost.</li>
          </ul>
      
          <h6>4. Mesh Topology</h6>
          <ul>
            <li>Every node may be connected to every other node.</li>
            <li>Highly robust — failure in one link doesn’t affect the entire network.</li>
            <li>Installation is complex and expensive.</li>
          </ul>
      
          <h6>5. Tree Topology</h6>
          <ul>
            <li>Hierarchical combination of star and bus topology.</li>
            <li>Used for scalable networks (e.g., ISPs).</li>
            <li>Failure of the main bus impacts the entire network.</li>
          </ul>
      
          <h6>6. Hybrid Topology</h6>
          <ul>
            <li>Combines two or more different topologies.</li>
            <li>Flexible and efficient, tailored to specific network requirements.</li>
          </ul>
        `,
      },
      {
        q: "How are Network types classified?",
        a: `
          <p>Network types are classified based on the geographical area they cover:</p>
          <ul>
            <li><strong>PAN</strong> – Personal Area Network (e.g., Bluetooth)</li>
            <li><strong>LAN</strong> – Local Area Network (e.g., Office network)</li>
            <li><strong>MAN</strong> – Metropolitan Area Network (e.g., City-wide cable network)</li>
            <li><strong>WAN</strong> – Wide Area Network (e.g., Internet)</li>
            <li><strong>GAN</strong> – Global Area Network (Satellite communication)</li>
          </ul>
        `,
      },
      {
        q: "What are Private and Special IP addresses?",
        a: `
          <h6>Private IP Addresses</h6>
          <p>Private IP addresses are reserved for internal use within a local network (LAN) and cannot be routed over the internet. These IPs are commonly used for home routers, local servers, and internal devices.</p>
      
          <table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;">
            <thead >
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">IPv4 Class</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Start Address</th>
                <th style="border: 1px solid #ccc; padding: 8px;">End Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class A</td>
                <td style="border: 1px solid #ccc; padding: 8px;">10.0.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">10.255.255.255</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class B</td>
                <td style="border: 1px solid #ccc; padding: 8px;">172.16.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">172.31.255.255</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Class C</td>
                <td style="border: 1px solid #ccc; padding: 8px;">192.168.0.0</td>
                <td style="border: 1px solid #ccc; padding: 8px;">192.168.255.255</td>
              </tr>
            </tbody>
          </table>
      
          <h6 style="margin-top: 20px;">Special IP Addresses</h6>
          <p>
            The IP range <strong>127.0.0.1 to 127.255.255.255</strong> is reserved for <em>loopback addresses</em>, commonly used for testing and diagnostics.
            These are referred to as <strong>special IP addresses</strong> and always point back to the local host (localhost).
          </p>
        `,
      },

      {
        q: "What is the DNS?",
        a: `
          <p><strong>DNS (Domain Name System)</strong> is a decentralized and hierarchical system used to resolve human-readable domain names into IP addresses.</p>
          <p>For example, when a user types <code>interviewbit.com</code>, the DNS server translates it to its corresponding IP address <code>172.217.166.36</code>.</p>
          <p>DNS acts like the phonebook of the internet and uses <strong>port 53</strong> by default.</p>
        `,
      },
      {
        q: "What is the use of a router and how is it different from a gateway?",
        a: `
          <p>A <strong>router</strong> is a networking device that connects two or more network segments and directs network traffic by forwarding data packets between networks.</p>
          <p>It operates at the <strong>network layer (Layer 3)</strong> of the OSI model and is responsible for transferring web pages, emails, images, and more from source to destination.</p>
      
          <p>A <strong>gateway</strong> also routes network traffic, but unlike a router, it is capable of connecting and translating communication between <strong>dissimilar networks</strong> (e.g., between TCP/IP and another protocol).</p>
      
          <p><strong>Key Difference:</strong></p>
          <ul>
            <li>Routers work between similar networks and focus on forwarding IP packets.</li>
            <li>Gateways connect dissimilar networks and perform protocol conversions.</li>
          </ul>
        `,
      },
      {
        q: "What is the SMTP protocol?",
        a: `
          <p><strong>SMTP (Simple Mail Transfer Protocol)</strong> is an application layer protocol used to transfer emails between servers over the internet.</p>
          <p>It sets rules for email transmission and supports both:</p>
          <ul>
            <li><strong>End-to-End</strong> delivery – from sender to receiver</li>
            <li><strong>Store-and-Forward</strong> – intermediate storage until successful delivery</li>
          </ul>
      
          <p>SMTP continuously listens for incoming mail requests on <strong>port 25</strong> by default.</p>
        `,
      },
      {
        q: "Describe the OSI Reference Model",
        a: `
          <p>The <strong>OSI (Open Systems Interconnection) Reference Model</strong> is a conceptual framework developed by the ISO (International Organization for Standardization) to standardize the functions of a telecommunication or computing system into seven distinct layers.</p>
      
          <p>The OSI model ensures systems can communicate using globally recognized protocols and provides a modular approach to network design.</p>
      
          <p><strong>Design Principles of the OSI Model:</strong></p>
          <ul>
            <li>Create a new layer only when a different level of abstraction is needed.</li>
            <li>Each layer should have a clearly defined function.</li>
            <li>Functions of each layer should be chosen based on internationally standardized protocols.</li>
          </ul>
      
          <p>The OSI model helps in troubleshooting, protocol development, and designing interoperable network systems.</p>
        `,
      },
      {
        q: "Define the 7 different layers of the OSI Reference Model",
        a: `
          <p>The OSI model has 7 layers, each serving a distinct function in the network communication process:</p>
      
          <table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;">
            <thead >
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">Layer</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Unit Exchanged</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Physical</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">Bit</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Transmits raw bits over a communication channel.</li>
                    <li>Selects the transmission mode: Simplex, Half Duplex, or Full Duplex.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Data Link</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">Frame</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Transforms raw transmission into a reliable link.</li>
                    <li>Detects damaged packets using CRC.</li>
                    <li>Manages access using CSMA/CD, CSMA/CA, ALOHA, Token Passing.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Network</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">Packet</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Controls subnet operations.</li>
                    <li>Handles routing and ICMP error messaging.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Transport</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">TPDU</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Manages segmentation and reassembly of data.</li>
                    <li>Ensures reliable data delivery.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Session</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">SPDU</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Establishes and manages sessions between systems.</li>
                    <li>Controls full-duplex/half-duplex communication.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Presentation</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">PPDU</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Handles data encoding, encryption, and compression.</li>
                    <li>Ensures proper data formatting across systems.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Application</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">APDU</td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul>
                    <li>Provides services like HTTP, FTP, SMTP, DNS to end-users.</li>
                    <li>Interfaces directly with user applications.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        `,
      },

      {
        q: "Describe the TCP/IP Reference Model",
        a: `
          <p>The <strong>TCP/IP Reference Model</strong> is a simplified version of the OSI model consisting of just <strong>4 layers</strong>.</p>
          <p>It was developed by the <strong>U.S. Department of Defense (DoD)</strong> in the 1980s to enable reliable communication across diverse networks.</p>
          <p>The model is named after its two main protocols: <strong>TCP (Transmission Control Protocol)</strong> and <strong>IP (Internet Protocol)</strong>.</p>
          <p>It serves as the foundation for the modern Internet and emphasizes protocol-driven development.</p>
        `,
      },
      {
        q: "Define the 4 different layers of the TCP/IP Reference Model",
        a: `
          <p>The TCP/IP model consists of 4 layers, each with its own specific role in managing data transmission across networks:</p>
      
          <table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;">
            <thead >
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">Layer</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Link</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  Determines the hardware link technology (e.g., Ethernet, Wi-Fi) used for communication over a physical medium.
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Internet</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  <ul style="margin: 0; padding-left: 20px;">
                    <li>Handles IP addressing and packet routing.</li>
                    <li>Delivers packets to the appropriate destination.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Transport</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  Provides reliable or unreliable delivery of data using protocols like TCP and UDP. Enables host-to-host communication.
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;"><strong>Application</strong></td>
                <td style="border: 1px solid #ccc; padding: 8px;">
                  Provides network services directly to end-user applications (e.g., HTTP, FTP, SMTP, DNS).
                </td>
              </tr>
            </tbody>
          </table>
        `,
      },
      {
        q: "Differentiate OSI Reference Model with TCP/IP Reference Model",
        a: `
          <p>The OSI and TCP/IP models are both layered frameworks for understanding network protocols, but they differ in architecture, layering, and reliability:</p>
      
          <table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;">
            <thead >
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">OSI Reference Model</th>
                <th style="border: 1px solid #ccc; padding: 8px;">TCP/IP Reference Model</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">7 layered architecture</td>
                <td style="border: 1px solid #ccc; padding: 8px;">4 layered architecture</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Fixed boundaries and functionality for each layer</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Flexible architecture with no strict boundaries between layers</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Low Reliability</td>
                <td style="border: 1px solid #ccc; padding: 8px;">High Reliability</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">Vertical Layer Approach</td>
                <td style="border: 1px solid #ccc; padding: 8px;">Horizontal Layer Approach</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      {
        q: "What are the HTTP and the HTTPS protocol?",
        a: `
          <p><strong>HTTP (HyperText Transfer Protocol)</strong> is a communication protocol used by web browsers and servers to transfer data over the World Wide Web (WWW).</p>
          <ul>
            <li>It is a <strong>stateless</strong> protocol — each request is treated as independent.</li>
            <li>Operates at the <strong>application layer</strong> over TCP.</li>
            <li>Uses <strong>port 80</strong> by default.</li>
            <li>Data is transmitted in plain text, making it vulnerable to eavesdropping.</li>
          </ul>
      
          <p><strong>HTTPS (HyperText Transfer Protocol Secure)</strong> is the secure version of HTTP.</p>
          <ul>
            <li>It uses <strong>SSL/TLS</strong> encryption on top of HTTP for secure communication.</li>
            <li>Provides data confidentiality, integrity, and server authentication.</li>
            <li>Used for sensitive transactions like login, payment, etc.</li>
            <li>Uses <strong>port 443</strong> by default.</li>
          </ul>
        `,
      },
      {
        q: "What is the FTP protocol?",
        a: `
          <p><strong>FTP (File Transfer Protocol)</strong> is an application layer protocol used to transfer files and data reliably and efficiently between hosts.</p>
          <p>It allows users to upload or download files from a remote server to their computer.</p>
          <p>FTP commonly uses <strong>port 21</strong> (Note: not port 27) and supports both <strong>active</strong> and <strong>passive</strong> modes for communication.</p>
        `,
      },
      {
        q: "What is the TCP protocol?",
        a: `
          <p><strong>TCP (Transmission Control Protocol)</strong> is a core protocol of the Internet Protocol Suite.</p>
          <p>It ensures reliable and ordered delivery of data between applications over a network.</p>
          <p>TCP uses a <strong>three-way handshake</strong> to establish a connection and supports features like error-checking, flow control, and congestion control.</p>
        `,
      },
      {
        q: "What is the UDP protocol?",
        a: `
          <p><strong>UDP (User Datagram Protocol)</strong> is a connectionless transport layer protocol.</p>
          <p>It is used for fast, efficient transmission without establishing a connection or ensuring delivery, making it less reliable than TCP.</p>
          <p>UDP is commonly used for <strong>multicasting, broadcasting, live streaming, and gaming</strong>, where speed is more critical than reliability.</p>
        `,
      },
      {
        q: "Compare between TCP and UDP",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-top: 10px;">
              <thead>
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>TCP/IP</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>UDP</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Connection-Oriented Protocol</td>
                  <td style="border: 1px solid #999; padding: 10px;">Connectionless Protocol</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">More Reliable</td>
                  <td style="border: 1px solid #999; padding: 10px;">Less Reliable</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Slower Transmission</td>
                  <td style="border: 1px solid #999; padding: 10px;">Faster Transmission</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Packets order can be preserved or rearranged</td>
                  <td style="border: 1px solid #999; padding: 10px;">Packets order is not fixed and are independent</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Uses three-way handshake model for connection</td>
                  <td style="border: 1px solid #999; padding: 10px;">No handshake for establishing connection</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">TCP packets are heavy-weight</td>
                  <td style="border: 1px solid #999; padding: 10px;">UDP packets are light-weight</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Offers error checking mechanism</td>
                  <td style="border: 1px solid #999; padding: 10px;">No error checking mechanism</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Used by protocols like HTTP, FTP, Telnet, SMTP, HTTPS, etc.</td>
                  <td style="border: 1px solid #999; padding: 10px;">Used by protocols like DNS, RIP, SNMP, RTP, BOOTP, TFTP, NIP, etc.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "What is the ICMP protocol?",
        a: `
          <p>ICMP is the Internet Control Message Protocol. It is a network layer protocol used for error handling. It is mainly used by network devices like routers for diagnosing the network connection issues and crucial for error reporting and testing if the data is reaching the preferred destination in time. It uses port 7 by default.</p>
        `,
      },
      {
        q: "What do you mean by the DHCP Protocol?",
        a: `
          <p>DHCP is the Dynamic Host Configuration Protocol.<br><br>
          It is an application layer protocol used to auto-configure devices on IP networks enabling them to use the TCP and UDP-based protocols. The DHCP servers auto-assign the IPs and other network configurations to the devices individually which enables them to communicate over the IP network. It helps to get the subnet mask, IP address and helps to resolve the DNS. It uses port 67 by default.</p>
        `,
      },
      {
        q: "What is the ARP protocol?",
        a: `
          <p>ARP is Address Resolution Protocol. It is a network-level protocol used to convert the logical address i.e. IP address to the device's physical address i.e. MAC address. It can also be used to get the MAC address of devices when they are trying to communicate over the local network.</p>
        `,
      },
      {
        q: "What is the MAC address and how is it related to NIC?",
        a: `
          <p>MAC address is the Media Access Control address. It is a 48-bit or 64-bit unique identifier of devices in the network. It is also called the physical address embedded with Network Interface Card (NIC) used at the Data Link Layer. NIC is a hardware component in the networking device using which a device can connect to the network.</p>
        `,
      },
      {
        q: "Differentiate the MAC address with the IP address",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-top: 10px;">
              <thead>
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>MAC Address</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>IP Address</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Media Access Control Address</td>
                  <td style="border: 1px solid #999; padding: 10px;">Internet Protocol Address</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">6 or 8-byte hexadecimal number</td>
                  <td style="border: 1px solid #999; padding: 10px;">4 (IPv4) or 16 (IPv6) Byte address</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">It is embedded with NIC</td>
                  <td style="border: 1px solid #999; padding: 10px;">It is obtained from the network</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Physical Address</td>
                  <td style="border: 1px solid #999; padding: 10px;">Logical Address</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Operates at Data Link Layer</td>
                  <td style="border: 1px solid #999; padding: 10px;">Operates at Network Layer</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Helps to identify the device</td>
                  <td style="border: 1px solid #999; padding: 10px;">Helps to identify the device connectivity on the network</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },

      {
        q: "What is a subnet?",
        a: `
          <p>A subnet is a network inside a network achieved by the process called subnetting which helps divide a network into subnets. It is used for getting a higher routing efficiency and enhances the security of the network. It reduces the time to extract the host address from the routing table.</p>
        `,
      },
      {
        q: "Compare the hub vs switch",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-top: 10px;">
              <thead >
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Hub</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>Switch</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Operates at Physical Layer</td>
                  <td style="border: 1px solid #999; padding: 10px;">Operates at Data Link Layer</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Half-Duplex transmission mode</td>
                  <td style="border: 1px solid #999; padding: 10px;">Full-Duplex transmission mode</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Ethernet devices can be connected/send</td>
                  <td style="border: 1px solid #999; padding: 10px;">LAN devices can be connected</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Less complex, less intelligent, and cheaper</td>
                  <td style="border: 1px solid #999; padding: 10px;">Intelligent and effective</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">No software support for the administration</td>
                  <td style="border: 1px solid #999; padding: 10px;">Administration software support is present</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Less speed up to 100 MBPS</td>
                  <td style="border: 1px solid #999; padding: 10px;">Supports high speed in GBPS</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Less efficient as there is no way to avoid collisions when more than one node sends the packets at the same time</td>
                  <td style="border: 1px solid #999; padding: 10px;">More efficient as the collisions can be avoided or reduced as compared to Hub</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "What is the difference between the ipconfig and the ifconfig?",
        a: `
          <div style="overflow-x: auto;">
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-top: 10px;">
              <thead >
                <tr>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>ipconfig</strong></th>
                  <th style="border: 1px solid #999; padding: 10px;"><strong>ifconfig</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Internet Protocol Configuration</td>
                  <td style="border: 1px solid #999; padding: 10px;">Interface Configuration</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #999; padding: 10px;">Command used in Microsoft operating systems to view and configure network interfaces</td>
                  <td style="border: 1px solid #999; padding: 10px;">Command used in MAC, Linux, UNIX operating systems to view and configure network interfaces</td>
                </tr>
                <tr>
                  <td colspan="2" style="border: 1px solid #999; padding: 10px; text-align: center;">
                    Used to get the TCP/IP summary and allows to change the DHCP and DNS settings
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        q: "What is the firewall?",
        a: `
          <p>The firewall is a network security system that is used to monitor the incoming and outgoing traffic and blocks the same based on the firewall security policies. It acts as a wall between the internet (public network) and the networking devices (a private network). It is either a hardware device, software program, or a combination of both. It adds a layer of security to the network.</p>
        `,
      },
      {
        q: "What are Unicasting, Anycasting, Multicasting and Broadcasting?",
        a: `
          <p><strong>Unicasting:</strong> If the message is sent to a single node from the source then it is known as unicasting. This is commonly used in networks to establish a new connection.</p>
          <p><strong>Anycasting:</strong> If the message is sent to any of the nodes from the source then it is known as anycasting. It is mainly used to get the content from any of the servers in the Content Delivery System.</p>
          <p><strong>Multicasting:</strong> If the message is sent to a subset of nodes from the source then it is known as multicasting. Used to send the same data to multiple receivers.</p>
          <p><strong>Broadcasting:</strong> If the message is sent to all the nodes in a network from a source then it is known as broadcasting. DHCP and ARP in the local network use broadcasting.</p>
        `,
      },
      {
        q: "What happens when you enter google.com in the web browser?",
        a: `
          <p>Below are the steps that are followed when you enter <strong>google.com</strong> in the web browser:</p>
          <ul>
            <li>Check the browser cache first. If the content is fresh and present in cache, display the same.</li>
            <li>If not, the browser checks if the IP of the URL is present in the cache (browser and OS). If not found, it requests the OS to do a DNS lookup using UDP to get the corresponding IP address from the DNS server.</li>
            <li>A new TCP connection is set up between the browser and the server using three-way handshaking.</li>
            <li>An HTTP request is sent to the server using the TCP connection.</li>
            <li>The web server processes the incoming HTTP request and sends the HTTP response.</li>
            <li>The browser processes the HTTP response and may close or reuse the TCP connection for future requests.</li>
            <li>If the response data is cacheable, the browser caches the same.</li>
            <li>Finally, the browser decodes the response and renders the content on the screen.</li>
          </ul>
        `,
      },
    ],
  },
};

const InterviewPrepPage = () => {
  const { topic } = useParams();
  const section = data[topic];

  return (
    <div className="interview-content">
      {section ? (
        <>
          <h2>{section.title} Interview Questions</h2>
          {section.questions.map((qna, index) => (
            <div key={index} className="question">
              <h3>
                {index + 1}. {qna.q}
              </h3>
              <p dangerouslySetInnerHTML={{ __html: qna.a }} />
            </div>
          ))}
        </>
      ) : (
        <div className="not-found">
          <h2>Topic Not Found</h2>
          <p>Please select a valid interview topic from the sidebar.</p>
        </div>
      )}
    </div>
  );
};

export default InterviewPrepPage;

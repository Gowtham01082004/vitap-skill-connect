import React from "react";
import { useParams } from "react-router-dom";
import "./InterviewPrepPage.css"; // style similar to your provided CSS

const data = {
  oop: {
    title: "Object-Oriented Programming",
    questions: [
      {
        q: "What is the need for OOPs?",
        a: "<p>Encapsulation, Inheritance, Polymorphism, Abstraction.</p>",
      },
      {
        q: "What are some major Object Oriented Programming languages?",
        a: "<p>Java, C++, JavaScript, Python, PHP, and many more that follow the OOP paradigm.</p>",
      },
      {
        q: "What are some other programming paradigms other than OOPs?",
        a: `<ul>
                  <li>Other paradigms include:</li>
                  <li>1. Imperative (includes Procedural, OOP, Parallel Programming)</li>
                  <li>2. Declarative (includes Logical, Functional, and Database Programming)</li>
                </ul>`,
      },
      {
        q: "What is meant by Structured Programming?",
        a: "<p>Structured Programming emphasizes a clear, linear flow using constructs like if/else, loops, and subroutines.</p>",
      },
      {
        q: "What are the main features of OOPs?",
        a: "<p>Encapsulation, Inheritance, Polymorphism, Abstraction.</p>",
      },
      {
        q: "What are some advantages of using OOPs?",
        a: "<p>It promotes code reuse, hides implementation details, supports large systems, and simplifies maintenance.</p>",
      },
      {
        q: "Why is OOPs so popular?",
        a: "<p>Due to its ability to handle complexity via encapsulation, inheritance, and reusability.</p>",
      },
      {
        q: "What is meant by the term OOPs?",
        a: "<p>OOPs refers to Object-Oriented Programming – organizing code into reusable objects.</p>",
      },
      {
        q: "What are access specifiers and what is their significance?",
        a: "<p>They control visibility and encapsulation (e.g., public, private, protected).</p>",
      },
      {
        q: "Are there any limitations of Inheritance?",
        a: "<p>Yes. Tight coupling and complexity in changes across parent-child class relationships.</p>",
      },
      {
        q: "What are the various types of inheritance?",
        a: "<p>Single, Multiple, Multi-level, Hierarchical, and Hybrid inheritance.</p>",
      },
      {
        q: "What is a subclass?",
        a: "<p>A subclass is a child class that inherits features from a superclass.</p>",
      },
      {
        q: "Define a superclass?",
        a: "<p>A superclass is a parent class that allows inheritance by child classes.</p>",
      },
      {
        q: "What is an interface?",
        a: "<p>An interface is a contract with method declarations and no implementation.</p>",
      },
      {
        q: "What is meant by static polymorphism?",
        a: "<p>Compile-time polymorphism achieved via method overloading or operator overloading.</p>",
      },
      {
        q: "What is meant by dynamic polymorphism?",
        a: "<p>Runtime polymorphism achieved through method overriding.</p>",
      },
      {
        q: "What is the difference between overloading and overriding?",
        a: "<p>Overloading: same method name, different parameters. Overriding: same signature, redefined in child class.</p>",
      },
      {
        q: "How is data abstraction accomplished?",
        a: "<p>Via abstract classes and interfaces hiding implementation details.</p>",
      },
      {
        q: "What is an abstract class?",
        a: "<p>A class with abstract (unimplemented) and concrete methods used as a base class.</p>",
      },
      {
        q: "How is an abstract class different from an interface?",
        a: "<p>Interfaces only declare methods, while abstract classes can implement some methods.</p>",
      },
      {
        q: "Explain Inheritance with an example.",
        a: "<p>Vehicles like car, truck, and bus share features (steering, brakes) via inheritance from a common class.</p>",
      },
      {
        q: "What is an exception?",
        a: "<p>An exception is a runtime error disrupting normal flow.</p>",
      },
      {
        q: "What is meant by exception handling?",
        a: "<p>Mechanism using try-catch blocks to gracefully handle runtime errors.</p>",
      },
      {
        q: "What is meant by Garbage Collection in OOPs?",
        a: "<p>Automatic memory management to clean unused objects, avoiding memory leaks.</p>",
      },
      {
        q: "Can we run a Java application without implementing the OOPs concept?",
        a: "<p>No. Java is strictly OOP, unlike C++ which supports both OOP and procedural styles.</p>",
      },
      {
        q: "What is Compile time Polymorphism and how is it different from Runtime Polymorphism?",
        a: "<p>Compile-time: binding happens at compile time (method overloading). Runtime: resolved at runtime (method overriding).</p>",
      },
    ],
  },
  dbms: {
    title: "Database Management Systems",
    questions: [
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
        q: "What is the difference between array and linked list?",
        a: "Array: fixed size, contiguous. Linked list: dynamic size, non-contiguous.",
      },
      {
        q: "Explain time complexities of common operations in Binary Search Tree.",
        a: "Best case: O(log n), Worst case (skewed): O(n)",
      },
    ],
  },
};

const InterviewPrepPage = () => {
  const { topic } = useParams();
  const section = data[topic];

  if (!section)
    return <div className="interview-content">Topic not found.</div>;

  return (
    <div className="interview-content">
      <h2>{section.title} Interview Questions</h2>
      {section.questions.map((qna, index) => (
        <div key={index} className="question">
          <h3>
            {index + 1}. {qna.q}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: qna.a }} />
        </div>
      ))}
    </div>
  );
};

export default InterviewPrepPage;

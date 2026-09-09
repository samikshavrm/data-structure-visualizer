# 🧠 Data Structure Visualizer

<div align="center">

### Learn Data Structures by Seeing Them in Action

An interactive web application designed to make fundamental data structures easier to understand through **visual representations, interactive operations, complexity analysis, and implementation examples**.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge\&logo=framer\&logoColor=white)

</div>

---

## 📌 Overview

Data Structures are often taught using static diagrams and code examples. Understanding how a structure changes when an operation is performed can be difficult when you're only looking at theory.

**Data Structure Visualizer** aims to make these concepts more intuitive by allowing users to interact with different data structures and observe their behavior visually.

The application currently includes visualizers for:

* 📦 Arrays
* 🔗 Linked Lists
* 📚 Stacks
* 🚶 Queues
* 🌳 Trees
* 🕸️ Graphs

The visualizers also provide operation-specific complexity information and Java implementation examples.

---

## ✨ Features

### 📦 Array Visualizer

Visualize common array operations including:

* Add elements
* Insert at a specific index
* Remove elements
* Search for values
* View array indices and values
* View operation complexity
* View Java implementation

### 🔗 Linked List Visualizer

Explore linked-list concepts using a visual representation of nodes and their connections.

### 📚 Stack Visualizer

Understand the **LIFO (Last In, First Out)** principle through an interactive stack representation.

### 🚶 Queue Visualizer

Understand the **FIFO (First In, First Out)** principle through an interactive queue representation.

### 🌳 Tree Visualizer

Explore hierarchical data structures through an interactive tree visualization.

### 🕸️ Graph Visualizer

Interact with graph structures through:

* Adding nodes
* Removing nodes
* Adding edges
* Removing edges
* BFS traversal
* DFS traversal
* Complexity information
* Java implementation examples

### 💻 Code Examples

The visualizers include Java implementation examples to connect the visual representation with the underlying data-structure logic.

---

## 🧩 Data Structures

| Data Structure | Visualization | Concepts                            |
| -------------- | :-----------: | ----------------------------------- |
| Array          |       ✅       | Access, insertion, deletion, search |
| Linked List    |       ✅       | Nodes and connections               |
| Stack          |       ✅       | LIFO                                |
| Queue          |       ✅       | FIFO                                |
| Tree           |       ✅       | Hierarchical structure              |
| Graph          |       ✅       | Nodes, edges, BFS, DFS              |

---

## 🏗️ Architecture

```text
                    ┌───────────────────────┐
                    │       Next.js App     │
                    │       React 19        │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Data Structures Page │
                    │     Tab Navigation    │
                    └───────────┬───────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        ┌──────────┐      ┌────────────┐     ┌──────────┐
        │  Array   │      │Linked List │     │  Stack   │
        │Visualizer│      │ Visualizer │     │Visualizer│
        └────┬─────┘      └──────┬─────┘     └────┬─────┘
             │                   │                 │
             └───────────────────┼─────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        ┌──────────┐       ┌──────────┐       ┌──────────┐
        │  Queue   │       │   Tree   │       │  Graph   │
        │Visualizer│       │Visualizer│       │Visualizer│
        └────┬─────┘       └────┬─────┘       └────┬─────┘
             │                  │                  │
             └──────────────────┼──────────────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │    Code Display     │
                     │ Java Implementations │
                     └─────────────────────┘
```

---

## 🛠️ Tech Stack

### Core Technologies

| Technology        | Purpose                                   |
| ----------------- | ----------------------------------------- |
| **Next.js 15**    | React framework and application structure |
| **React 19**      | Component-based user interface            |
| **TypeScript**    | Type-safe development                     |
| **Tailwind CSS**  | Styling                                   |
| **Framer Motion** | Animations and transitions                |

### Supporting Libraries

* Radix UI
* Lucide React
* React Icons
* React Hook Form
* Recharts
* React Syntax Highlighter

---

## 📂 Project Structure

```text
data-structure-visualizer/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── data-structures/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── global-error.tsx
│   │
│   ├── components/
│   │   ├── data-structures/
│   │   │   ├── ArrayVisualizer.tsx
│   │   │   ├── LinkedListVisualizer.tsx
│   │   │   ├── StackVisualizer.tsx
│   │   │   ├── QueueVisualizer.tsx
│   │   │   ├── TreeVisualizer.tsx
│   │   │   ├── GraphVisualizer.tsx
│   │   │   └── CodeDisplay.tsx
│   │   │
│   │   ├── ui/
│   │   └── ErrorReporter.tsx
│   │
│   ├── hooks/
│   ├── lib/
│   └── visual-edits/
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── bun.lock
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* [Node.js](https://nodejs.org/) installed
* npm installed

### 1. Clone the repository

```bash
git clone https://github.com/samikshavrm/data-structure-visualizer.git
cd data-structure-visualizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Open:

```text
http://localhost:3000
```

---

## 🎮 Usage

1. Start the development server.
2. Open the application in your browser.
3. Navigate to the Data Structures section.
4. Select a data structure from the available tabs.
5. Perform the available operations.
6. Observe the resulting changes visually.
7. Use the code display where available to view the corresponding Java implementation.

---

## 📸 Screenshots

Screenshots will be added after the application is deployed and the final UI is captured.

### Main Interface

*Screenshot coming soon.*

### Array Visualizer

*Screenshot coming soon.*

### Graph Visualizer

*Screenshot coming soon.*

---

## 🎬 Demo

A demonstration GIF will be added after deployment.

```text
Demo coming soon...
```

---

## 🔮 Future Improvements

Potential future improvements include:

* Add more data structures and algorithms
* Add step-by-step algorithm execution
* Add playback controls for visualizations
* Improve animation and interaction feedback
* Add more implementation examples
* Add additional programming languages
* Add dedicated learning explanations
* Improve accessibility
* Add automated tests

> These are planned ideas and are not currently implemented features.

---

## 🤝 Contributing

Contributions are welcome.

If you would like to contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes, commit them, and open a Pull Request.

---

## 👩‍💻 Author

**Samiksha**

Computer Science & Engineering Student

[GitHub](https://github.com/samikshavrm)

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

**Built to make Data Structures more visual and intuitive.**

</div>

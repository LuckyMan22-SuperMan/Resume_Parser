// Interview Questions Database
const INTERVIEW_QUESTIONS = {
  "Python": [
    { q: "What are decorators in Python and how do you use them?", 
      a: "Decorators are functions that modify other functions or classes. They use the @ syntax and allow you to wrap a function in another function to extend its behavior without permanently modifying it." },
    { q: "Explain the difference between lists and tuples.", 
      a: "Lists are mutable (can be modified), while tuples are immutable (cannot be changed). Lists use square brackets [], tuples use parentheses (). Tuples are faster and can be used as dictionary keys." },
    { q: "What is a lambda function?", 
      a: "A lambda is a small anonymous function defined with the lambda keyword. It can take multiple arguments but only has one expression. Syntax: lambda arguments: expression" },
    { q: "How does garbage collection work in Python?", 
      a: "Python uses reference counting as its primary garbage collection method. When an object's reference count drops to zero, it's deallocated. Python also has a cyclic garbage collector for circular references." },
    { q: "What's the difference between *args and **kwargs?", 
      a: "*args allows you to pass variable-length positional arguments as a tuple, while **kwargs allows keyword arguments as a dictionary. Use *args for non-keyword arguments and **kwargs for keyword arguments." }
  ],
  "JavaScript": [
    { q: "What is hoisting in JavaScript?", a: "Hoisting moves declarations to the top of their scope. Variable and function declarations are hoisted, but initializations happen in place. var is hoisted with undefined, let/const are hoisted but not initialized." },
    { q: "Explain closures.", a: "A closure is a function that has access to variables from its outer scope even after the outer function has returned. They are created every time a function is created." },
    { q: "What's the difference between == and ===?", a: "== performs type coercion before comparison, while === compares both value and type without coercion. === is preferred as it's more predictable." },
    { q: "What is the event loop?", a: "The event loop continuously checks if there are tasks in the call stack and event queue. It moves tasks from the queue to the stack when the stack is empty, handling asynchronous operations." },
    { q: "What are Promises and async/await?", a: "Promises represent a value that may be available now, or in the future. async/await is syntactic sugar over Promises, making asynchronous code look synchronous." }
  ],
  "C++": [
    { q: "Define tokens in C++", 
      a: "A token is the smallest meaningful unit of a C++ program that the compiler recognizes during compilation. Every C++ program is made up of different types of tokens." },
    { q: "What are the different types of token?", 
      a: "Keywords, Identifiers, Constants, String literals, operators" },
    { q: "Define std", 
      a: "std is the standard namespace in C++ that contains identifiers provided by the C++ Standard Library, such as cout, cin, string, and vector. It helps organize library components and prevents naming conflicts." },
    { q: "What is the function of the keyword 'auto'?", 
      a: "The auto keyword allows the compiler to automatically deduce the data type of a variable from its initializer" }
  ],
  "React": [
    { q: "What is the Virtual DOM?", a: "The Virtual DOM is a lightweight copy of the real DOM. React uses it to optimize updates by diffing changes and only updating the parts that changed, improving performance." },
    { q: "What are React Hooks?", a: "Hooks are functions that let you use state and other React features in functional components. Common hooks: useState for state, useEffect for side effects, useContext for context." },
    { q: "Explain the component lifecycle.", a: "Class components have lifecycle methods: mounting (constructor, render, componentDidMount), updating (shouldComponentUpdate, render, componentDidUpdate), unmounting (componentWillUnmount)." },
    { q: "What's the difference between controlled and uncontrolled components?", a: "Controlled components have their state managed by React (value from state), while uncontrolled components manage their own state (using refs). Controlled components are preferred." },
    { q: "How does keys help in rendering lists?", a: "Keys help React identify which elements have changed. Using keys helps preserve component state across re-renders and improves performance when reordering lists." }
  ],
  "Java": [
    { q: "What is the difference between abstract classes and interfaces?", a: "Abstract classes can have state and constructors, interfaces cannot (mostly). Abstract classes use 'extends', interfaces use 'implements'. A class can implement multiple interfaces but extend only one class." },
    { q: "Explain JVM, JDK, and JRE.", a: "JVM (Java Virtual Machine) executes bytecode. JRE (Java Runtime Environment) = JVM + libraries. JDK (Java Development Kit) = JRE + development tools. You need JDK to develop, JRE to run." },
    { q: "What are generics?", a: "Generics allow you to write type-safe code by specifying types at compile time. Example: List<String> ensures the list only contains strings, preventing ClassCastException." },
    { q: "What is the difference between == and equals()?", a: "== compares object references (memory address), equals() compares object content. For strings and most objects, you should use equals()." },
    { q: "Explain try-catch-finally.", a: "try contains code that might throw exceptions, catch handles specific exceptions, finally always executes regardless. Use finally for cleanup operations like closing resources." }
  ],
  "SQL": [
    { q: "What are JOINS and name the types?", a: "JOINs combine rows from multiple tables. Types: INNER JOIN (matching rows), LEFT JOIN (all left + matching), RIGHT JOIN (all right + matching), FULL OUTER JOIN (all rows), CROSS JOIN (cartesian product)." },
    { q: "What is normalization?", a: "Normalization organizes data to reduce redundancy and improve integrity. Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies)." },
    { q: "Explain PRIMARY KEY and FOREIGN KEY.", a: "PRIMARY KEY uniquely identifies each record in a table. FOREIGN KEY links to a primary key in another table, establishing relationships and enforcing referential integrity." },
    { q: "What is indexing?", a: "Indexing creates a separate structure that speeds up data retrieval. Trade-off: faster reads, slower writes and more storage. Common index types: B-tree, hash, bitmap." },
    { q: "Difference between HAVING and WHERE.", a: "WHERE filters rows before grouping, HAVING filters groups after aggregation. WHERE works on individual rows, HAVING works on aggregated data." }
  ],
  "Docker": [
    { q: "What is a Docker image vs container?", a: "A Docker image is a lightweight, standalone, executable package with code and dependencies. A container is a running instance of an image with its own isolated filesystem and resources." },
    { q: "What is a Dockerfile?", a: "A Dockerfile contains instructions to build a Docker image. Commands like FROM (base image), RUN (execute commands), COPY (copy files), EXPOSE (port), CMD (default command)." },
    { q: "Explain Docker volumes.", a: "Volumes are the preferred way to persist data in Docker. They are stored outside containers, survive container deletion, and can be shared between containers." },
    { q: "What is Docker compose?", a: "Docker Compose defines and runs multi-container applications using a YAML file. It allows you to define services, networks, and volumes in one file and start everything with one command." },
    { q: "What are the benefits of containerization?", a: "Containerization provides: consistency across environments, isolation, lightweight compared to VMs, scalability, easy deployment, and version control." }
  ],
  "AWS": [
    { q: "What are EC2 instances?", a: "EC2 (Elastic Compute Cloud) are virtual servers in AWS. You can choose instance types, operating systems, storage, and networking. You pay for compute time." },
    { q: "Explain S3 buckets.", a: "S3 (Simple Storage Service) stores objects (files) in buckets. Offers high durability, scalability, versioning, lifecycle policies, and access control." },
    { q: "What is IAM?", a: "IAM (Identity and Access Management) controls who can access what in AWS. Use IAM users, groups, roles, and policies to manage permissions and follow the principle of least privilege." },
    { q: "What's the difference between RDS and DynamoDB?", a: "RDS is a relational database service (SQL), supports complex queries. DynamoDB is NoSQL, key-value store, serverless, better for high-speed, flexible data." },
    { q: "What is Lambda?", a: "Lambda is a serverless compute service. You upload code and it runs in response to events. You pay only for compute time used, no servers to manage." }
  ],
  "REST": [
    { q: "What are HTTP methods/verbs?", a: "GET (retrieve), POST (create), PUT (replace), PATCH (update), DELETE (remove), HEAD (like GET without body), OPTIONS (describe communication options)." },
    { q: "What are status codes?", a: "2xx Success (200 OK, 201 Created), 3xx Redirect, 4xx Client error (404 Not Found, 400 Bad Request), 5xx Server error (500 Internal Server Error)." },
    { q: "What is REST?", a: "REST (Representational State Transfer) is an architectural style using HTTP methods on resources identified by URLs. Uses JSON/XML for data format. Stateless and cacheable." },
    { q: "What's the difference between REST and SOAP?", a: "REST uses HTTP methods and is lightweight, SOAP uses XML and complex protocol. REST is simpler and more commonly used, SOAP is more formal and enterprise-focused." },
    { q: "What are headers used for?", a: "Headers provide metadata about the request/response. Common: Content-Type (data format), Authorization (credentials), Accept (preferred response format), Cache-Control." }
  ],
  "Git": [
    { q: "Explain branching and merging.", a: "Branches let you work on features independently. After work is done, merge brings changes back to main. Git tracks branches and manages merges, handling conflicts when needed." },
    { q: "What's the difference between merge and rebase?", a: "Merge creates a new commit combining two branches, keeping history. Rebase replays commits on top of another branch, creating a linear history but rewriting history." },
    { q: "What are merge conflicts?", a: "Merge conflicts happen when changes in two branches affect the same lines. Git marks conflicts and you manually resolve them by choosing which changes to keep." },
    { q: "Explain git stash.", a: "Stash temporarily saves uncommitted changes without committing them. Useful when you need to switch branches but aren't ready to commit. Use 'git stash pop' to restore." },
    { q: "What is a pull request?", a: "A pull request proposes changes from one branch to another (usually to main). It allows code review, discussion, and ensures code quality before merging." }
  ],
  "Node.js": [
    { q: "What is Node.js and why use it?", a: "Node.js runs JavaScript outside browsers using V8 engine. Use it for: server-side development, real-time applications, microservices, streaming, non-blocking I/O." },
    { q: "What are callbacks?", a: "Callbacks are functions passed as arguments to other functions, called when an operation completes. They handle asynchronous operations but can lead to callback hell." },
    { q: "Explain event-driven architecture.", a: "Node.js uses events extensively. Objects emit events when something happens, listeners respond to events. This enables non-blocking, efficient handling of I/O operations." },
    { q: "What is npm?", a: "npm (Node Package Manager) installs and manages JavaScript packages/libraries. Use package.json to list dependencies. npm install fetches packages from the npm registry." },
    { q: "What are streams?", a: "Streams process data in chunks rather than loading everything into memory. Types: readable, writable, duplex, transform. Efficient for large files." }
  ],
  "MongoDB": [
    { q: "What is MongoDB?", a: "MongoDB is a NoSQL document database. Stores data as JSON-like documents in collections, not tables. Flexible schema, scalable, and good for unstructured data." },
    { q: "Explain collections and documents.", a: "Collections are like tables, documents are like rows in JSON format. Documents in the same collection can have different structures (flexible schema)." },
    { q: "What are indexes in MongoDB?", a: "Indexes speed up queries by creating sorted structures. MongoDB supports: single field, compound, text, geospatial indexes. Default _id index is always created." },
    { q: "What is aggregation?", a: "Aggregation pipeline processes documents through stages: match, group, project, sort, limit. More powerful than simple find() queries." },
    { q: "Explain replication and sharding.", a: "Replication creates copies of data across servers for high availability. Sharding distributes data across multiple servers for scalability." }
  ],
  "CSS": [
    { q: "What's the CSS box model?", a: "The box model: content (core), padding (inside), border (edge), margin (outside). Use box-sizing: border-box to include padding/border in width calculation." },
    { q: "Explain flexbox.", a: "Flexbox is a layout mode for aligning items in one dimension. Properties: display: flex, justify-content (horizontal), align-items (vertical), flex-direction, flex-wrap." },
    { q: "What is CSS Grid?", a: "Grid is a 2D layout system. Define rows/columns with grid-template-rows/columns, place items with grid-row/column, gap adds spacing, areas organize layout." },
    { q: "Explain specificity.", a: "CSS specificity determines which style applies. Inline (1000) > ID (100) > Class/Pseudo-class (10) > Element (1). Higher specificity wins. Use !important as last resort." },
    { q: "What are media queries?", a: "Media queries apply styles based on device characteristics: @media (max-width: 768px). Enables responsive design for different screen sizes." }
  ],
  "TypeScript": [
    { q: "What is TypeScript?", a: "TypeScript is a superset of JavaScript adding static types. Compiles to JavaScript. Catches type errors at compile time, improves code quality and IDE support." },
    { q: "Explain interfaces and types.", a: "Both define object shapes. Interfaces are used for objects/classes, can be extended/merged. Types are more flexible, support unions, tuples, primitives." },
    { q: "What are generics?", a: "Generics write reusable code with flexible types. Example: function identity<T>(arg: T): T { return arg }. Used in functions, classes, and interfaces." },
    { q: "What is the 'any' type?", a: "'any' disables type checking. Avoid it as it defeats TypeScript's purpose. Use 'unknown' instead, which requires type checking before use." },
    { q: "Explain enums.", a: "Enums define a set of named constants. Numeric enums (auto-incrementing numbers) or string enums. Useful for sets of fixed values like directions, statuses." }
  ],
  "React Native": [
    { q: "What is React Native?", a: "React Native builds mobile apps using React and JavaScript. Compiles to native code for iOS and Android. Share codebase across platforms." },
    { q: "How does React Native differ from React?", a: "React runs in browser with web components, React Native runs on mobile with native components. Syntax similar but different components: View instead of div, Text instead of p." },
    { q: "What are React Native components?", a: "Key components: View (container), Text (text display), ScrollView (scrollable), FlatList (lists), Image, Button, TextInput, and platform-specific components." },
    { q: "How do you handle platform differences?", a: "Use Platform module: Platform.select({ios: ..., android: ...}). Or use .ios.js and .android.js file extensions for platform-specific files." },
    { q: "What is the bridge?", a: "The bridge communicates between JavaScript and native code. It sends messages back and forth, enabling JavaScript to call native APIs and vice versa." }
  ],
  "Vue.js": [
    { q: "What is Vue.js?", a: "Vue is a progressive JavaScript framework for building user interfaces. Combines the best of React and Angular. Easy learning curve, flexible, reactive." },
    { q: "Explain Vue directives.", a: "Directives are special tokens in markup with v- prefix. Common: v-bind (bind attributes), v-on (listen to events), v-if (conditional), v-for (loops), v-model (two-way binding)." },
    { q: "What is the Vue instance?", a: "The Vue instance is the root of every Vue app. Created with new Vue(). Properties: el (mount point), data (reactive data), methods (functions), computed (cached properties)." },
    { q: "Explain computed vs methods.", a: "Computed properties are cached based on dependencies, recalculate only when dependencies change. Methods execute every time called. Use computed for complex logic." },
    { q: "What is the component lifecycle?", a: "Lifecycle hooks: beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed. Run at specific points in component's existence." }
  ],
  "GraphQL": [
    { q: "What is GraphQL?", a: "GraphQL is a query language for APIs. Client specifies exactly what data it needs. Advantages: no over-fetching/under-fetching, single endpoint, strongly typed schema." },
    { q: "Explain queries and mutations.", a: "Queries fetch data (read-only). Mutations modify data (create, update, delete). Subscriptions listen for real-time updates." },
    { q: "What is a schema?", a: "Schema defines the structure of data and available queries/mutations. Types define objects, queries define entry points, mutations define operations." },
    { q: "Explain resolvers.", a: "Resolvers are functions that return data for fields. Each field has a resolver. They fetch data from databases, APIs, or compute values." },
    { q: "What are fragments?", a: "Fragments are reusable selections of fields. Reduce code duplication when querying multiple types with common fields." }
  ],
  "Data Structures": [
    { q: "What is a hash table?", a: "Hash table uses a hash function to map keys to values. Average O(1) lookup, insert, delete. Collisions handled by chaining or open addressing." },
    { q: "Explain binary search trees.", a: "BST has left child < parent < right child. Balanced BST has O(log n) operations. Unbalanced can degrade to O(n). AVL and Red-Black trees maintain balance." },
    { q: "What are graphs?", a: "Graphs have nodes (vertices) and edges. Can be directed, undirected, weighted, cyclic, acyclic. Traversal: DFS (depth-first), BFS (breadth-first)." },
    { q: "Difference between arrays and linked lists.", a: "Arrays: fixed size (usually), fast random access O(1), slow insertion/deletion. Linked lists: dynamic size, slow access O(n), fast insertion/deletion O(1)." },
    { q: "What is a trie?", a: "Trie (prefix tree) stores strings hierarchically. Each node represents a character. Efficient for: autocomplete, spell check, IP routing. O(m) lookup where m is string length." }
  ],
  "Algorithms": [
    { q: "Explain Big O notation.", a: "Big O describes algorithm's time/space complexity as input grows. O(1) constant, O(n) linear, O(n²) quadratic, O(log n) logarithmic, O(n log n) linearithmic." },
    { q: "What are sorting algorithms?", a: "Bubble sort O(n²), selection sort O(n²), insertion sort O(n²), merge sort O(n log n), quick sort O(n log n) avg, heap sort O(n log n). Merge/quick sorts better for large datasets." },
    { q: "Explain binary search.", a: "Binary search finds element in sorted array. Repeatedly divide range in half. O(log n) time complexity. Requires sorted input." },
    { q: "What is dynamic programming?", a: "DP breaks problems into overlapping subproblems, storing results to avoid recomputation. Trade space for time. Examples: Fibonacci, longest common subsequence." },
    { q: "Explain greedy algorithms.", a: "Greedy algorithms make locally optimal choices hoping for global optimality. Sometimes optimal, sometimes not. Examples: activity selection, coin change, Dijkstra's." }
  ],
  "System Design": [
    { q: "What is scalability?", a: "Scalability is ability to handle increased load. Vertical scaling: more powerful server. Horizontal scaling: more servers. Choose based on architecture and bottlenecks." },
    { q: "Explain load balancing.", a: "Load balancer distributes requests across multiple servers. Algorithms: round-robin, least connections, weighted, IP hash. Improves availability and performance." },
    { q: "What is caching?", a: "Caching stores frequently accessed data in fast storage (memory). Types: client-side, server-side, CDN. Reduces database queries and improves response time." },
    { q: "Explain databases: SQL vs NoSQL.", a: "SQL: relational, structured, ACID, joins, good for complex queries. NoSQL: document/key-value, flexible schema, high throughput, good for unstructured data." },
    { q: "What is a microservices architecture?", a: "Microservices break app into small, independent services. Each service owns data, communicates via APIs. Advantages: scalability, flexibility, easy deployment. Challenges: complexity, debugging." }
  ],
  "Machine Learning": [
    { q: "What is supervised vs unsupervised learning?", a: "Supervised learning uses labeled data to train models (regression, classification). Unsupervised learning finds patterns in unlabeled data (clustering, dimensionality reduction). Semi-supervised combines both." },
    { q: "Explain overfitting and underfitting.", a: "Overfitting occurs when a model learns the training data too well, performing poorly on new data. Underfitting is when the model is too simple to capture patterns. Use cross-validation and regularization to address." },
    { q: "What is a confusion matrix?", a: "Confusion matrix shows True Positives, True Negatives, False Positives, False Negatives. Used to calculate accuracy, precision, recall, and F1-score for classification models." },
    { q: "Explain gradient descent.", a: "Gradient descent is an optimization algorithm that iteratively adjusts model parameters to minimize loss. Updates parameters in the direction of steepest descent. Learning rate controls step size." },
    { q: "What is feature scaling?", a: "Feature scaling normalizes or standardizes features to have similar ranges. Prevents features with larger scales from dominating. Common methods: normalization (0-1), standardization (mean 0, std 1)." }
  ],
  "OOP": [
    { q: "What are the four pillars of OOP?", a: "Encapsulation (bundling data/methods), Abstraction (hiding complexity), Inheritance (code reuse), Polymorphism (multiple forms). They enable maintainable, scalable code." },
    { q: "Explain encapsulation.", a: "Encapsulation bundles data (attributes) and methods together, hiding internal details from the outside. Use access modifiers (private, protected, public) to control visibility and maintain data integrity." },
    { q: "What is inheritance?", a: "Inheritance allows a class to inherit properties and methods from a parent class. Enables code reuse and establishes hierarchical relationships. Child class extends parent with 'extends' (single) or 'implements' (multiple interfaces)." },
    { q: "Explain polymorphism.", a: "Polymorphism allows objects of different types to be treated as objects of a common parent type. Compile-time (method overloading) and runtime (method overriding). Enables flexible, extensible code." },
    { q: "What is abstraction?", a: "Abstraction hides complex implementation details and shows only essential features. Abstract classes and interfaces define contracts without implementation. Reduces complexity and improves modularity." },
    { q: "What's the difference between composition and inheritance?", a: "Inheritance is 'is-a' relationship (Dog is an Animal). Composition is 'has-a' relationship (Car has an Engine). Composition is more flexible and avoids tight coupling. Prefer composition over inheritance." },
    { q: "Explain the SOLID principles.", a: "S: Single Responsibility, O: Open/Closed, L: Liskov Substitution, I: Interface Segregation, D: Dependency Inversion. Guidelines for writing maintainable, scalable OOP code." },
    { q: "What is a constructor?", a: "Constructor is a special method called when an object is created. Initializes object state. Can have parameters. Every class has a default constructor if not explicitly defined." }
  ]
};

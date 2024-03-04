# @gecut/logger

Gecut Logger is a flexible and colorful logging tool built to enhance your debugging experience for both Node.js and browser-based JavaScript applications. With environment-aware functionalities and stylish output, Gecut Logger helps you to keep track of your application's behavior in an organized and visually appealing way.

## Features 🚀

- **Environment Compatibility**: Works seamlessly in both Node.js and browser environments.
- **Debug Modes**: Easily toggle debugging on and off with DEV_MODE, taking advantage of the localStorage in browsers and environment variables in Node.js.
- **Color Coding**: A colorful logging experience with auto-rotating colors to distinguish logs in both the browser console and terminal.
- **Structured Logging**: Logs are presented with indices, domains, and scope stylings to make tracing easier.
- **Development Friendly**: Rich debug functions available during development for an in-depth examination of your code.
- **Sub-Loggers**: Create sub-loggers with inherited features from a parent logger to maintain the context during complex application workflows.

## Installation 📦

Install the package using npm:

```bash
npm install @gecut/logger
```

## Usage 🛠️

Getting started with Gecut Logger is straightforward:

```ts
import { GecutLogger } from '@gecut/logger';

const logger = new GecutLogger('MyApp');

// Log an error with a method and description
logger.error('init', 'INIT_FAIL', 'Initialization failed due to an unknown error');

// Warn with additional arguments
logger.warning('loadData', 'INVALID_RESPONSE', 'Data response is invalid', { userId: 1 });

// Begin a timed operation (development mode only)
logger.time?.('fetchData');
// code to fetch data here...
logger.timeEnd?.('fetchData');
```

### Example in Browser 🌐

```ts
// Assuming DEV_MODE is enabled in localStorage
const logger = new GecutLogger('UIComponent');

// Trace a method call and its arguments
logger.methodArgs?.('render', { items: 5 });

// Log a property change
logger.property?.('isVisible', true);

// Other custom logs
logger.other?.('The component has been successfully rendered');
```

### Example in Node.js 🖥️

```ts
const logger = new GecutLogger('Server');

// Log an error with detailed information
logger.error('start', 'STARTUP_ERROR', 'Server failed to start on port 3000');

// Log a method entry
logger.method?.('handleRequest');
```

### Sub-Logger Creation 🧱

```ts
const mainLogger = new GecutLogger('App');
const dbLogger = mainLogger.sub('Database');

dbLogger.error('query', 'QUERY_FAIL', 'Query to the products table failed');
```

## API Documentation 📖

### GecutLogger

- **constructor(domain: string, devMode?: boolean)**: Initializes a new logger instance with a domain namespace and an optional development mode flag.

### Methods

- **property(property: string, value: unknown)**: Logs a property change (development mode only).
- **method(method: string)**: Logs a method invocation (development mode only).
- **methodArgs(method: string, args: unknown)**: Logs a method call with its arguments (development mode only).
- **methodFull(method: string, args: unknown, result: unknown)**: Logs a method with arguments and the result (development mode only).
- **other(...args: unknown[])**: Logs any custom information (development mode only).
- **warning(method: string, code: string, desc: string, ...args: unknown[])**: Logs a warning message, with a method reference, warning code, description, and additional arguments.
- **error(method: string, code: string, ...args: unknown[])**: Logs an error message, with a method reference, error code, and additional arguments.

### Static Methods

- **sub(domain: string, devMode?: boolean)**: Creates a sub-logger with a specified domain scope and optional development mode flag.

## Contributing 🤝

Your contributions are always welcome! If you have suggestions or find bugs, feel free to submit an issue or pull request on our [GitHub repository](https://github.com/gecut/gecut).

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

Bring some color and structure to your debugging efforts with Gecut Logger! 🎨🔍

# @gecut/signal

```bash
npm install @gecut/signal
# or
yarn add @gecut/signal
```

## ContextSignal

The `ContextSignal` class is a subclass of the `Signal` class.
It provides a way to manage a value that is shared across multiple components.
The value can be set and retrieved, and any changes to the value will be notified to subscribers.

### Usage

To use the `ContextSignal` class, first create an instance of the class:

```typescript
const signal = new ContextSignal<string>('mySignal');
```

Then, you can set the value of the signal:

```typescript
signal.setValue('Hello world');
```

You can also retrieve the value of the signal:

```typescript
const value = signal.getValue();
```

Any changes to the value of the signal will be notified to subscribers.
To subscribe to changes, use the `subscribe` method:

```typescript
signal.subscribe((value) => {
  console.log(value);
});
```

### Methods

The `ContextSignal` class provides the following methods:

- `getValue()`: Returns the current value of the signal.
- `setValue(value)`: Sets the value of the signal.
- `expire()`: Clears the value of the signal.
- `untilChange()`: Returns a promise that resolves when the value of the signal changes.
- `renotify()`: Renotifies the subscribers with the current value.

## SimpleSignal

The `SimpleSignal` class is a subclass of the `Signal` class.
It provides a way to notify subscribers of a new value.
Unlike the `ContextSignal` class, the `SimpleSignal` class does not store the value.

### Usage

To use the `SimpleSignal` class, first create an instance of the class:

```typescript
const signal = new SimpleSignal<string>('mySignal');
```

Then, you can notify subscribers of a new value:

```typescript
signal.notify('Hello world');
```

Any subscribers will be notified of the new value.
To subscribe to changes, use the `subscribe` method:

```typescript
signal.subscribe((value) => {
  console.log(value);
});
```

### Methods

The `SimpleSignal` class provides the following methods:

- `notify(value)`: Notifies subscribers of a new value.
- `nextValue`: Returns a promise that resolves to the next value notified to subscribers.

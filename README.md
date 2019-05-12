# Logby

> A minimal TypeScript logger inspired by logback

## Introduction

Logby is a TypeScript logger inspired by logger solutions from the Java world
like [logback](https://logback.qos.ch/index.html) and [slf4j](https://www.slf4j.org/).

**[Docs](https://felixrilling.github.io/logby/)**

## Usage

```shell
npm install logby
```

Each logger instance is part of a Logby instance.
The Logby instance handles caching of logger instances, the appender-queue and the active log level.
The logger instances do the actual logging for a class.

In most cases, you want one Logby instance for your application, and multiple loggers from that for
the different components and classes of your application.

```typescript
import { Logby, Levels } from "logby";

const logby = new Logby();

class Foo {
    private static readonly logger = logby.getLogger(Foo);

    constructor() {
        Foo.logger.info("Hello World!");

        logby.level = Levels.ERROR;

        Foo.logger.info("You can't see me.");
    }
}
```

### Appenders

Appenders can be attached and detached from Logby instances:

```typescript
import { Logby, ILevel, defaultLoggingAppender } from "logby";

const logby = new Logby();

/*
 * Detach the built-in appender and attach our own.
 */
logby.appenders.remove(defaultLoggingAppender);
logby.appenders.add((level: ILevel, name: string, args: any[]) =>
    console.log(args)
);

class Foo {
    private static readonly logger = logby.getLogger(Foo);

    constructor() {
        Foo.logger.info("Hello World!");
    }
}
```

### Built-in Levels

| Val | Name  |
| --- | ----- |
| -1  | None  |
| 0   | Error |
| 1   | Warn  |
| 2   | Info  |
| 3   | Debug |
| 4   | Trace |

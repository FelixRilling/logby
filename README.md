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

Each logger instance is part of a logger-root.
The logger-root handles caching of logger instances, the logger appender-queue and the active log-level.
The logger instances do the actual logging for a class.

In most cases, you want one logger-root for your application, and multiple loggers from that root for
the different components and classes of your application.

```typescript
import { Logby, Levels } from "logby";

const loggerRoot = new Logby();

class Foo {

  private static final logger = loggerRoot.getLogger(Foo);

  constructor(){
    this.logger.info("Hello World!");

    loggerRoot.level = Levels.ERROR;

     this.logger.info("You can't see me.");
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

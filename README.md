# Logby

> A minimal TypeScript logger inspired by logback

## Introduction

Logby can be installed through npm.

```shell
npm install logby
```

## Usage

```ts
import { Logby } from "logby";
import { Levels } from "logby/level/Levels";

const loggerRoot = new Logby();

class Foo {

  private static final logger: ILogger = loggerRoot.getLogger(Foo);

  constructor(){
    logger.info("Hello World!");

    loggerRoot.level = Levels.ERROR;

    logger.info("You can't see me.");
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

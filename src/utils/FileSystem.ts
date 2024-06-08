export class TerminalDirectory {
  name: string;
  parent: TerminalDirectory | null;
  children: Array<TerminalDirectory | TerminalFile>;

  constructor(name: string, parent: TerminalDirectory | null = null) {
    this.name = name;
    this.parent = parent;
    this.children = [];
  }

  path() {
    let path = "";
    let current: TerminalDirectory = this;

    while (current.parent) {
      path = `/${current.name}${path}`;
      current = current.parent;
    }
    return path;
  }

  cd(path: string) {
    if (path === "/" || !path) return this.root();

    const tokens = path.split("/");

    let current: TerminalDirectory = this;

    for (let token of tokens) {
      if (token === ".") {
        continue;
      }

      if (token === "..") {
        if (!current.parent) return new Error("No such directory");
        current = current.parent;
        continue;
      }

      const found = current.children.find((child) => child.name === token);
      if (found instanceof TerminalDirectory === false) {
        return new Error("No such directory");
      }

      current = found;
    }
    return current;
  }

  private root() {
    let current: TerminalDirectory = this;

    while (current.parent) {
      current = current.parent;
    }
    return current;
  }
}

export class TerminalFile {
  name: string;
  details: string;
  parent: TerminalDirectory | null;

  constructor(
    name: string,
    details: string = "",
    parent: TerminalDirectory | null = null
  ) {
    this.name = name;
    this.parent = parent;
    this.details = details;
  }
}

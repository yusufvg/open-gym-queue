class Player {
  constructor(id, name, position) {
    this.id = id;
    this.name = name;
    this.position = position;
  }
}

class Group {
  constructor(size, name, players) {
    this.size = size;
    this.name = name;
    this.players = players;
  }
}

class QueueItem {
  constructor(type, size, item) {
    this.type = type;
    this.size = size;
    this.item = item;
  }
}
export { Player, Group, QueueItem };

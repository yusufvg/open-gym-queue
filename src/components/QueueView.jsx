import React, { Component } from "react";

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

class QueueView extends React.Component {
  state = {
    nextFunction: this.playTwoNext,
    teams: [[], []],
    queue: [],
    size: 0,
    nextID: 0,
  };

  playTwoNext = (winner) => {};

  twoOffNext = () => {};

  addPlayer = (name, position) => {
    const newID = this.state.nextID;
    const player = new Player(newID, name, position);
    const queue = [...this.state.queue];

    queue.push(new QueueItem("player", 1, player));

    this.setState({ queue, nextID: newID + 1, size: this.state.size + 1 });
  };

  addPlayerToGroup = (name, position, group) => {
    const newID = this.state.nextID;
    const player = new Player(newID, name, position);
    const queue = [...this.state.queue];

    // TODO : fix this ugly code you dolt

    let target = new Group(1, group, [player]);
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].type === "group" && queue[i].item.name === group) {
        console.log(i, queue[i]);
        target = queue[i].item;
        target.size++;
        target.players.push(player);
        queue.splice(i, 1, new QueueItem("group", target.size, target));
        break;
      }
    }

    if (target.size === 1) {
      queue.push(new QueueItem("group", target.size, target));
    }

    this.setState({ queue, nextID: newID + 1, size: this.state.size + 1 });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.addPlayerToGroup("test", "OP", "group1")}>
          Test
        </button>
      </div>
    );
  }
}

export default QueueView;

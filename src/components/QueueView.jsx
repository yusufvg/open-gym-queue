import React, { Component } from "react";

class QueueView extends React.Component {
  state = {
    nextFunction: this.playTwoNext,
    teams: [[], []],
    queue: [],
    nextID: 0,
  };

  playTwoNext = () => {};

  twoOffNext = () => {};

  addPlayer = (name, position) => {
    const newID = this.state.nextID;
    const player = { id: newID, name, position };
    const queue = [...this.state.queue];

    queue.push({ type: "player", size: 1, item: player });

    this.setState({ queue, nextID: newID + 1 });
  };

  addPlayerToGroup = (name, position, group) => {
    const newID = this.state.nextID;
    const player = { id: newID, name, position };
    const queue = [...this.state.queue];

    // TODO : fix this ugly code you dolt

    let target = { size: 1, name: group, players: [player] };
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].type === "group" && queue[i].item.name === group) {
        console.log(i, queue[i]);
        target = queue[i].item;
        target.size++;
        target.players.push(player);
        queue.splice(i, 1, { type: "group", size: target.size, item: target });
        break;
      }
    }

    if (target.size === 1) {
      queue.push({ type: "group", size: target.size, item: target });
    }

    this.setState({ queue, nextID: newID + 1 });
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

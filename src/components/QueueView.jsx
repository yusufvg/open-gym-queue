import { queue } from "async";
import React, { Component } from "react";
import QueueItemCard from "./QueueItemCard.jsx";
import { Player, Group, QueueItem } from "./QueueUtils.js";

class QueueView extends React.Component {
  state = {
    nextFunction: this.playTwoNext,
    teams: [[], []],
    queue: [],
    size: 0,
    nextPlayerID: 0,
    nextItemID: 0,
  };

  playTwoNext = (winner) => {
    let teams = [...this.state.teams];
    const queue = [...this.state.queue];
    teams[winner].forEach((i) => queue.push(i));
    teams = [teams[(winner + 1) % 2], []];

    let newTeam = [];
    let size = 0;
    let curr = 0;
    while (size < 6 && curr < queue.length) {
      const i = queue[curr];
      if (i.size + size <= 6) {
        newTeam.push(i);
        size += i.size;
        queue.splice(curr, 1);
      } else {
        curr++;
      }
    }

    teams[1] = newTeam;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  twoOffNext = () => {};

  addPlayer = (name, position) => {
    const newPlayerID = this.state.nextPlayerID;
    const newItemID = this.state.nextItemID;
    const player = new Player(newPlayerID, name, position);
    const queue = [...this.state.queue];

    queue.push(new QueueItem(newItemID, "player", 1, player));

    this.setState({
      queue,
      nextPlayerID: newPlayerID + 1,
      nextItemID: newItemID + 1,
      size: this.state.size + 1,
    });
  };

  addPlayerToGroup = (name, position, group) => {
    const newPlayerID = this.state.nextPlayerID;
    const newItemID = this.state.nextItemID;
    const player = new Player(newPlayerID, name, position);
    const queue = [...this.state.queue];

    // TODO : fix this ugly code you dolt

    let target = new Group(1, group, [player]);
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].type === "group" && queue[i].item.name === group) {
        console.log(i, queue[i]);
        target = queue[i].item;
        target.size++;
        target.players.push(player);
        queue.splice(
          i,
          1,
          new QueueItem(newItemID, "group", target.size, target)
        );
        break;
      }
    }

    if (target.size === 1) {
      queue.push(new QueueItem(newItemID, "group", target.size, target));
    }

    this.setState({
      queue,
      nextPlayerID: newPlayerID + 1,
      nextItemID: newItemID + 1,
      size: this.state.size + 1,
    });
  };

  sizeOfItems(items) {
    return items.length === 0
      ? 0
      : items.map((i) => i.size).reduce((sum, i) => sum + i);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.addPlayer("test", "OP")}>add player</button>
        <button onClick={() => this.addPlayerToGroup("test", "OP", "group1")}>
          add group
        </button>
        <button onClick={() => this.playTwoNext(0)}>next team</button>

        <div className="container">
          {this.state.queue.map((i) => (
            <QueueItemCard key={i.type + i.id} qItem={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default QueueView;

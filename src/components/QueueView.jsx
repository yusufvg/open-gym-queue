import React, { Component } from "react";
import AddPlayerWindow from "./AddPlayerWindow.jsx";
import { Player, Group, QueueItem } from "./QueueUtils.js";
import QueueWindow from "./QueueWindow.jsx";
import TeamWindow from "./TeamWindow.jsx";

class QueueView extends Component {
  state = {
    ruleSet: "playtwo",
    teams: [[], []],
    queue: [],
    size: 0,
    nextPlayerID: 0,
    nextItemID: 0,
  };

  requeueTeam = (i) => {
    let teams = [...this.state.teams];
    const queue = [...this.state.queue];
    teams[i].forEach((i) => queue.push(i));
    teams = [teams[(i + 1) % 2], []];
    return { teams, queue };
  };

  draftTeam = (team, queue) => {
    let size = 0;
    let curr = this.sizeOfItems(team);
    while (size < 6 && curr < queue.length) {
      const i = queue[curr];
      if (i.size + size <= 6) {
        team.push(i);
        size += i.size;
        queue.splice(curr, 1);
      } else {
        curr++;
      }
    }
    return { team, queue };
  };

  playTwoNext = () => {
    let { teams, queue } = this.requeueTeam(0);

    let team;
    ({ team, queue } = this.draftTeam([], queue));
    teams[1] = team;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  twoOffNext = () => {
    let { teams, queue } = this.requeueTeam(0);
    ({ teams, queue } = this.requeueTeam(1));

    let team;
    ({ team, queue } = this.draftTeam([], queue));
    teams[0] = team;

    ({ team, queue } = this.draftTeam([], queue));
    teams[1] = team;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  kingsCourtNext = (winner) => {
    let { teams, queue } = this.requeueTeam(winner);

    let team;
    ({ team, queue } = this.draftTeam([], queue));
    teams[(winner + 1) % 2] = team;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  onAddPlayer = (name, position) => {
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

  onAddPlayerToGroup = (name, position, group) => {
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

  getNextButtons = () => {
    switch (this.state.ruleSet) {
      case "playtwo":
        return (
          <div className="container mb-2 text-center">
            <button
              className="btn btn-primary col-5 mx-2"
              onClick={this.playTwoNext}
            >
              Next Game
            </button>
          </div>
        );
      case "twoOff":
        return (
          <div className="container mb-2 text-center">
            <button
              className="btn btn-primary col-5 mx-2"
              onClick={this.twoOffNext}
            >
              Next Game
            </button>
          </div>
        );
      case "kings":
        return (
          <div className="container mb-2 text-center">
            <button
              className="btn btn-primary col-5 mx-2"
              onClick={() => this.kingsCourtNext(0)}
            >
              Team 1 Won
            </button>
            <button
              className="btn btn-primary col-5 mx-2"
              onClick={() => this.kingsCourtNext(1)}
            >
              Team 2 Won
            </button>
          </div>
        );

      default:
        break;
    }
  };

  sizeOfItems(items) {
    return items.length === 0
      ? 0
      : items.map((i) => i.size).reduce((sum, i) => sum + i);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row gx-2">
            <div className="col-12 col-md-6">
              <div className="row">
                <TeamWindow num="1" team={this.state.teams[0]} />
                <TeamWindow num="2" team={this.state.teams[1]} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <QueueWindow
                queue={this.state.queue}
                getNextButtons={this.getNextButtons}
              />
            </div>
          </div>
          <div className="row gx-2">
            <AddPlayerWindow
              handleAddPlayer={this.onAddPlayer}
              handleAddPlayerToGroup={this.onAddPlayerToGroup}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default QueueView;

import React, { Component } from "react";
import AddPlayerWindow from "./AddPlayerWindow.jsx";
import { Player, Group, QueueItem } from "./QueueUtils.js";
import QueueWindow from "./QueueWindow.jsx";
import RulesetWindow from "./RulesetWindow.jsx";
import TeamWindow from "./TeamWindow.jsx";

class QueueView extends Component {
  state = {
    ruleset: "playtwo",
    teams: [[], []],
    queue: [],
    size: 0,
    nextPlayerID: 0,
    nextItemID: 0,
  };

  // ruleset functions
  requeueTeam = (teams, queue, winner) => {
    teams[winner].forEach((i) => queue.push(i));
    teams = [teams[(winner + 1) % 2], []];
    return { teams, queue };
  };

  draftTeam = (team, queue) => {
    let size = this.sizeOfItems(team);
    let curr = 0;
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
    let teams = [...this.state.teams];
    let queue = [...this.state.queue];
    ({ teams, queue } = this.requeueTeam(teams, queue, 0));

    let team;
    ({ team, queue } = this.draftTeam([], queue));
    teams[1] = team;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  twoOffNext = () => {
    let teams = [...this.state.teams];
    let queue = [...this.state.queue];
    ({ teams, queue } = this.requeueTeam(teams, queue, 0));
    ({ teams, queue } = this.requeueTeam(teams, queue, 0));

    let team;
    ({ team, queue } = this.draftTeam([], queue));
    teams[0] = team;

    ({ team, queue } = this.draftTeam([], queue));
    teams[1] = team;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  kingsCourtNext = (winner) => {
    let teams = [...this.state.teams];
    let queue = [...this.state.queue];
    ({ teams, queue } = this.requeueTeam(teams, queue, winner));

    let team;
    ({ team, queue } = this.draftTeam([], queue));
    teams[(winner + 1) % 2] = team;

    this.setState({ teams, queue, size: this.sizeOfItems(queue) });
  };

  // player event handlers
  handleAddPlayer = (name, position) => {
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

  handleAddPlayerToGroup = (name, position, group) => {
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

  handleRefillTeam = (num) => {
    let team = [...this.state.teams[num]];
    let queue = [...this.state.queue];

    ({ team, queue } = this.draftTeam(team, queue));

    const teams = [...this.state.teams];
    teams[num] = team;

    this.setState({ teams, queue });
  };

  handleChangeruleset = (ruleset) => {
    this.setState({ ruleset });
  };

  getNextButtons = () => {
    switch (this.state.ruleset) {
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
      case "twooff":
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
      // TODO fix margins on small view

      <div>
        <div className="container">
          <div className="row gx-2">
            <div className="col-12 col-md-6">
              <div className="row">
                <TeamWindow
                  num="1"
                  team={this.state.teams[0]}
                  size={this.sizeOfItems(this.state.teams[0])}
                  onRefillTeam={() => this.handleRefillTeam(0)}
                />
                <TeamWindow
                  num="2"
                  team={this.state.teams[1]}
                  size={this.sizeOfItems(this.state.teams[1])}
                  onRefillTeam={() => this.handleRefillTeam(1)}
                />
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
              onAddPlayer={this.handleAddPlayer}
              onAddPlayerToGroup={this.handleAddPlayerToGroup}
            />
            <RulesetWindow
              ruleset={this.state.ruleset}
              onChangeRuleset={this.handleChangeruleset}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default QueueView;

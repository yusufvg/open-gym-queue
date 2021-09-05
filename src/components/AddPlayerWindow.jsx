import React from "react";

class AddPlayerWindow extends React.Component {
  state = {
    name: "",
    position: "Outside Hitter",
    group: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, position, group } = this.state;
    const { onAddPlayer, onAddPlayerToGroup } = this.props;

    group === ""
      ? onAddPlayer(name, position)
      : onAddPlayerToGroup(name, position, group);

    this.setState({ name: "", position: "Outside Hitter", group: "" });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handlePositionChange = (e) => {
    this.setState({ position: e.target.value });
  };
  handleGroupChange = (e) => {
    this.setState({ group: e.target.value });
  };

  render() {
    return (
      <div className="col-12 col-md-6">
        <div className="border bg-light p-2 h-100 w-100 d-inline-block">
          <form onSubmit={this.handleSubmit}>
            <h3>Add Player</h3>
            <div className="mb-2">
              <div className="input-group">
                <span className="input-group-text">Player Name</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <div className="input-group">
                <span className="input-group-text">Position</span>
                <select
                  className="form-select"
                  name="position"
                  id="postion"
                  value={this.state.position}
                  onChange={this.handlePositionChange}
                >
                  <option value="Outside Hitter">Outside Hitter</option>
                  <option value="Opposite">Opposite</option>
                  <option value="Middle Blocker">Middle Blocker</option>
                  <option value="Setter">Setter</option>
                  <option value="Libero">Libero</option>
                  <option value="Defensive Specialist">
                    Defensive Specialist
                  </option>
                </select>
              </div>
            </div>
            <div className="mb-2">
              <div className="input-group">
                <span className="input-group-text">Group Name (Opt.)</span>
                <input
                  type="text"
                  id="group"
                  name="group"
                  className="form-control"
                  value={this.state.group}
                  onChange={this.handleGroupChange}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPlayerWindow;

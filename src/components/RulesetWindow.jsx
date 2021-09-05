import React from "react";

const RulesetWindow = ({ ruleset, onChangeRuleset }) => {
  return (
    <div className="col-12 col-md-6">
      <div className=" mb-2  ">
        <div className="border bg-light p-2">
          <div className="text-center mb-2">
            <div className="btn-group">
              <button
                className={
                  "btn btn-primary" + (ruleset === "playtwo" ? " active" : "")
                }
                onClick={() => onChangeRuleset("playtwo")}
              >
                Play Two
              </button>
              <button
                className={
                  "btn btn-primary" + (ruleset === "twooff" ? " active" : "")
                }
                onClick={() => onChangeRuleset("twooff")}
              >
                Two Off
              </button>
              <button
                className={
                  "btn btn-primary" + (ruleset === "kings" ? " active" : "")
                }
                onClick={() => onChangeRuleset("kings")}
              >
                King Of The Court
              </button>
            </div>
          </div>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Play Two</div>
                Play two games in a row, regardless of winner. Team 1 rotates
                off, Team 2 becomes Team 1, and whoever is next in line becomes
                the new Team 2. A balanced way to ensure equal playing time
                while also playing multiple different opponents.
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Two Off</div>
                Play only one game, and then both teams rotate off and two new
                teams join. This ruleset has less continuous playing time than
                Play Two but also less waiting time as the queue rotates faster.
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">King of the Court</div>
                As the name implies, the king runs the court. Whichever team
                wins says on to play the next game while the losing team rotates
                off.
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RulesetWindow;

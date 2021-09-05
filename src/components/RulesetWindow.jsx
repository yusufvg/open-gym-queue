import React from "react";

const RulesetWindow = ({ ruleset, onChangeRuleset }) => {
  return (
    <div className="col-12 col-md-6">
      <div className=" mb-2 text-center ">
        <div className="border bg-light p-2">
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
      </div>
    </div>
  );
};

export default RulesetWindow;

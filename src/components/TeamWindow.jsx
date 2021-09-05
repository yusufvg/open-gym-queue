import React from "react";
import QueueItemCard from "./QueueItemCard";

const TeamWindow = ({ num, team, size, onRefillTeam }) => {
  return (
    <div className="col-12 col-xl-6">
      <div className="mb-2">
        <div className="border bg-light p-2 w-100 h-100 d-inline-block">
          <h3>Team #{num}</h3>
          {team.map((i) => (
            <QueueItemCard key={i.type + i.id} qItem={i} />
          ))}
          {size > 0 && size < 6 && (
            <div className="container mb-2 text-center">
              <button
                className="btn btn-primary col-5 mx-2"
                onClick={onRefillTeam}
              >
                Fill Team
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamWindow;

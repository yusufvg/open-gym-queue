import React, { Component } from "react";
import QueueItemCard from "./QueueItemCard";

const TeamWindow = ({ num, team }) => {
  return (
    <div className="col-12 col-xl-6">
      <div className="border bg-light h-100 d-inline-block">
        <h3>Team #{num}</h3>
        {team.map((i) => (
          <QueueItemCard key={i.type + i.id} qItem={i} />
        ))}
      </div>
    </div>
  );
};

export default TeamWindow;

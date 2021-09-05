import React, { Component } from "react";
import QueueItemCard from "./QueueItemCard.jsx";

const QueueWindow = ({ queue }) => {
  return (
    <div className="col-12 col-md-6">
      <div className="border bg-light">
        {queue.map((i) => (
          <QueueItemCard key={i.type + i.id} qItem={i} />
        ))}
      </div>
    </div>
  );
};

export default QueueWindow;

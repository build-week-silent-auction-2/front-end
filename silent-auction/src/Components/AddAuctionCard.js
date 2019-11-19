import React from "react";

const Items = props => {
  return (
    <div>
      {props.items.map(item => (
        <div className="item" key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.startingPrice}</p>
          <p>{item.startingDate}</p>
          <p>{item.endingDate}</p>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Items;
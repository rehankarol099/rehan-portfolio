import {  useState } from "react";
import { Posts } from "./App";
import "./list.css";

export const List: React.FC<{ items: Posts[] }> = ({ items }) => {
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  const handleClick = async (index: number) => {
    setLoading((prev) => ({ ...prev, [index]: true }));

    // Simulate a delay for delete action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="card-container">
      {items.map((item) => (
        <div key={item.id} className="card">
          <img src={item.image} alt={item.title} />
          <h1>{item.title}</h1>
          <div style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}>
            <p className="price">${item.price}</p>
            <p className="category">Category: {item.category}</p>
          </div>

          <p className="description">{item.description}</p>
          <div className="rating">
            <span className="star">★</span> {item.rating.rate} (
            {item.rating.count} reviews)
          </div>
          <button
            onClick={() => handleClick(item.id)}
            disabled={loading[item.id]}
          >
            {loading[item.id] ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

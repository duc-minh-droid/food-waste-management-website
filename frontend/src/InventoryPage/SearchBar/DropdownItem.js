import React from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const itemStyle = {
  padding: "8px 16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  borderBottom: "1px solid #eee",
};

function DropdownItem({ item, closeDropdown }) {
  const handleClick = () => {
    closeDropdown();
    // store in Inventory
    createInventory(item);
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = "#f0f0f0";
  };

  const handleLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
  };

  const checkIfFoodIDExists = async (itemID) => {
    const inventoryCollectionRef = collection(db, "inventory");
    const q = query(inventoryCollectionRef, where("foodID", "==", itemID));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const createInventory = async (item) => {
    const foodIDExists = await checkIfFoodIDExists(item.id);
    if (foodIDExists) return;
    const docRef = await addDoc(collection(db, "inventory"), {
      foodID: item.id,
      image: item.image,
      name: item.name,
      userID: auth.currentUser.uid,
      serverTimeStamp: serverTimestamp(),
    });
  };

  return (
    <li
      style={itemStyle}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {item.name}
    </li>
  );
}

export default DropdownItem;

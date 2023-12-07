import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import ExpiringIngredient from './ExpiringIngredient'
import { deleteDoc, doc } from 'firebase/firestore';

function ExpiringIngredients() {
    const [inventory, setInventory] = useState([])

    useEffect(()=>{
        const q = query(
            collection(db, 'inventory'),
            where('expiryDate', '!=', null), // Select only documents with expiryDate field
            orderBy('expiryDate') // Order by expiryDate
          );
        
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedInventory = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setInventory(updatedInventory);
          });

        return () => unsubscribe()
    },[])

    const handleDelete = (id) => {
        const deleteInventoryItem = async (id) => {
            await deleteDoc(doc(db, "inventory", id));
        }
        deleteInventoryItem(id)
        setInventory(prev => prev.filter(item => item.id !== id))
    }

  return (
    <div>
        <h1>Expiring Ingredients</h1>
        <ul>
            {inventory.length? inventory.map((item, key)=><ExpiringIngredient item={item} key={key} handleDelete={handleDelete}/>):(<li>No expiring ingredients</li>) }
        </ul>
    </div>
  )
}

export default ExpiringIngredients
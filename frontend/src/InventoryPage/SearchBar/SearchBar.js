import React from 'react'
import IngredientSearch from '../../components/IngredientSearch'
import { useToast } from '../../components/Toast'
import { api } from '../../services'

function SearchBar() {
  const toast = useToast()
  const onPick = async (item) => {
    try {
      const added = await api.addToInventory(item)
      toast(added ? `Added ${item.name} to your inventory` : `${item.name} is already in your inventory`, added ? 'ok' : 'info')
    } catch (e) {
      toast(e.message, 'error')
    }
  }
  return <IngredientSearch placeholder='Add an ingredient to your kitchen (try "apple")' onPick={onPick} />
}

export default SearchBar

import React from 'react'
import IngredientSearch from '../../components/IngredientSearch'
import { useToast } from '../../components/Toast'
import { api } from '../../services'

function SearchBar() {
  const toast = useToast()
  const onPick = async (item) => {
    try {
      const added = await api.addToShopping(item, 1)
      toast(added ? `Added ${item.name} to your list` : `${item.name} is already on your list`, added ? 'ok' : 'info')
    } catch (e) {
      toast(e.message, 'error')
    }
  }
  return <IngredientSearch placeholder='Add something to buy' onPick={onPick} />
}

export default SearchBar

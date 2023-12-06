import React, { useState } from 'react'
import DropdownMenu from './DropdownMenu'

const data = [
    {
        "name": "apple",
        "image": "apple.jpg",
        "id": 9003,
        "aisle": "Produce",
        "possibleUnits": [
            "small",
            "large",
            "piece",
            "slice",
            "g",
            "extra small",
            "medium",
            "oz",
            "cup slice",
            "cup",
            "serving"
        ]
    },
    {
        "name": "applesauce",
        "image": "applesauce.png",
        "id": 9019,
        "aisle": "Canned and Jarred",
        "possibleUnits": [
            "g",
            "oz",
            "cup",
            "serving",
            "tablespoon"
        ]
    },
    {
        "name": "apple juice",
        "image": "apple-juice.jpg",
        "id": 9016,
        "aisle": "Beverages",
        "possibleUnits": [
            "g",
            "drink box",
            "fl oz",
            "oz",
            "teaspoon",
            "cup",
            "serving",
            "tablespoon"
        ]
    },
    {
        "name": "apple cider",
        "image": "apple-cider.jpg",
        "id": 1009016,
        "aisle": "Beverages",
        "possibleUnits": [
            "g",
            "drink box",
            "fl oz",
            "oz",
            "teaspoon",
            "bottle NFS",
            "cup",
            "serving",
            "tablespoon"
        ]
    },
    {
        "name": "apple jelly",
        "image": "apple-jelly.jpg",
        "id": 10019297,
        "aisle": "Nut butters, Jams, and Honey",
        "possibleUnits": [
            "g",
            "oz",
            "packet",
            "teaspoon",
            "cup",
            "serving",
            "tablespoon"
        ]
    }]

    
    function SearchBar() {
        const [query, setQuery] = useState("")
        const [openDropdown, setOpenDropdown] = useState(false)
        const [dropDownData, setDropDownData] = useState([])
        const handleChange = (e) => {
            setQuery(e.target.value)
            if (e.target.value.length >= 3) {
                setDropDownData(data)
                // fetchIngredientQuery(query)
                setOpenDropdown(true)
            } else {
                setOpenDropdown(false)
            }
        }
        
        const fetchIngredientQuery = (query) => {
            const apiKey = process.env.REACT_APP_API_KEY
            const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=5&apiKey=${apiKey}`
            fetch(url)
                .then(res=>res.json())
                .then(data => {
                    setDropDownData(data)
                })
        }

  return (
    <div>
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={query}
        />
        {openDropdown && !dropDownData.length && <DropdownMenu data={[{name: "No result found"}]} closeDropdown={()=>setOpenDropdown(false)}/>}
        {openDropdown && <DropdownMenu data={dropDownData} closeDropdown={()=>setOpenDropdown(false)}/>}
    </div>
  )
}

export default SearchBar
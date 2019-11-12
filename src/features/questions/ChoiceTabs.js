import React, { useState, useEffect } from 'react'
import Tabs from 'react-bulma-components/lib/components/tabs'
import List from 'react-bulma-components/lib/components/list'
import { setCategory, fetchQuestions } from './assessmentSlice'
import { connect } from 'react-redux'


function ChoiceTabs({ categories, dispatch }) {
  const [categoryId, setCategoryId] = useState(0)
  const [subcategoryId, setSubcategoryId] = useState(0)

  useEffect(() => {
    dispatch(
      setCategory({
        category: categories[0].label,
        subcategory: categories[0].subcategories[0],
      }),
    )
     
  },[]);

  
  
  
  let i = 0
  let j = 0
  return (
    <>
      <Tabs>
        {categories.map(category => {
          const id = i++
          return (
            <Tabs.Tab
              key={'category' + id}
              active={categoryId === id}
              onClick={() => {
                setCategoryId(id)
              }}
            >
              {category.label}
            </Tabs.Tab>
          )
        })}
      </Tabs>

      <List>
        {categories[categoryId].subcategories.map(subcategory => {
          const id = j++
          return (
            <List.Item
              key={'subcategory' + id}
              active={subcategoryId === id}
              onClick={() => {
                setSubcategoryId(id)
                dispatch(
                  setCategory({
                    category: categories[categoryId].label,
                    subcategory: subcategory,
                  }),
                )
              }}
            >
              {subcategory}
            </List.Item>
          )
        })}
      </List>
    </>
  )
}

export default connect()(ChoiceTabs)

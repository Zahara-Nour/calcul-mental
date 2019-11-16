import React, { useState, useEffect } from 'react'
import Tabs from 'react-bulma-components/lib/components/tabs'
import { setCategory } from './assessmentSlice'
import { connect } from 'react-redux'
import Menu from 'react-bulma-components/lib/components/menu'
import categories from '../../assets/categories'
import Params from './Params'
import Columns from 'react-bulma-components/lib/components/columns'

function ChoiceTabs({ dispatch }) {
  const [categoryId, setCategoryId] = useState(0)
  const [subcategoryId, setSubcategoryId] = useState(0)
  const [subsubcategoryId, setSubsubcategoryId] = useState(0)

  useEffect(() => {
    dispatch(
      setCategory({
        category: categories[0].label,
        subcategory: categories[0].subcategories[0].label,
        subsubcategory:
          categories[0].subcategories[0].subsubcategories[0].label,
      }),
    )
  }, [])

  let i = 0
  let j = 0
  let k = 0
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
      <Columns>
      <Columns.Column size={8}>
        
      <Menu>
        <Menu.List>
          {categories[categoryId].subcategories.map(subcategory => {
            const subId = j++
            return (
              <Menu.List.Item
                key={'subcategory' + subId}
                active={subcategoryId === subId}
                onClick={() => {
                  setSubcategoryId(subId)
                }}
              >
                <Menu.List title={subcategory.label}>
                  {subcategory.subsubcategories.map(subsubcategory => {
                    const subsubId = k++
                    return (
                      <Menu.List.Item
                        hidden={subcategoryId !== subId}
                        key={'subsubcategory' + subsubId}
                        active={subsubcategoryId === subsubId}
                        onClick={() => {
                          setSubsubcategoryId(subsubId)
                          dispatch(
                            setCategory({
                              category: categories[categoryId].label,
                              subcategory: subcategory.label,
                              subsubcategory: subsubcategory.label,
                            }),
                          )
                        }}
                      >
                        {subsubcategory.label}
                      </Menu.List.Item>
                    )
                  })}
                </Menu.List>
              </Menu.List.Item>
            )
          })}
        </Menu.List>
      </Menu>
    
      </Columns.Column>
      <Columns.Column size={4}>
     
          
            <Params />
         
     
      </Columns.Column>
    </Columns>
      
      
    
    </>
  )
}

export default connect()(ChoiceTabs)

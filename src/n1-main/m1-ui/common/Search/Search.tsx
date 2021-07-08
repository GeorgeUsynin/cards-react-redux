import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import SuperInputText from '../SuperInput/SuperInputText'
import { useDispatch } from 'react-redux'
import { searchPack } from '../../../m2-bll/packsReducer'

type SearchPropsType = {
  className: string
}

const Search: React.FC<SearchPropsType> = ({className}) => {
  
  const dispatch = useDispatch()
  const [request, setRequest] = useState<string>('')
  
  
  const handlePress = (e: KeyboardEvent<HTMLInputElement>) => {
    dispatch(searchPack(request))
    e.currentTarget.blur()
  }
  
  return (
    <SuperInputText
      value={request}
      type={'text'}
      onChangeText={setRequest}
      onEnter={handlePress}
      placeholder={'Search...'}
      className={className}
    />
  )
}

export default Search

import React, { useState } from 'react'
import SuperDoubleRange from '../../common/SuperDoubleRange/SuperDoubleRange'
import styles from './DoubleRange.module.scss'
import { useDispatch } from 'react-redux'
import { setRangeSort } from '../../../m2-bll/packsReducer'

export const DoubleRange = () => {
  const dispatch = useDispatch()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  
  const onChangeRange = (value: [number, number]) => {
    if (min <= max) setMin(value[0])
    if (max >= min) setMax(value[1])
  }
  const handleRange = () => {
    dispatch(setRangeSort([min, max]))
  }
  
  return (
    <>
      <SuperDoubleRange
        value={[min, max]}
        min={0}
        max={100}
        step={1}
        included={true}
        onChangeRange={onChangeRange}
        onAfterChange={handleRange}
        handleStyle={[{borderColor: 'blue', backgroundColor: 'blue'}]}
        trackStyle={[{width: '20px', backgroundColor: 'blue'}]}
        railStyle={{backgroundColor: 'grey'}}
        dotStyle={{backgroundColor: 'red'}}
        activeDotStyle={{borderColor: 'green'}}
      />
      <div className={styles.rangeContainer}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </>
  )
}
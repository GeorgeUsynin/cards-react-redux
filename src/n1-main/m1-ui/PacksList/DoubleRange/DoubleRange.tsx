import React, {useEffect, useState} from 'react'
import SuperDoubleRange from '../../common/SuperDoubleRange/SuperDoubleRange'
import styles from './DoubleRange.module.scss'
import { useDispatch } from 'react-redux'
import { setRangeSort } from '../../../m2-bll/packsReducer'

type DoubleRangeType = {
  maxCount: number
}

export const DoubleRange: React.FC<DoubleRangeType> = ({maxCount}) => {
  const dispatch = useDispatch()

  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(maxCount)

  useEffect(() => setMax(maxCount), [maxCount])

  const onChangeRange = (value: [number, number]) => {
    if (min <= max) setMin(value[0])
    if (max >= min) setMax(value[1])
  }
  const handleRange = () => {
    dispatch(setRangeSort([min, max]))
  }

  if (maxCount === 0) return null

  return (
    <>
      <SuperDoubleRange
        value={[min, max]}
        min={0}
        max={maxCount}
        step={1}
        included={true}
        onChangeRange={onChangeRange}
        onAfterChange={handleRange}
        handleStyle={[{borderColor: '#21268F', backgroundColor: '#21268F'}]}
        trackStyle={[{width: '20px', backgroundColor: '#21268F'}]}
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
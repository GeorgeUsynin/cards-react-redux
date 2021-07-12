import React, {useEffect, useState} from 'react'
import SuperDoubleRange from '../../common/SuperDoubleRange/SuperDoubleRange'
import styles from './DoubleRange.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setRangeSort} from '../../../m2-bll/packsReducer'
import {AppRootStateType} from "../../../m2-bll/store";
import {Preloader} from "../../common/preloader/Preloader";

type DoubleRangePropsType = {
    maxCount: number
    minCount: number
    // minCount: number
}

export const DoubleRange: React.FC<DoubleRangePropsType> = ({maxCount, minCount}) => {
    const dispatch = useDispatch()

    const isFetching = useSelector<AppRootStateType, boolean>(state => state.packs.isFetching)

    useEffect(() => {
        setMax(maxCount)
        setMin(minCount)
    }, [maxCount, minCount])

    const [min, setMin] = useState(minCount)
    const [max, setMax] = useState(maxCount)

    const onChangeRange = (value: [number, number]) => {
        if (min <= max) setMin(value[0])
        if (max >= min) setMax(value[1])
    }
    const handleRange = () => {
        dispatch(setRangeSort([min, max]))
    }

    return (
        isFetching && !maxCount
            ?
            <Preloader/>
            :
            <>
                <SuperDoubleRange
                    value={[min, max]}
                    max={maxCount}
                    min={minCount}
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
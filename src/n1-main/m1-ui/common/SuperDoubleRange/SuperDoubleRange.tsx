import React from 'react'
import 'rc-slider/assets/index.css'

const Slider = require('rc-slider')
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

type SuperDoubleRangePropsType = {
  onChangeRange?: (value: [number, number]) => void
  onAfterChange?: () => void
  value?: [number, number]
  min: number
  max: number
  step: number | null
  included?: boolean
  handleStyle?: Object[]
  trackStyle?: Object[]
  railStyle?: Object
  dotStyle?: Object
  activeDotStyle?: Object
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
  {
    onChangeRange,
    onAfterChange,
    value,
    min,
    max,
    step,
    included,
    handleStyle,
    trackStyle,
    railStyle,
    dotStyle,
    activeDotStyle,
  }) => {
  
  return (
    <>
      <Range
        onChange={onChangeRange}
        onAfterChange={onAfterChange}
        value={value}
        min={min}
        max={max}
        step={step}
        included={included}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
        dotStyle={dotStyle}
        activeDotStyle={activeDotStyle}
      />
    </>
  )
}

export default SuperDoubleRange

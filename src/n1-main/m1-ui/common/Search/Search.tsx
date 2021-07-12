import React, {KeyboardEvent, useState} from 'react'
import SuperInputText from "../SuperInput/SuperInputText";

type SearchPropsType = {
    className: string
    handlePressSearch: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Search: React.FC<SearchPropsType> = ({className, handlePressSearch}) => {

    const [request, setRequest] = useState<string>("")

    return (
        <SuperInputText
            value={request}
            type={"text"}
            onChangeText={setRequest}
            onEnter={handlePressSearch}
            placeholder={"Search..."}
            className={className}
        />
    )
}

export default Search

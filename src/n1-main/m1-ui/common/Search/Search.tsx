import React, {useState} from 'react'
import SuperInputText from "../SuperInput/SuperInputText";
import {useDispatch} from "react-redux";
import {getSearchedPacks, startSearchingAC} from "../../../m2-bll/packsReducer";

type SearchPropsType = {
    className: string
}

const Search: React.FC<SearchPropsType> = ({className}) => {

    const dispatch = useDispatch()
    const [request, setRequest] = useState<string>("")


    const handlePress = () => {
        dispatch(getSearchedPacks(request))
        setRequest('')
    }

    return (
        <SuperInputText
            value={request}
            type={"text"}
            onChangeText={setRequest}
            onEnter={handlePress}
            placeholder={"Search..."}
            className={className}
        />
    )
}

export default Search

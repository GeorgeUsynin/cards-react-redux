import React, {useState} from 'react'
import cls from "../../Login/Login.module.css";
import SuperInputText from "../SuperInput/SuperInputText";
import {useDispatch} from "react-redux";
import {startSearchingAC} from "../../../m2-bll/searchReducer";


const Search: React.FC = () => {

    const dispatch = useDispatch()
    const [request, setRequest] = useState<string>("")
    dispatch(startSearchingAC(request))

    return (
        <SuperInputText
            className={cls.inputRequest}
            value={request}
            type={"text"}
            onChangeText={setRequest}
        />
    )
}

export default Search

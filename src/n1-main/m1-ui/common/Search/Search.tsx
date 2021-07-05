import React, {useState} from 'react'
import cls from "../../Login/Login.module.css";
import SuperInputText from "../SuperInput/SuperInputText";


const Search: React.FC = () => {
    const [request, setRequest] = useState<string>("")

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

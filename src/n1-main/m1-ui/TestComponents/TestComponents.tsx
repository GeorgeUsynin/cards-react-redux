import React from "react";
import cls from './TestComponents.module.css'
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";

export const TestComponents = () => {
    return (
        <div className={cls.testComponentsContainer}>
            <h1>Common components</h1>
            <div className={cls.componentsContainer}>
                <div>
                    <h2>Button</h2>
                    <SuperButton>
                        Button
                    </SuperButton>
                </div>
                <div>
                    <h2>Input Text</h2>
                    <SuperInputText/>
                </div>
                <div>
                    <h2>CheckBox</h2>
                    <SuperCheckbox/>
                </div>
            </div>
        </div>
    )
}
import React, {Dispatch, SetStateAction} from 'react';
import style from './Modal.module.scss'


const Modal = ({active, setActive, children}: { active: boolean, setActive: Dispatch<SetStateAction<boolean>>,
   // children: ReactChild | ReactChildren;
    children: any;
}) => {

    return (
        <div className={`${active
            ? style.modalContainer + ' ' + style.active
            : style.modalContainer}`} onClick={() => setActive(false)}>
            <div className={`${active
                ? style.modalContent + ' ' + style.active
                : style.modalContent}`} onClick={e => e.stopPropagation()}>

                {children}

                <button onClick={() => setActive(false)} className={style.buttonModal}>X</button>
            </div>

        </div>
    );
};

export default Modal;
import { ReactComponent as Icon } from "../../Assets/Icons/checkmark-circle-outline.svg";

import styles from './SuccesMessage.module.scss'

const SuccesMessage = ()=>{

    return(
        
            <div className={styles.message}>
            <Icon className={styles.icon}/>
            <h2>Succes !</h2>
            <p>Your request was successfully submitted.</p>
            </div>
        
    )
}

export default SuccesMessage;
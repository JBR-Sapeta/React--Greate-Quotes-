import  styles from "./Background.module.scss"


const Background = ({children}) =>{
 
   return <main className={styles.main}>{children}</main>


}

export default Background;
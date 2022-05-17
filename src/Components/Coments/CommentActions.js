
import CustomButton from "../Ui/Actions/CustomButton";
import EditForm from "./Form/EditForm";

import styles from "./CommentActions.module.scss"

const CommentActions = ({isEditing,text,editHandler,removeComment,onEditComment}) => {
  if (isEditing) {
    return (
        <EditForm
        text={text}
        editHandler={editHandler}
        onEditComment={onEditComment}
      ></EditForm>
    );
  }

  return(
    <div className={styles.actions}>
      <CustomButton color={"primary"} onClick={editHandler}>
        Edit
      </CustomButton>
      <CustomButton color={"accent"} onClick={removeComment}>
        Delete
      </CustomButton>
    </div>
  )



};

export default CommentActions;


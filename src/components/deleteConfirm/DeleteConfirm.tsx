import styles from './DeleteConfirm.module.css'

type DeleteConfirmProps = {
    cancel: () => void;
    onDelete: () => void;
}
const DeleteConfirm = ({cancel,onDelete}: DeleteConfirmProps) => {
    return (
        <div className={`${styles.main_styles}`}>
            <div className={`${styles.container_styles}`}>
                <div className={`${styles.header}`}>Delete Comment</div>
                <div className={'text-Grey-500'}>
                    Are you sure you want to delete this
                    comment? This will remove the comment
                    and can't be undone.
                </div>
                <div className={`${styles.btn_container}`}>
                    <button className={`${styles.cancel_btn}`} onClick={cancel}>NO, CANCEL</button>
                    <button className={`${styles.delete_btn}`} onClick={onDelete}>YES, DELETE</button>
                </div>

            </div>
        </div>
    );
};

export default DeleteConfirm;
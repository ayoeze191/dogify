import classNames from 'classnames';
import styles from './styles.module.scss'

const Shimmer = ({}) => {
    return (
        <div className={classNames(styles.imgloader, {
            // [styles.imgloaded]: loaded,
            // [styles.imgLoading]: !loaded
        })}></div>
    );
}   

export default Shimmer
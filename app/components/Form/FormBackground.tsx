"use client"
import { Box } from '@radix-ui/themes';
import styles from './background.module.css';

const FormBackground = () => {

    return (
        <Box
            className={ `${styles.formImage} formImage hidden md:block` }>
        </Box>
    )
}

export default FormBackground
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    questionnaireContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1px',
        width: '100%',
        padding: '3rem 0',
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        margin: '30px 0',
        position: 'relative'
    },

    nextButton: {
        position: 'absolute',
        right: '-80%'
    },
    backButton: {
        position: 'absolute',
        left: '0%'
    }
}))
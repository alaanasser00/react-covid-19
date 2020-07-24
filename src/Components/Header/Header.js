import React, { useContext } from 'react';
import Search from '../Search/Search'
import { DataContext } from '../../contexts/DataContext';
import styles from './Header.module.css';

// [BEGIN] Material-ui Components
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// [END] Material-ui Components

// [BEGIN] FontAwesome Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faGlobeAfrica } from '@fortawesome/free-solid-svg-icons'
// [END] FontAwesome Styles


// [BEGIN] Material-ui styles
const materialStyles = theme => ({
    root: {
        margin: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    closeButton: {
        display: 'block',
        marginLeft: 'auto',
        color: '#18214D',
        '&:hover': {
            backgroundColor: "rgba(142, 172, 212, 0.2)"
        }
    }
});
// [END] Material-ui styles


const DialogTitle = withStyles(materialStyles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle className={classes.root} {...other}>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const DialogContent = withStyles(theme => ({
    root: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 20,
    }
}))(MuiDialogContent);



function Header() {
    // Retrieve Context Data
    const { 
        isLoading,
        showWorldwideData, 
        countryData, 
        countryDataDetails, 
        countryHist 
    } = useContext(DataContext);
    const [isLoadingCmp,] = isLoading;
    const [countryDataHeader, setCountryDataHeader] = countryData;
    const [, setCountryHistHeader] = countryHist;
    const [countryDataDetailsHeader, ] = countryDataDetails;
    const [showWorldwide, setShowWorldwide] = showWorldwideData;


    const updateQuery = (newQuery) => {
        setCountryDataHeader({country: newQuery});
        setCountryHistHeader({ country: newQuery });
        setShowWorldwide(false)
    }

    const worldBtnHandler = () => {
        setShowWorldwide(true)
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.textTitles}>
                <h1>Covid-19 Tracker {isLoadingCmp ? (<span className="loadingspinner"></span>) : null}</h1>
                <div className={styles.country}>
                    <img id="flag" src={showWorldwide ? 'https://image.flaticon.com/icons/png/512/44/44386.png' : countryDataDetailsHeader.flag} alt=""/>
                    <span id="flag_txt" >{showWorldwide ? 'Worldwide' : countryDataHeader.country.charAt(0).toUpperCase() + countryDataHeader.country.slice(1)}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <Search updateText={updateQuery} />
                <Tooltip title="More Info" arrow>
                    <button className={styles.action} onClick={handleClickOpen}>
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </button>
                </Tooltip>
                {(!showWorldwide) ?
                    <Tooltip title="Show Global Data" arrow>
                        <button className={styles.action} onClick={() => worldBtnHandler()}>
                            <FontAwesomeIcon icon={faGlobeAfrica} />
                        </button>
                    </Tooltip> : null}
            </div>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose} />
                <DialogContent >
                    <p className="mb1">
                        This application represents the data of COVID-19 pandemic of all the countries in the world.
                        It is built with <strong>React Hooks, Material UI and Chart.JS</strong>.
                    </p>
                    <p className="mb1">
                        API used:{" "}
                        <a href="https://disease.sh/docs">https://disease.sh/docs</a>
                    </p>
                    <p className="mb1">
                        For more info, visit the repository: 
                    </p>
                    <p className="mb1">
                        <strong>DO NOT</strong> use it for professional analysis, it is an experimental application.
                    </p>
                </DialogContent>
            </Dialog>

        </header>
    )
}

export default Header;

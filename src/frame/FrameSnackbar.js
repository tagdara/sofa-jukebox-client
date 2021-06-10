import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function FrameSnackbar() {
  
    const { showSnackbar, snackbarMessage, setShowSnackbar } = useContext(LayoutContext);

    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }} open={showSnackbar} autoHideDuration={5000} onClose={ () => setShowSnackbar(false)}
                message={ snackbarMessage }
                action={ <IconButton size="small" aria-label="close" color="inherit" onClick={ () => setShowSnackbar(false) }>
                            <CloseIcon fontSize="small" />
                        </IconButton> }
        />
    );
}



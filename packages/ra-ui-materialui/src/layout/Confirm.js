import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionCheck from '@material-ui/icons/CheckCircle';
import AlertError from '@material-ui/icons/ErrorOutline';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from 'ra-core';

const styles = theme => createStyles({
    confirmPrimary: {
        color: theme.palette.primary.main,
    },
    confirmWarning: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
    },
});

/**
 * Confirmation dialog
 *
 * @example
 * <Confirm
 *     isOpen={true}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     confirm="Yes"
 *     confirmColor="primary"
 *     cancel="Cancel"
 *     onConfirm={() => { // do something }}
 *     onClose={() => { // do something }}
 * />
 */
const Confirm = ({
    isOpen,
    title,
    content,
    confirm,
    cancel,
    confirmColor,
    onConfirm,
    onClose,
    classes,
    translate,
}) => (
    <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
    >
        <DialogTitle id="alert-dialog-title">
            {translate(title, { _: title })}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {translate(content, { _: content })}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                <AlertError className={classes.iconPaddingStyle} />
                {translate(cancel, { _: cancel })}
            </Button>
            <Button
                onClick={onConfirm}
                className={classnames('ra-confirm', {
                    [classes.confirmWarning]: confirmColor === 'warning',
                    [classes.confirmPrimary]: confirmColor === 'primary',
                })}
                autoFocus
            >
                <ActionCheck className={classes.iconPaddingStyle} />
                {translate(confirm, { _: confirm })}
            </Button>
        </DialogActions>
    </Dialog>
);

Confirm.propTypes = {
    cancel: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.string.isRequired,
    confirmColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
    cancel: 'ra.action.cancel',
    classes: {},
    confirm: 'ra.action.confirm',
    confirmColor: 'primary',
    isOpen: false,
};

export default compose(
    withStyles(styles),
    translate
)(Confirm);

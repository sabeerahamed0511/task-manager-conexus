import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

interface Props {
    handleClose: () => void;
    handleConfirm: () => void;
    isDialogOpen: boolean;
}

interface CustomBtnProps {
    onClick: () => void;
    label: string;
}


function CustomBtn({ onClick, label }: CustomBtnProps) {
    return (
        <button
            type={'button'}
            className="bg-black hover:bg-gray-900 text-[14px] text-white px-5 py-2 rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700"
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default function ConfirmationModal({ handleClose, isDialogOpen, handleConfirm }: Props) {

    return (
        <Dialog onClose={handleClose} open={isDialogOpen} maxWidth='xs' fullWidth={true}>

            <DialogTitle align="center">Confirm Delete?</DialogTitle>
            <div className="flex justify-around my-5">
                <CustomBtn onClick={handleClose} label="Cancel" />
                <CustomBtn onClick={handleConfirm} label="Delete" />
            </div>
        </Dialog>
    )
}
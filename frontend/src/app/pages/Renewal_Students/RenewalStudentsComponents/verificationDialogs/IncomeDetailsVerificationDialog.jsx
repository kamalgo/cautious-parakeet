import React from 'react';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";

function IncomeDetailsVerificationDialog({ isOpen, onClose, onConfirm }) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Income Details Verification
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to mark these income details as verified?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={() => onConfirm('yes')} ml={3}>
              Yes
            </Button>
            <Button colorScheme="red" onClick={() => onConfirm('no')} ml={3}>
              No
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default IncomeDetailsVerificationDialog;

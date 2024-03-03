import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@mui/material";
import { createContext, useState } from "react";

interface Globalcontext {
  showMessageDialog: boolean;
  methods: GlobalcontextMethods;
}

interface GlobalcontextMethods {
  hideMessageDialog: () => void;
  showMessageDialog: (dialogOptions: {
    title: string;
    message: string;
    labelactions: string;
    afterAction: () => void;
  }) => void;
}

const defaultValues: Globalcontext = {
  showMessageDialog: false,
  methods: {
    hideMessageDialog: () => {},
    showMessageDialog: (dialogOptions: {
      title: string;
      message: string;
      labelactions: string;
      afterAction: () => void;
    }) => {
      console.log(dialogOptions);
    },
  },
};

export const GlobalContext = createContext(defaultValues);

const GlobalState = ({ children }: any) => {
  const [openMessageDialog, setOpenMessageDialog] = useState(
    defaultValues.showMessageDialog
  );

  const [dialogOptions, setDialogOptions] = useState({
    title: "",
    message: "",
    labelactions: "",
    afterAction: () => {},
  });

  const hideMessageDialog = () => {
    setOpenMessageDialog(false);
    dialogOptions.afterAction();
    setDialogOptions({
      labelactions: "",
      message: "",
      title: "",
      afterAction: () => {},
    });
  };
  const showMessageDialog = (dialogOptions: {
    title: string;
    message: string;
    labelactions: string;
    afterAction: () => void;
  }) => {
    setDialogOptions(dialogOptions);
    setOpenMessageDialog(true);
  };
  return (
    <GlobalContext.Provider
      value={{
        showMessageDialog: openMessageDialog,
        methods: {
          hideMessageDialog,
          showMessageDialog,
        },
      }}
    >
      {children}
      <Dialog open={openMessageDialog} onClose={hideMessageDialog} fullWidth>
        <DialogTitle>{dialogOptions.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogOptions.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideMessageDialog}>
            {dialogOptions.labelactions}
          </Button>
        </DialogActions>
      </Dialog>
    </GlobalContext.Provider>
  );
};

export default GlobalState;

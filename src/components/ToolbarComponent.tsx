import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
const ToolbarComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Veterinaria Huellitas
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ToolbarComponent;

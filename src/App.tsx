import ToolbarComponent from "./components/ToolbarComponent";
import "./App.css";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import CitasComponent from "./components/CitasComponent";

function App() {
  return (
    <>
      <ToolbarComponent />
      <Container
        fixed
        style={{
          padding: 8,
          gap: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h2">Bienvenido Administrador</Typography>
            <img
              src="https://cdn-icons-png.flaticon.com/512/7280/7280951.png"
              height={70}
              width={70}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1818/1818405.png"
              height={70}
              width={70}
            />
          </CardContent>
        </Card>
        <CitasComponent />
      </Container>
    </>
  );
}

export default App;

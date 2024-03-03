import {
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import LoginService from "../../services/LoginService";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const globalState = useContext(GlobalContext);
  const Loginservice = new LoginService();
  const navigation = useNavigate();

  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleGoHome = () => {
    navigation("/home");
  };

  const onSubmit = (data: any) => {
    Loginservice.Login(data.username, data.password)
      .then(() => {
        globalState.methods.showMessageDialog({
          title: "Acceso exitoso",
          message: "has ingresado correctamente",
          labelactions: "Ok",
          afterAction: handleGoHome,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/foto-gratis/veterinario-que-controla-salud-cachorro_23-2148728396.jpg?t=st=1709408578~exp=1709412178~hmac=0a44683edf856db7f04b30ecb5ee3a20369130b9e8985365b07fe92f4f509694&w=826)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <Container
        style={{
          minHeight: "100vh",
          placeContent: "center",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        fixed
      >
        <Card>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <CardContent>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://cdn-icons-png.flaticon.com/512/1791/1791961.png)",
                    height: 150,
                    width: 150,
                    margin: 32,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              </div>
              <Grid
                container
                flexDirection="column"
                spacing={2}
                style={{ padding: 16 }}
              >
                <Grid item>
                  <Controller
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <TextField {...field} label="Ingrese su usuario" />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Ingrese su contraseña"
                        type="password"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "center", padding: 16 }}>
              <Button variant="contained" type="submit">
                Iniciar Sesión
              </Button>
            </CardActions>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;

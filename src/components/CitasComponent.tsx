import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useEffect, useState } from "react";
import { useForm, Form, Controller } from "react-hook-form";
import moment from "moment";

import { Delete as DeleteIcon } from "@mui/icons-material";

const fetchData = async (endpoint: String, props: any) => {
  return await fetch("http://localhost:3001/api" + endpoint, { ...props }).then(
    (response) => response.json()
  );
};

const CitasComponent = () => {
  const [openDialogUser, setOpenDialogUser] = useState(false);
  const [openDialogMascota, setOpenDialogMascota] = useState(false);
  const [openDialogCita, setOpenDialogCita] = useState(false);
  const [updateCita, setUpdateCita] = useState(false);

  const [citas, setCitas] = useState([]);
  const [tiposMascotas, setTiposMascotas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  const [medicos, setMedicos] = useState([]);
  const formularioCita = useForm({
    defaultValues: {
      idCitas: 0,
      date: null,
      completed: false,
      Medicos_idMedicos: null,
      Pet_Id: null,
    },
  });
  const formularioUser = useForm({
    defaultValues: {
      Id: 0,
      username: "",
      email: "",
      password: "",
    },
  });
  const formularioMascota = useForm({
    defaultValues: {
      Id: 0,
      Name: "",
      Birthdate: null,
      user_ID: null,
      raza: null,
      Type_idType: null,
    },
  });
  const gettipomascotas = () =>
    fetchData("/types/list", { method: "GET" }).then((data) =>
      setTiposMascotas(data)
    );
  const getusuarios = () =>
    fetchData("/users/list", { method: "GET" }).then((data) =>
      setUsuarios(data)
    );
  const getmascotas = () =>
    fetchData("/pet/list", { method: "GET" }).then((data) => setMascotas(data));
  const getmedicos = () =>
    fetchData("/medicos/list", { method: "GET" }).then((data) =>
      setMedicos(data)
    );
  const getCitas = () =>
    fetchData("/citas/list", { method: "GET" }).then((data) => setCitas(data));

  useEffect(() => {
    getCitas();
    getmascotas();
    getmedicos();
    gettipomascotas();
    getusuarios();
  }, []);

  const handleSubmitCita = (data) => {
    fetchData(updateCita ? `/citas/update/${data.idCitas}` : "/citas/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => {
      setOpenDialogCita(false);
      getCitas();
      formularioCita.reset();
      setUpdateCita(false);
    });
  };

  const handleDeleteCita = (idCitas) => {
    fetchData(`/citas/delete/${idCitas}`, {
      method: "POST",
    }).finally(() => {
      getCitas();
    });
  };

  const hanmdleSubmitUsuarios = (data) => {
    fetchData("/users/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((e) => console.log(e))
      .finally(() => {
        setOpenDialogUser(false);
        getusuarios();
        formularioUser.reset();
      });
  };

  const hanmdleSubmitMascotas = (data) => {
    fetchData("/pet/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => {
      setOpenDialogMascota(false);
      getmascotas();
      formularioMascota.reset();
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader title="Listado de Citas" />
        <CardContent>
          {citas.length !== 0 ? (
            <>
              <List
                sx={{
                  width: "100%",
                  minHeight: 300,
                  bgcolor: "background.paper",
                }}
              >
                {citas.map((value) => {
                  const labelId = `checkbox-list-label-${value.idCitas}`;

                  return (
                    <ListItem
                      key={value.idCitas}
                      secondaryAction={
                        <IconButton
                          onClick={() => handleDeleteCita(value.idCitas)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={() => {
                          setUpdateCita(true);
                          formularioCita.reset(value);
                          setOpenDialogCita(true);
                        }}
                        dense
                      >
                        <ListItemText
                          id={labelId}
                          secondary={`Dr. ${
                            medicos.find(
                              ({ idMedicos }) =>
                                idMedicos === value.Medicos_idMedicos
                            )?.Nombre
                          } ${
                            medicos.find(
                              ({ idMedicos }) =>
                                idMedicos === value.Medicos_idMedicos
                            )?.Apellidos
                          }`}
                          primary={`
                           ${
                             mascotas.find(({ Id }) => Id === value.Pet_Id)
                               ?.Name
                           } `}
                        />
                      </ListItemButton>
                      <ListItemText
                        primary={`${moment(`${value.date}`).format(
                          "YYYY-MM-DD"
                        )}`}
                        secondary={`${moment(`${value.date}`).format("LT")}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                style={{ margin: 32 }}
                fontSize={16}
              >
                No hay registros
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={() => setOpenDialogCita(true)}>
            Agendar Cita
          </Button>
          <Button color="secondary" onClick={() => setOpenDialogUser(true)}>
            Crear Usuario
          </Button>
          <Button color="secondary" onClick={() => setOpenDialogMascota(true)}>
            Registrar Mascotas
          </Button>
        </CardActions>
      </Card>

      <Dialog open={openDialogCita} fullWidth>
        <Form
          control={formularioCita.control}
          onSubmit={formularioCita.handleSubmit(handleSubmitCita)}
        >
          <DialogTitle>Registrar Cita</DialogTitle>
          <DialogContent>
            <Grid
              container
              direction={"column"}
              style={{ padding: 8 }}
              spacing={2}
            >
              <Grid item>
                <Controller
                  control={formularioCita.control}
                  name="Medicos_idMedicos"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="Medicos-select-label">
                        Seleccione un medico
                      </InputLabel>
                      <Select
                        labelId="Medicos-select-label"
                        id="Medicos-select"
                        value={field.value}
                        label="Seleccione un medico"
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            formularioCita.setValue(
                              "Medicos_idMedicos",
                              Number(event.target.value)
                            );
                          } else {
                            formularioCita.setValue("Medicos_idMedicos", null);
                          }
                        }}
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        {medicos.map(({ idMedicos, Nombre, Apellidos }) => (
                          <MenuItem value={idMedicos}>
                            Dr {Nombre} {Apellidos}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={formularioCita.control}
                  name="Pet_Id"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="Mascota-select-label">
                        Seleccione la mascota
                      </InputLabel>
                      <Select
                        labelId="Mascota-select-label"
                        id="Mascota-select"
                        value={field.value}
                        label="Seleccione la mascota"
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            formularioCita.setValue(
                              "Pet_Id",
                              Number(event.target.value)
                            );
                          } else {
                            formularioCita.setValue("Pet_Id", null);
                          }
                        }}
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        {mascotas.map(({ Id, Name, Type_idType, user_Id }) => (
                          <MenuItem value={Id}>
                            {Name} -
                            {
                              tiposMascotas.find(
                                ({ idType }) => idType === Type_idType
                              )?.typeLabel
                            }
                            {
                              usuarios.find(({ Id }) => Id === user_Id)
                                ?.username
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={formularioCita.control}
                  name="date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="Basic date time picker"
                          value={moment(field.value ?? "")}
                          onChange={(e) =>
                            formularioCita.setValue("date", e?.toISOString())
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              type="submit"
              disabled={mascotas.length === 0 || medicos.length === 0}
            >
              Guardar
            </Button>
            <Button color="error" onClick={() => setOpenDialogCita(false)}>
              Cancelar
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
      <Dialog open={openDialogUser} fullWidth>
        <DialogTitle>Registrar Usuario</DialogTitle>
        <Form
          control={formularioUser.control}
          onSubmit={formularioUser.handleSubmit(hanmdleSubmitUsuarios)}
        >
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={formularioUser.control}
                  name="username"
                  render={({ field }) => (
                    <TextField
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      label="Ingrese el nombre del usuario"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={formularioUser.control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      label="Ingrese email del usuario"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" type="submit">
              Guardar
            </Button>
            <Button color="error" onClick={() => setOpenDialogUser(false)}>
              Cancelar
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
      <Dialog open={openDialogMascota} fullWidth>
        <Form
          control={formularioMascota.control}
          onSubmit={formularioMascota.handleSubmit(hanmdleSubmitMascotas)}
        >
          <DialogTitle>Registrar Mascota</DialogTitle>

          <DialogContent>
            <Grid
              container
              flexDirection="column"
              spacing={2}
              style={{ padding: 8 }}
            >
              <Grid item>
                <Controller
                  control={formularioMascota.control}
                  name="Name"
                  render={({ field }) => (
                    <TextField
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      label="Ingrese el nombre de la mascota"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={formularioMascota.control}
                  name="Birthdate"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DatePicker
                          label="Cumpleaños"
                          value={moment(field.value ?? "")}
                          onChange={(e) =>
                            formularioMascota.setValue(
                              "Birthdate",
                              e?.toISOString()
                            )
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={formularioMascota.control}
                  name="raza"
                  render={({ field }) => (
                    <TextField
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      label="Ingrese la raza de la mascota"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={formularioMascota.control}
                  name="Type_idType"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="Mascota-select-label">
                        Seleccione el tipo de mascota
                      </InputLabel>
                      <Select
                        labelId="Mascota-select-label"
                        id="Mascota-select"
                        value={field.value}
                        label="Seleccione el tipo de mascota"
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            formularioMascota.setValue(
                              "Type_idType",
                              Number(event.target.value)
                            );
                          } else {
                            formularioMascota.setValue("Type_idType", null);
                          }
                        }}
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        {tiposMascotas.map(({ idType, typeLabel }) => (
                          <MenuItem value={idType}>{typeLabel}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={formularioMascota.control}
                  name="user_ID"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="Mascota-select-label">
                        Seleccione el usuario
                      </InputLabel>
                      <Select
                        labelId="Mascota-select-label"
                        id="Mascota-select"
                        value={field.value}
                        label="Seleccione el usuario"
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            formularioMascota.setValue(
                              "user_ID",
                              Number(event.target.value)
                            );
                          } else {
                            formularioMascota.setValue("user_ID", null);
                          }
                        }}
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        {usuarios.map(({ Id, username, email }) => (
                          <MenuItem value={Id}>
                            {username}-{email}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              type="submit"
              disabled={tiposMascotas.length === 0 || usuarios.length === 0}
            >
              Guardar
            </Button>
            <Button color="error" onClick={() => setOpenDialogMascota(false)}>
              Cancelar
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </Box>
  );
};

export default CitasComponent;

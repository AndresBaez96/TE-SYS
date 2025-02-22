import { useState } from "react";
import Swal from "sweetalert2";
import apiTerceros from "../../../services/apiThirdParty";

const Form = () => {
  const defaultFormValues = () => {
    return {
      identityType: "CC",
      identityDocument: "",
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phone: "",
      city: "",
      roleName: "Cliente",
      id: "",
    };
  };

  const [formData, setFormData] = useState(defaultFormValues());

  const onChange = (e, type) => {
    //setIsClear(false);
    setFormData({ ...formData, [type]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const persons = {
      identityType: formData.identityType,
      identityDocument: formData.identityDocument,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      roleName: "Cliente",
    };
    Swal.fire({
      title: "¿Grabar cambios?",
      showCancelButton: true,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        apiTerceros
          .createThirdParty(persons)
          .then((response) => {
            //clearForm();
            //getTerceros();
            Swal.fire({
              title: "Actualizado!",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              position: "top-end",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Los cambios no fueron actualizados!",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              position: "top-end",
            });
          });
      }
    });
  };

  const getById = () => {
    let params = { identityDocument: formData.identityDocument };
    apiTerceros
      .getThirdParties(params)
      .then((response) => {
        console.log(response);
        setFormData({
          ...formData,
          identityType: response.data.data[0].identityType,
          firstName: response.data.data[0].firstName,
          lastName: response.data.data[0].lastName,
          address: response.data.data[0].address,
          email: response.data.data[0].email,
          phone: response.data.data[0].phone,
          city: response.data.data[0].city,
          roleName: response.data.data[0].roleName,
          id: response.data.data[0].id,
        });
      })

      .catch((error) => {
        Swal.fire({
          title: "Tercero no registrado!",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
        });
      });
  };

  const update = () => {
    const persons = {
      identityType: formData.identityType,
      identityDocument: formData.identityDocument,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      roleName: "Cliente",
    };
    Swal.fire({
      title: "¿Grabar cambios?",
      showCancelButton: true,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        apiTerceros
          .updateThirdParty(formData.id, persons)
          .then((response) => {
            //clearForm();
            //getTerceros();

            Swal.fire({
              title: "Actualizado!",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              position: "top-end",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Los cambios no fueron actualizados!",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              position: "top-end",
            });
          });
      }
    });
  };
  const deleteById = () => {
    Swal.fire({
      title: "¿Seguro eliminar?",
      showCancelButton: true,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        apiTerceros
          .deleteThirdParty(formData.id)
          .then((response) => {
            //clearForm();
            //getTerceros();

            Swal.fire({
              title: "Eliminado!",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              position: "top-end",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "El tercero no fue eliminado!",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              position: "top-end",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="container">
        <form
          action=""
          onSubmit={handleSubmit}
          className="row needs-validation"
          novalidate
        >
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                value={formData.identifyType}
                onChange={(e) => onChange(e, "identityType")}
                id="floatingInputState"
                aria-label="Tipo documento"
                required
              >
                <option>CC</option>
                <option>CE</option>
                <option>TI</option>
              </select>
              <label>TIPO DOCUMENTO</label>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="Numero de identificacion"
                cols="10"
                rows="10"
                value={formData.identityDocument}
                onChange={(e) => onChange(e, "identityDocument")}
              ></input>
              <label>NUMERO IDENTIFICACION</label>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="Nombre del tercero"
                cols="10"
                rows="10"
                value={formData.firstName}
                onChange={(e) => onChange(e, "firstName")}
              ></input>
              <label>NOMBRE</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="Apellidos del tercero"
                cols="10"
                rows="10"
                value={formData.lastName}
                onChange={(e) => onChange(e, "lastName")}
              ></input>
              <label>APELLIDOS</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="Direccion del tercero"
                cols="10"
                rows="10"
                value={formData.address}
                onChange={(e) => onChange(e, "address")}
              ></input>
              <label>DIRECCION</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="Ciudad del tercero"
                cols="10"
                rows="10"
                value={formData.city}
                onChange={(e) => onChange(e, "city")}
              ></input>
              <label>CIUDAD</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="gmail"
                cols="10"
                rows="10"
                value={formData.email}
                onChange={(e) => onChange(e, "email")}
              ></input>
              <label>CORREO ELECTRONICO</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInputPeripherals"
                aria-label="Numero de contacto"
                cols="10"
                rows="10"
                value={formData.phone}
                onChange={(e) => onChange(e, "phone")}
              ></input>
              <label>NUMERO CONTACTO</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                value={formData.roleName}
                onChange={(e) => onChange(e, "roleName")}
                id="floatingInputState"
                aria-label="Rol"
                required
              >
                <option>Cliente</option>
                <option>Coordinador Tecnico</option>
                <option>Tecnico</option>
                <option>Asesor</option>
                <option>Administrador</option>
              </select>
              <label>ROL</label>
            </div>
          </div>
          <div className="col-12">
            <input
              type="submit"
              className="btn btn-primary mx-2"
              value="Guardar"
            />
            <input
              type="button"
              onClick={getById}
              className="btn btn-primary mx-2"
              value="Buscar"
            />
            <input
              type="button"
              onClick={update}
              className="btn btn-primary mx-2"
              value="Modificar"
            />
            <input
              type="button"
              onClick={deleteById}
              className="btn btn-primary mx-2"
              value="Eliminar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

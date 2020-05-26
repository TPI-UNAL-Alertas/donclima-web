import React from 'react';

class FormSignUp extends React.Component{
    function() {
        'use strict';
        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          let forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          let validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      }
    render() {
        return (
            <form className="needs-validation forms" noValidate>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationCustom01">Apellidos</label>
                    <input type="text" className="form-control" id="validationCustom01" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationCustom02">Nombres</label>
                    <input type="text" className="form-control" id="validationCustom02" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom01">Numero de Documento</label>
                    <input type="text" className="form-control" id="validationCustom01" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom01">Correo electrónico</label>
                    <input type="text" className="form-control" id="validationCustom01" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom02">Numero celular</label>
                    <input type="text" className="form-control" id="validationCustom02" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5 mb-3">
                        <label htmlFor="inputPassword6">Contraseña</label>
                        <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
                        <small id="passwordHelpInline" className="text-muted">
                        Must be 8-20 characters long.
                        </small>
                    </div>
                    <div className="form-group col-md-5 mb-3">
                        <label htmlFor="inputPassword6">Confirmar contraseña</label>
                        <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
                        <small id="passwordHelpInline" className="text-muted">
                        Must be 8-20 characters long.
                        </small>
                    </div>

                </div>
                <div className="form-row">
                <div className="col-md-7 mb-3">
                    <label htmlFor="validationCustom04">Departamento de residencia</label>
                    <select className="custom-select" id="validationCustom04" required>
                        <option  disabled value="">Choose...</option>
                        <option>...</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                    </div>
                    <div className="col-md-5 mb-3">
                    <label htmlFor="validationCustom04">Ciudad</label>
                    <select className="custom-select" id="validationCustom04" required>
                        <option  disabled value="">Choose...</option>
                        <option>...</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                    </div>
                    
                </div>
                <div className="form-group">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                    <label className="form-check-label" htmlFor="invalidCheck">
                    Acepto recibir alertas por mensaje de texto.
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                    <label className="form-check-label" htmlFor="invalidCheck">
                    Acepto términos y condiciones.
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Submit form</button>
            </form>
            
        );
    }
}
export default FormSignUp;